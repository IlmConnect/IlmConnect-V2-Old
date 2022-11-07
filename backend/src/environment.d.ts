declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string
			POSTMARK_API_KEY: string
			NODE_ENV: 'development' | 'production'
		}
	}
}
