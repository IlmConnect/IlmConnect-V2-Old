import authRoutes from './auth'
import coursesRoutes from './courses'
import { PrismaClient } from '@prisma/client';

export default {
	v1: {
		...authRoutes,
		...coursesRoutes,
	}
}

