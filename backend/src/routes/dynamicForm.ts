import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { createHttpError, defaultEndpointsFactory, DependsOnMethod } from 'express-zod-api'
import { authenticate } from 'middleware/auth'
import { z } from 'zod'

//Should id be string?
const FieldModel = z.object({
	id: z.string(),
	fieldType: z.string(),
	fieldName: z.string(),
	fieldValues: z.array(z.string()),
	required: z.boolean(),
	sensitive: z.boolean(),
})

const FormModel = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	fields: z.array(FieldModel),
	createdAt: z.date(),
	updatedAt: z.date()

})


export default (prisma: PrismaClient) => {

	const createFormEndpoint = defaultEndpointsFactory
		.addMiddleware(authenticate())
		.build({
			method: 'post',
			input: z.object({
				title: z.string(),
				description: z.string().optional(),
				fields: z.array(FieldModel),
			}),
			output: FormModel,
			handler: async ({
				input:{
					title,
					description,
					fields,
				},
			}) => {
				return null
			}
		})
    



	return {
        
	}
}
