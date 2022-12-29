import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from 'express';

interface CreateCourseBody{
    title: string,
    body: string,
    id: string,
}

const initCourseRoutes = (app:any, prisma:any) => {
	//create course
	app.post('/course', async (req: Request<CreateCourseBody>, res: Response) => {
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
	app.get('/course', async (req: Request<CreateCourseBody>, res: Response) => {
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
				include:{
					members: true
				}
			});
			res.json(course);
		}
		catch(err:any){
			console.error(err.message);
		}
	});

	//get all members enrolled in course by id
	app.get('/course/course_members/:id', async (req: Request, res: Response) => {
		try{
			const id = req.params.id;
			const course = await prisma.course.findUnique({
				where:{
					id: parseInt(id,10),
				},
				select:{
					members: true
				}
			});
			console.log(course.members);
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
	app.put('/course/:id', async (req: Request<CreateCourseBody>, res: Response) => {
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

};

export default initCourseRoutes;