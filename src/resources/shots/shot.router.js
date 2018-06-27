import express from 'express'
import { sanitizeBody } from 'express-validator/filter'
export const shotRouter = express.Router()

import { shotController } from './shot.controller'

shotRouter
	.route('/')
	.get(shotController.getShots)
	.post(
		[
			sanitizeBody('title')
				.trim()
				.escape(),
			sanitizeBody('description')
				.trim()
				.escape()
		],
		shotController.createShot
	)

shotRouter
	.route('/:id')
	.get(shotController.getShot)
	.put(
		[
			sanitizeBody('title')
				.trim()
				.escape(),
			sanitizeBody('description')
				.trim()
				.escape()
		],
		shotController.updateShot
	)
	.delete(shotController.deleteShot)
