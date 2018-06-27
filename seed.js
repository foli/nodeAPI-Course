import faker from 'faker'
import { User } from './src/resources/users'

/** create array of fake users then seed database */
export const seedUsers = async () => {
	try {
		/** check if already populated */
		const usersCollection = await User.find()
		if (usersCollection.length > 1) {
			return
		}
		/** quantity to be generated */
		const quantity = 10
		/** empty array to store new data */
		let users = []
		for (let i = 0; i < quantity; i++) {
			users.push(
				new User({
					email: faker.internet.email(),
					password: faker.internet.password(),
					username: faker.internet.userName(),
					url: faker.internet.url(),
					photoURL: faker.internet.avatar(),
					bio: faker.lorem.sentence()
				})
			)
		}
		/** little housekeeping before adding new users */
		await User.remove()
		/** create new database entry for every user in the array */
		users.forEach(user => {
			User.create(user)
		})
		console.log('Users Collection has been Populated!')
	} catch (error) {
		console.log(error)
	}
}
