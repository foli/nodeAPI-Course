/** import User model */
import { User } from './user.model'
import pick from 'lodash.pick'

/** create the user controller */
const userController = {
	async createUser(req, res) {
		try {
			let user = new User(pick(req.body, ['email', 'password']))
			await user.save()
			res.send(user)
		} catch (error) {
			res.status(400).send(error)
		}
	}
}

/** export controller */
export default userController
