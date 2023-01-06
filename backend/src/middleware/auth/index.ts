import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { createHttpError, createMiddleware } from 'express-zod-api';
import { z } from 'zod';

export type UserWithoutPassword = Omit<User, 'password'>

function authenticateUser(request: Request): UserWithoutPassword {
	const header = request.headers.authorization?.split(' ')
	if (!header || header.length !== 2) {
		throw createHttpError(401, 'This is not a valid token')
	}

	const [_, token] = header
	return jwt.verify(token, config.auth.jwt.key) as UserWithoutPassword
}

interface AuthorizationRuleParams {
	user: UserWithoutPassword
	request: Request
}

export type AuthorizationRule = (params: AuthorizationRuleParams) => Promise<boolean>

async function authorizeUser(
	user: UserWithoutPassword, 
	request: Request,
	rules?: AuthorizationRule[]
) {
	if (!rules) return

	for (const rule of rules) {
		if (!await rule({ user, request }))
			throw createHttpError(403, 'You do not have the correct permissions to access this resource.')
	}
}

export const authenticate = (
	rules?: AuthorizationRule[]
) => createMiddleware({
	security: {
		and: [
			{ type: 'bearer' }
		]
	},
	input: z.object({}),
	middleware: async ({ request }) => {
		const user = authenticateUser(request)

		await authorizeUser(user,request, rules)

		return { user }
	}
})

export const or = (r1: AuthorizationRule, r2: AuthorizationRule) => (params: AuthorizationRuleParams) => r1(params) || r2(params)
