import express from 'express'
import { sanitizeBody } from 'express-validator/filter'
import userController from './user.controller'
export const userRouter = express.Router()

userRouter.route('/').get(userController.getUsers)

userRouter
	.route('/:id')
	.get(userController.getProfile)
	.put(
		[
			sanitizeBody('email')
				.trim()
				.escape(),
			sanitizeBody('username')
				.trim()
				.escape(),
			sanitizeBody('bio')
				.trim()
				.escape(),
			sanitizeBody('url')
				.trim()
				.escape()
		],
		userController.updateUser
	)
	.delete(userController.deleteUser)
