import mongoose from 'mongoose'
import appConfig from './config'
import { seedUsers } from '../seed'

/** connect to mongoDB with feedback */
const databaseConnect = async (config = appConfig) => {
	try {
		await mongoose.connect(config.database)
		console.log('Connected to MongoDB!')
		seedUsers()
	} catch (error) {
		console.log(`Something went wrong ${error}`)
	}
}
export default databaseConnect
