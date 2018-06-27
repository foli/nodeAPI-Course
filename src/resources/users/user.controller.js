/** import User model */
import { User, validateUser } from './user.model'
import pick from 'lodash.pick'

/** create the user controller */
const userController = {
	async createUser(req, res) {
		const { error } = validateUser(req.body)
		if (error) {
			return res.status(400).send(error.details[0].context.label)
		}

		let user = new User(pick(req.body, ['email', 'password']))
		await user.save()

		const token = user.generateAuthToken()

		res
			.header('x-access-token', token)
			.status(201)
			.send(user)
	},
	async getUsers(req, res) {
		const result = await User.find().sort('createdAt')
		// throw new Error(`Oh no I've been caught by a mean middleware`)
		res.status(200).send(result)
	},
	async updateUser(req, res) {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		})
		res.status(200).send(user)
	},
	async deleteUser(req, res) {
		const user = await User.deleteOne({ _id: req.params.id })
		res.status(200).send(user)
	},
	async getProfile(req, res) {
		const user = await User.findById(req.params.id)
		if (!user) {
			return res.status(404).send('User not found!')
		}
		res.status(200).send(user)
	},
	async getDashboard(req, res) {
		// for this to work we need to create our auth system
		// const result = await User.findById(req.user._id)
		res.status(200).send('You must sign in first.')
	}
}

/** export controller */
export default userController
