const prodConfig = {
	port: process.env.PORT || 8080,
	database: process.env.DATABASE,
	secrets: {
		JWT_SECRET: process.env.JWT_SECRET
	}
}
export default prodConfig
