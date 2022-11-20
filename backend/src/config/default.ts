import { Config } from "./types"

const config: Config = {
	postgres: {
		url: process.env.DATABASE_URL || "",
	},
	postmark: {
		apiKey: process.env.POSTMARK_API_KEY || "",
	},
	auth: {
		jwt: {
			key: "123456789",
			expiration: "7d"
		} 
	}
}

export default config
