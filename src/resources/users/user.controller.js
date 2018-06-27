/** import User model */
import { User } from './user.model'
import pick from 'lodash.pick'

/** create the user controller */
const userController = {
	async createUser(req, res) {
		try {
			let user = new User(pick(req.body, ['email', 'password']))
			await user.save()
			res.status(201).send(user)
		} catch (error) {
			res.status(400).send(error)
		}
	},
	async getUsers(req, res) {
		try {
			const result = await User.find().sort('createdAt')
			res.status(200).send(result)
		} catch (error) {
			res.status(400).send(error)
		}
	},
	async updateUser(req, res) {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, req.body, {
				new: true
			})
			res.status(200).send(user)
		} catch (error) {
			res.status(400).send(error)
		}
	},
	async deleteUser(req, res) {
		try {
			const user = await User.deleteOne({ _id: req.params.id })
			res.status(200).send(user)
		} catch (error) {
			res.status(400).send(error)
		}
	},
	async getProfile(req, res) {
		try {
			const user = await User.findById(req.params.id)
			if (!user) {
				return res.status(404).send('User not found!')
			}
			res.status(200).send(user)
		} catch (error) {
			res.status(400).send(error)
		}
	},
	async getDashboard(req, res) {
		try {
			// for this to work we need to create our auth system
			// const result = await User.findById(req.user._id)
			res.status(200).send('You must sign in first.')
		} catch (error) {
			res.status(400).send(error)
		}
	}
}

/** export controller */
export default userController
