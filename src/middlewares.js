// export const logger = (req, res, next) => {
//   console.log(`Incoming ${req.method} :: with status ${res.statusCode} :: request to ${req.url}`)
//   next()
// }

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
