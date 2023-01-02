import { Request, Response, NextFunction } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { createHttpError, createMiddleware } from 'express-zod-api';
import { z } from 'zod';

type UserWithoutPassword = Omit<User, 'password'>

function authenticateUser(request: Request): UserWithoutPassword {
	const header = request.headers.authorization?.split(' ')

	if (!header || header.length !== 2) {
		throw createHttpError(401, 'This is not a valid token')
	}

	const [_, token] = header
	return jwt.verify(token, config.auth.jwt.key) as UserWithoutPassword
}

export type AuthorizationRule = (user: UserWithoutPassword) => boolean

function authorizeUser(
	user: UserWithoutPassword, 
	rules?: AuthorizationRule[]
) {
	if (!rules) return

	for (const rule of rules) {
		if (!rule(user))
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

		authorizeUser(user, rules)

		return { user }
	}
})
