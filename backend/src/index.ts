import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import config from './config'

const app: Express = express();
app.use(express.json()); 
const prisma = new PrismaClient()



const port: number = 8000;

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

//create course
app.put('/course', async (req: Request, res: Response) => {
	try{
		const {title, description} = req.body;
		const course = await prisma.course.create({
			data:{
				title: title,
				description: description,
			}
		});
		res.json(course);
	}
	catch(err:any){
		console.error(err.message);
	}
});


//get all courses
app.get('/course', async (req: Request, res: Response) => {
	try{
		const courses = await prisma.course.findMany();
		res.json(courses);
	}
	catch(err:any){
		console.error(err.message);
	}
});

//get a course by id
app.get('/course/:id', async (req: Request, res: Response) => {
	try{
		const id = req.params.id;
		const course = await prisma.course.findUnique({
			where:{
				id: parseInt(id,10),
			},
		});
		res.json(course);
	}
	catch(err:any){
		console.error(err.message);
	}
});

//delete course
app.delete('/course/:id', async (req: Request, res: Response) => {
	try{
		const id = req.params.id;
		const deletecourse = await prisma.course.delete({
			where:{
				id: parseInt(id,10),
			},
		});
		res.json(deletecourse);
	}
	catch(err:any){
		console.error(err.message);
	}
});

//update course
app.put('/course/:id', async (req: Request, res: Response) => {
	try{
		const {id, title, description} = req.body;
		const course = await prisma.course.update({
			where:{
				id: parseInt(id,10),
			},
			data:{
				title: title,
				description: description,
			}
		});
	}
	catch(err:any){
		console.error(err.message);
	}
});



