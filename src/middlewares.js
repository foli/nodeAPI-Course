import jwt from 'jsonwebtoken'
import config from './config'

/** validate access-token */
export const authorization = (req, res, next) => {
	const token = req.header('x-access-token')
	if (!token) {
		return res.status(401).send('You must sign in first')
	}
	try {
		const userInfo = jwt.verify(token, config.secrets.JWT_SECRET)
		req.user = userInfo
		next()
	} catch (error) {
		res.status(400).send('Your token is invalid or has expired')
	}
}

/** Not found error handler */
export const notFound = (req, res, next) => {
	const error = new Error('404, Page not found.')
	error.status = 404
	next(error)
}

/** catch async errors */
export const catchErrors = fn => {
	return async (req, res, next) => {
		try {
			await fn(req, res)
		} catch (error) {
			next(error)
		}
	}
}

/** default error handler */
export const logErrors = (error, req, res) => {
	res.status(error.status || 500)
	res.send(error.message)
}
