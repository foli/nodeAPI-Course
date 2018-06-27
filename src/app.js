import express from 'express'
const app = express()

import config from './config'
import { databaseConnect } from './database'

databaseConnect()

app.get('/', (req, res) => res.send('Welcome to Express'))

const port = config.port
app.listen(port, () =>
	console.log(`Server is running on http://locahost:${port}`)
)
