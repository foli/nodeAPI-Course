import mongoose from 'mongoose'
import Joi from 'joi'
import pick from 'lodash.pick'

const schema = {
	title: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true
	},
	author: {
		type: String,
		required: true
	},
	image: String,
	draft: {
		type: Boolean,
		default: false
	}
}

const shotSchema = new mongoose.Schema(schema, { timestamps: true })

shotSchema.methods.toJSON = function() {
	let shotObject = this.toObject()
	return pick(shotObject, [
		'_id',
		'title',
		'description',
		'author',
		'image',
		'draft'
	])
}

export const Shot = mongoose.model('shot', shotSchema)

export function validateShot(data) {
	const schema = Joi.object().keys({
		title: Joi.string()
			.required()
			.label('You must provide a title'),
		description: Joi.string(),
		author: Joi.required().label('You must sign in to post a shot')
	})
	return Joi.validate(data, schema)
}
