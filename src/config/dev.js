const devConfig = {
	port: process.env.PORT || 3000,
	database: 'mongodb://localhost/development',
	secrets: {
		API_KEY: process.env.API_KEY
	}
}
export default devConfig
