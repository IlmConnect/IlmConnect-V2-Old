import { Config } from './types';

const config: Config = {
	urls: [/localhost:\d+/],
	backend: {
		url: 'http://localhost:8000/v1/',
	}
};

export default config;
