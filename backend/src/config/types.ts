export interface Config {
	postgres: {
		url: string
	}
	postmark: {
		apiKey: string
	}
	auth: {
		jwt: {
			key: string
			expiration: string
		} 
	}
}
