import mongoose from 'mongoose'
import appConfig from './config'

export const databaseConnect = (config = appConfig) => {
	return mongoose
		.connect(config.database)
		.then(() => console.log('MongoDB is Ready'))
		.catch(error => console.log(`Something went wrong ${error}`))
}
