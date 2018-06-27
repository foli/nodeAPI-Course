import express from 'express'
export const router = express.Router()
import { userRouter } from './resources/users/user.router'
import { shotRouter } from './resources/shots'
import userController from './resources/users/user.controller'
import { sanitizeBody } from 'express-validator/filter'
import { catchErrors, authorization } from './middlewares'

router.get('/', (req, res) => res.send('Home Page'))
router.get('/about', (req, res) => res.send('About Page'))

router.get('/signin', (req, res) => res.send('Sign In'))
router.post('/signin', userController.signIn)
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
