import merge from 'lodash.merge'
import devConfig from './dev'
import prodConfig from './prod'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const env = process.env.NODE_ENV

const baseConfig = {
	hello: 'world!',
	secret: {}
}

let envConfig = {}

switch (env) {
	case 'development':
	case 'dev':
		envConfig = devConfig
		break

	case 'production':
	case 'prod':
		envConfig = prodConfig
		break

	default:
		envConfig = devConfig
}
export default merge(baseConfig, envConfig)
