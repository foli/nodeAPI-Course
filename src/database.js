import mongoose from 'mongoose'

export const databaseConnect = () => {
	return mongoose
		.connect('mongodb://localhost/express-app-dev')
		.then(() => console.log('MongoDB is Ready'))
		.catch((error) => console.log(`Something went wrong ${error}`))
}
