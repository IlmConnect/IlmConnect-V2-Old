import authRoutes from './auth'
import { Express } from 'express';
import { PrismaClient } from '@prisma/client';

export default (app: Express, prisma: PrismaClient) => {
	return {
		v1: {
			...authRoutes(app, prisma)
		}
	}
}
