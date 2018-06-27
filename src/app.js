import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
const app = express()
import config from './config'
import { databaseConnect } from './database'
import { router } from './router'
import { notFound, logErrors } from './middlewares'

databaseConnect()

/** middleware stack */

/** set the static assets folder */
app.use(express.static(path.join(__dirname, 'assets')))

app.use(bodyParser.json()) // read json
app.use(bodyParser.urlencoded({ extended: true })) // read URLs
if (app.get('env') === 'development') {
	app.use(logger('dev'))
}

app.use('/', router)

/** error handlers */
app.use(notFound)
app.use(logErrors)

const port = config.port
app.listen(port, () =>
	console.log(`Server is running on http://locahost:${port}`)
)
