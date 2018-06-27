import express from 'express'
import { sanitizeBody } from 'express-validator/filter'
export const router = express.Router()

import { userRouter, userController } from './resources/users'
import { shotRouter } from './resources/shots'
import { catchErrors, authorization } from './middlewares'

router.get('/', (req, res) => res.send('Home Page'))
router.get('/about', (req, res) => res.send('About Page'))

router.get('/signin', (req, res) => res.send('Sign In'))
router.post('/signin', userController.signIn)

router.get('/signup', (req, res) => res.send('Sign Up'))
router.post(
	'/signup',
	[
		sanitizeBody('email')
			.trim()
			.escape()
	],
	catchErrors(userController.createUser)
)

router.get('/me', authorization, userController.getDashboard)

router.use('/users', userRouter)
router.use('/shots', shotRouter)
