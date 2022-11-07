import { Config } from "./types"

const config: Config = {
	postgres: {
		url: process.env.DATABASE_URL || "",
	},
	postmark: {
		apiKey: process.env.POSTMARK_API_KEY || "",
	}
}

export default config
