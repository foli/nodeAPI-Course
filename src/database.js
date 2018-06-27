import mongoose from 'mongoose'
import appConfig from './config'

/** connect to mongoDB with feedback */
const databaseConnect = async (config = appConfig) => {
	try {
		await mongoose.connect(config.database)
		console.log('Connected to MongoDB!')
	} catch (error) {
		console.log(`Something went wrong ${error}`)
	}
}
export default databaseConnect
