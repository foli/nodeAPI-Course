import express from 'express'
export const router = express.Router()

router.get('/', (req, res) => res.send('Home Page'))
router.get('/about', (req, res) => res.send('About Page'))

router.get('/signin', (req, res) => res.send('Sign In'))
router.post('/signup', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  const user = { email, password }
  res.send(user)
})