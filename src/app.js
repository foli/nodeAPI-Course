import express from 'express'
const app = express()

import config from './config'
import { databaseConnect } from './database'
import { router } from './router'

databaseConnect()

app.use('/', router)

const port = config.port
app.listen(port, () =>
	console.log(`Server is running on http://locahost:${port}`)
)
