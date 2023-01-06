import { PrismaClient } from '@prisma/client';
import config from 'config';


export const client = new PrismaClient({
	datasources: {
		db: {
			url: config.postgres.url
		}
	}
});
