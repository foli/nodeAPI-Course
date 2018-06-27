const devConfig = {
	port: process.env.PORT || 3000,
	database: 'mongodb://localhost/development',
	secrets: {
		JWT_SECRET: process.env.JWT_SECRET
	}
}
export default devConfig
