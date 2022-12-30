import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { createHttpError, defaultEndpointsFactory, DependsOnMethod } from 'express-zod-api';
import { authorize } from 'middleware/auth';
import { z } from 'zod';

interface CreateCourseBody{
    title: string,
    body: string,
    id: string,
}

const CourseModel = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export default (prisma: PrismaClient) => {

	const createCourseEndpoint = defaultEndpointsFactory
		.addMiddleware(authorize)
		.build({
			method: "post",
			input: z.object({
				title: z.string(),
				description: z.string().optional(),
			}),
			output: CourseModel,
			handler: async ({ 
				input: {
					title,
					description,
				},
				options
			}) => {
				const user = options.user

				return await prisma.course.create({
					data: {
						title,
						description,
					}
				})
			},
		})

	const getCourseEndpoint = defaultEndpointsFactory.build({
		method: "get",
		input: z.object({
			id: z.string(),
		}),
		output: CourseModel,
		handler: async ({ 
			input: {
				id
			}
		}) => {
			const course = await prisma.course.findUnique({
				where: {
					id,
				}
			})

			if (!course) {
				throw createHttpError(500, 'There was an error creating this course')
			}

			return course
		},
	})

	const findCoursesEndpoint = defaultEndpointsFactory.build({
		method: "get",
		input: z.object({}),
		output: z.object({
			courses: CourseModel.array(),
		}),
		handler: async ({}) => {
			return {
				courses: await prisma.course.findMany(),
			}
		},
	})

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

	return {
		courses: {
			'': new DependsOnMethod({
				get: findCoursesEndpoint,
				post: createCourseEndpoint
			}),
			':id': getCourseEndpoint,
		}	
	}
}
