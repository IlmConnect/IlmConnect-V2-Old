import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { createHttpError, defaultEndpointsFactory, DependsOnMethod } from 'express-zod-api';
import { authenticate, or } from 'middleware/auth'
import { Domain, Group, hasPermisson, Permission } from 'middleware/auth/permissions';
import { StringLiteralType } from 'typescript';
import { z } from 'zod';

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

async function courseExists(prisma: PrismaClient, courseId: string) : Promise<boolean>{
	const course = await prisma.course.findUnique({
		where: {
			id: courseId
		}
	})

	if(!course){
		return false
	}
	return true 
}

async function userEnrolled(prisma: PrismaClient, userId: string, courseId: string) : Promise<boolean> {
	const result = await prisma.courseMembers.findFirst({
		where: {
			userId: userId,
			courseId: courseId
		}
	})

	if(!result){
		return false
	}
	return true 
}

export default (prisma: PrismaClient) => {

	const createCourseEndpoint = defaultEndpointsFactory
		.addMiddleware(authenticate([
			or(
				hasPermisson(Domain.School, Group.Admin, Permission.Manage),
				hasPermisson(Domain.School, Group.Course, Permission.Manage),
			)
		]))
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
			}) => {
				return await prisma.course.create({
					data: {
						title,
						description,
						session: {
							create: {
								title: 'For testing'
							}
						}
					}
				})
			},
		})

	const getCourseEndpoint = defaultEndpointsFactory
		.addMiddleware(authenticate())
		.build({
			method: "get",
			input: z.object({
				id: z.string() 
			}),
			output: CourseModel,
			handler: async ({ input: {id}}) => {
				console.log(id)
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

	const findCoursesEndpoint = defaultEndpointsFactory
		.addMiddleware(authenticate())
		.build({
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

	const getCourseMembersEndpoint = defaultEndpointsFactory
		.addMiddleware(authenticate())
		.build({
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
		})

	const deleteCourseEndpoint = defaultEndpointsFactory
		.addMiddleware(authenticate())
		.build({
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
		})

	const updateCourseEndpoint = defaultEndpointsFactory
		.addMiddleware(authenticate())
		.build({
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
		})
	
	const registerMemberInCourseEndpoint = defaultEndpointsFactory
		.addMiddleware(authenticate())
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
				if(user.id == null || user.role == null){
						throw createHttpError(500, 'Failed to register in course!')
				}

				const courseRes = await courseExists(prisma, id)
		
				if(!courseRes){
					throw createHttpError(404, 'Course does not exist!')
				}
				
				if(await userEnrolled(prisma, user.id, id)){
					throw createHttpError(400, 'User is already enrolled in the course!')
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
			":id" : {
				users: new DependsOnMethod({
					post: registerMemberInCourseEndpoint,
					get: getCourseMembersEndpoint
				}),
				"": new DependsOnMethod({
						get: getCourseEndpoint,
						put: updateCourseEndpoint,
						delete: deleteCourseEndpoint
				})
			}
		}	
	}
}
