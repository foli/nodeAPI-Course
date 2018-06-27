import express from 'express'
export const userRouter = express.Router()

userRouter.get('/', (req, res) => res.send('User list'))
userRouter.get('/:id', (req, res) => {
	res.send(`User id id: ${req.params.id}`)
})
