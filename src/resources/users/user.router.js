import express from 'express'
import userController from './user.controller'
export const userRouter = express.Router()

userRouter.get('/', (req, res) => res.send('User list'))
userRouter.post('/', userController.createUser)

userRouter.get('/:id', (req, res) => {
	res.send(`User id id: ${req.params.id}`)
})
