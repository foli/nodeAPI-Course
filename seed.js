import faker from 'faker'
import sample from 'lodash.sample'
import { User } from './src/resources/users'
import { Shot } from './src/resources/shots'

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

export const seedShots = async () => {
	try {
		const shotsCollection = await Shot.find()
		if (shotsCollection.length > 1) {
			return
		}

		const quantity = 20
		let shots = []
		for (let i = 0; i < quantity; i++) {
			const users = await User.find()
			const randomAuthor = await sample(users)

			if (randomAuthor) {
				shots.push(
					new Shot({
						title: faker.commerce.productName(),
						description: faker.lorem.sentence(),
						author: randomAuthor._id,
						image: faker.image.imageUrl(640, 480),
						draft: faker.random.boolean()
					})
				)
			}
		}

		await Shot.remove()
		shots.forEach(shot => {
			Shot.create(shot)
		})
		console.log('Shots Collection has been Populated!')
	} catch (error) {
		console.log(error)
	}
}
