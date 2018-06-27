import express from 'express'
export const router = express.Router()

router.get('/', (req, res) => res.send('Home Page'))
router.get('/about', (req, res) => res.send('About Page'))
