import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
const app = express()
import config from './config'
import { databaseConnect } from './database'
import { router } from './router'

databaseConnect()

app.use(bodyParser.json()) // read json
app.use(bodyParser.urlencoded({ extended: true })) // read URLs
if (app.get('env') === 'development') {
	app.use(logger('dev'))
}

app.use('/', router)

const port = config.port
app.listen(port, () =>
	console.log(`Server is running on http://locahost:${port}`)
)
