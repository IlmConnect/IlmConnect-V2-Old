import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import courseRoutes from './routes/courses';
import authRoutes from './routes/auth';
import cors from 'cors';
import { createConfig, createServer } from 'express-zod-api'
import routes from './routes'

const app: Express = express();
app.use(express.json()); 
app.use(cors()); 
const prisma = new PrismaClient();

const config = createConfig({
	server: {
		listen: 8000,
	},
	cors: false,
	logger: {
		level: 'debug',
		color: true,
	},
	startupLogo: false,
})

createServer(
	config,
	routes(app, prisma)
)



// const port = 8000;

// app.get('/', (req: Request, res: Response) => {
// 	res.send('Express + TypeScript Server');
// });

// // Initialize app courses
// courseRoutes(app, prisma);
// authRoutes(app, prisma);

// app.listen(port, () => {
// 	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });



