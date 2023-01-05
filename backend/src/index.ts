import express, { Express, Request, Response } from 'express';
import courseRoutes from './routes/courses';
import authRoutes from './routes/auth';
import cors from 'cors';
import { createConfig, createServer, defaultEndpointsFactory } from 'express-zod-api'
import routes from './routes'



const config = createConfig({
	server: {
		listen: 8000,
	},
	cors: true,
	logger: {
		level: 'debug',
		color: true,
	},
	startupLogo: false,
})

createServer(
	config,
	routes,
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



