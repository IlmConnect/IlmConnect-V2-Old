import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import config from './config'

const app: Express = express();
const prisma = new PrismaClient()

const port: number = 8000;

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
