import mongoose from 'mongoose'
import appConfig from './config'
import { seedUsers, seedShots } from '../seed'

/** connect to mongoDB with feedback */
const databaseConnect = async (config = appConfig) => {
	try {
		await mongoose.connect(config.database)
		console.log('Connected to MongoDB!')
		/** only populate database in 'dev' or 'development' mode */
		if (process.env.NODE_ENV === 'development' || 'dev') {
			/** execute seeders */
			seedUsers()
			seedShots()
		}
	} catch (error) {
		console.log(`Something went wrong ${error}`)
	}
}
export default databaseConnect
