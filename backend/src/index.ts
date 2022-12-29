import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import courseRoutes from './routes/courses';
import authRoutes from './routes/auth';
import cors from 'cors';
import { createConfig } from 'express-zod-api'

const config = createConfig({
	server: {
		listen: 8000,
	},
	cors: true,
	logger: {
		level: 'debug',
		color: true,
	}
})

const app: Express = express();
app.use(express.json()); 
app.use(cors()); 
const prisma = new PrismaClient();

const port = 8000;

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

// Initialize app courses
courseRoutes(app, prisma);
authRoutes(app, prisma);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});



