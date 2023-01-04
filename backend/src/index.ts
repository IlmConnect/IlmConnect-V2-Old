import { createConfig, createServer, defaultEndpointsFactory } from 'express-zod-api'
import routes from './routes'

const config = createConfig({
	server: {
		listen: 8000,
	},
	cors: ({ defaultHeaders, request, endpoint, logger }) => ({
		...defaultHeaders,
		"Access-Control-Max-Age": "5000",
		"Access-Control-Allow-Headers" : "*"
	}),
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
