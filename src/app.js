import express from 'express'
const app = express()

app.get('/', (req, res) => res.send('Welcome to Express'))

app.listen(8080, () => console.log('Server is running on http://localhost:8080'))