import { Config } from './types'
import defaultConfig from './default'
import productionConfig from './production'

type Environment = 'development' | 'production'

const configs = {
	development: defaultConfig,
	production: productionConfig,
}

const env = process.env.NODE_ENV
export default env? configs[env as Environment] : defaultConfig
