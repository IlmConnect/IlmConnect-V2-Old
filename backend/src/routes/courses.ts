import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { createHttpError, defaultEndpointsFactory, DependsOnMethod } from 'express-zod-api';
import { authorize } from 'middleware/auth'
import { z } from 'zod';

interface CreateCourseBody{
    title: string,
    body: string,
    id: string,
}

const CourseMembersModel = z.object({
	role: z.string(),
	courseId: z.string(),
	userId: z.string()
})

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

	const getCourseByIdEndpoint = defaultEndpointsFactory.build({
		method: "get",
		input: z.object({
			id: z.string() 
		}),
		output: CourseModel,
		handler: async ({ input: {id}}) => {
			const course = await prisma.course.findUnique({
				where: {
					id: id
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
	});

	const getAllCourseMembersByIdEndpoint = defaultEndpointsFactory.build({
		method: "get",
		input: z.object({
			id: z.string()
		}),
		output: z.object({}),
		handler: async ({ input: {id} }) => {
			const course = await prisma.course.findUnique({
				where: {
					id: id
				},
				select:{
					members: true
				}
			})

			if (!course) {
				throw createHttpError(500, 'There was an error creating this course')
			}

			return {course}
		},
	});

	const deleteCourseByIdEndpoint = defaultEndpointsFactory.build({
		method: "delete",
		input: z.object({
			id: z.string(),
		}),
		output: CourseModel,
		handler: async ({ input: {id} }) => {
			const course = await prisma.course.findUnique({
				where: {
					id: id
				}
			})

			if (!course) {
				throw createHttpError(500, 'There was an error creating this course')
			}

			return course
		},
	});

	const updateCourseByIdEndpoint = defaultEndpointsFactory.build({
		method: "put",
		input: z.object({
			id: z.string(),
			title: z.string(),
			description: z.string().optional()
		}),
		output: CourseModel,
		handler: async ({ input: {id, title, description} }) => {
			const course = await prisma.course.update({
				where: {
					id: id
				},
				data:{
					title: title,
					description: description
				}
			})

			if (!course) {
				throw createHttpError(500, 'There was an error in updating this course')
			}

			return course
		},
	});
	
	const registerCourseByIdEndpoint = defaultEndpointsFactory
		.addMiddleware(authorize)
		.build({
			method: "post",
			input: z.object({
				id: z.string(),

			}),
			output: z.object({
				result: z.boolean()
			}),
			handler: async ({ input: {id}, options }) => {
				const user = options.user
				if( user.role == null || user.id == null){
						throw createHttpError(500, 'Failed to register in course!')
				}
				
				const result = await prisma.courseMembers.create({
					data: {
						role: user.role,
						courseId: id,
						userId: user.id
					}
				})
	
				if (!result) {
					throw createHttpError(500, 'Failed to register in course!')
				}
				return {result: true}
	
			},
		});

	return {
		courses: {
			'': new DependsOnMethod({
				get: findCoursesEndpoint,
				post: createCourseEndpoint
			}),
			'/:id': new DependsOnMethod({
				get: getCourseByIdEndpoint,
				put: updateCourseByIdEndpoint,
				delete: deleteCourseByIdEndpoint
			}),
			'/course_members/:id' : registerCourseByIdEndpoint     /* Defaulted to POST method, no other endpoint for this route */
		}	
	}
}
