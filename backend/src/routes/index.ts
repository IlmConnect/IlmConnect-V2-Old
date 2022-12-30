import authRoutes from './auth'
import coursesRoutes from './courses'
import { PrismaClient } from '@prisma/client';

export default (prisma: PrismaClient) => {
	return {
		v1: {
			...authRoutes(prisma),
			...coursesRoutes(prisma),
		}
	}
}
