import { Request, Response, NextFunction } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { createHttpError, createMiddleware } from 'express-zod-api';
import { z } from 'zod';

type UserWithoutPassword = Omit<User, 'password'>

export const authorize = createMiddleware({
	security: {
		and: [
			{ type: 'bearer' }
		]
	},
	input: z.object({}),
	middleware: async ({ request }) => {
		const header = request.headers.authorization?.split(' ')

		if (!header || header.length !== 2) {
			throw createHttpError(401, 'This is not a valid token')
		}

		const [_, token] = header
		const user = jwt.verify(token, config.auth.jwt.key) as UserWithoutPassword

		return { user }
	}
})
