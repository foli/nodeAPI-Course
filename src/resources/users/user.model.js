import mongoose from 'mongoose'
import pick from 'lodash.pick'
import bcrypt from 'bcryptjs'
import Joi from 'joi'
import jwt from 'jsonwebtoken'

import config from '../../config'

const schema = {
	email: {
		type: String,
		required: [true, 'Please enter your email'],
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: [true, 'Please enter your password'],
		trim: true,
		minlength: 6
	},
	username: { type: String, trim: true },
	photoURL: String,
	bio: String,
	url: String,
	isAdmin: Boolean
}

const userSchema = new mongoose.Schema(schema, { timestamps: true })

userSchema.pre('save', async function(next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} else {
		next()
	}
})

userSchema.methods.toJSON = function() {
	let userObject = this.toObject()
	return pick(userObject, [
		'_id',
		'email',
		'username',
		'photoURL',
		'bio',
		'url'
	])
}

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{ _id: this._id, isAdmin: this.isAdmin },
		config.secrets.JWT_SECRET
	)
	return token
}

export const User = mongoose.model('user', userSchema)

export function validateUser(data) {
	const schema = Joi.object().keys({
		email: Joi.string()
			.required()
			.email()
			.label('Not a valid email'),
		password: Joi.string()
			.required()
			.min(6)
			.label('Password is too short')
	})
	return Joi.validate(data, schema)
}
