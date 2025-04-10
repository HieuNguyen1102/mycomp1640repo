// Import the functions you want to use and install their required dependencies
import bcryptjs from 'bcryptjs'
import { db } from '../config/db_config.js'

import jwt from 'jsonwebtoken'

import { Log, logError } from './logger.js'

import User from '../schema/User.js'
import UserRole from '../schema/UserRole.js'
import { eq } from 'drizzle-orm'
import Role from '../schema/Role.js'

/**
 * Generate a token when logging in.
 *
 * @param {User} user
 * @returns {{ status: number, item: any }} The Express response or an error object.
 */
const generateToken = async (user) => {
	try {
		// Return the role of the selected user
		const userRole = await db
			.select()
			.from(UserRole)
			.where(eq(UserRole.userId, user.userId))
			.limit(1)

		if (!userRole || userRole.length === 0) {
			logError('generate an authentication token', 'User has invalid role')
			return {
				status: 400,
				item: 'User has invalid role',
			}
		}

		// Payload to be sent with the token
		const payload = {
			id: user.userId,
			role: userRole[0].roleId,
		}

		// No secret key = bye bye
		const secretKey = process.env.JWT_SECRET_KEY
		if (!secretKey) {
<<<<<<< HEAD
			return {
				status: 500,
				item: logError(
					'generate an authentication token',
					'No token encryption secret key was found.',
				),
=======
			logError(
				'generate an authentication token',
				'No token encryption secret key was found.',
			)
			return {
				status: 500,
				item: 'No token encryption secret key was found.',
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			}
		}

		const role = await db
			.select()
			.from(Role)
			.where(eq(Role.roleId, userRole[0].roleId))

		if (!role[0] || role.length === 0) {
			logError('generate an authentication token', 'User has invalid role')
			return {
				status: 401,
				item: 'User has invalid role',
			}
		}

		// How long the token will last
		// For development sake, keep it at 24 hours
		// For production, keep it at 14 days
		const options = {
			expiresIn: process.env.NODE_ENV !== 'production' ? '24h' : '14d',
		}

		return {
			status: 200,
			item: {
				jwt: jwt.sign(payload, secretKey, options),
				role: role[0].roleName,
			},
		}
	} catch (err) {
<<<<<<< HEAD
		return {
			status: 500,
			item: logError('generate an authentication token', err),
=======
		logError('generate an authentication token', err)
		return {
			status: 500,
			item: err,
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		}
	}
}
///////////////////////////////////

/**
 * Login function
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {{ status: number, item: any }} The Express response or an error object.
 */
export const Login = async (req, res) => {
	try {
		const results = await ValidateInputLogin(req, res)

		if (results && results.status !== 200)
			return { status: results.status, item: results.item }
		const user = results.item

		const token = await generateToken(user)
		Log(`User authenticated successfully. User ID: ${user.userId}`)

		return { status: token.status, item: token.item }
	} catch (err) {
<<<<<<< HEAD
		return { status: 500, item: logError('login', err) }
=======
		logError('login', err)
		return { status: 500, item: err }
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}
///////////////////////////////////

/**
 * Validate the input for login functions.
 * If all goes through, return the user with corresponding information.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {{ status: number, item: any }} The Express response or an error object.
 */
const ValidateInputLogin = async (req, res) => {
	try {
		if (!req.body) {
<<<<<<< HEAD
			if (
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'test'
			)
				console.log('No body sent.')
=======
			logError('validate login credentials', 'No body sent.')
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return {
				status: 401,
				item: 'No body sent.',
			}
		}
		if (!req.body.username) {
			// If your system uses username to login, change it to username
<<<<<<< HEAD
			if (
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'test'
			)
				console.log('Please enter a username.')
=======
			logError('validate login credentials', 'Please enter a username.')
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return {
				status: 401,
				item: 'Please enter a username.',
			}
		}
		if (!req.body.password) {
<<<<<<< HEAD
			if (
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'test'
			)
				console.log('Please enter a password.')
=======
			logError('validate login credentials', 'Please enter a password.')
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return {
				status: 401,
				item: 'Please enter a password.',
			}
		}

		const user = (
			await db
				.select()
				.from(User)
				.where(eq(User.username, req.body.username))
				.limit(1)
		)[0]
		if (!user) {
<<<<<<< HEAD
			if (
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'test'
			)
				console.log('Invalid username or password.')
=======
			logError('validate login credentials', 'Invalid username or password.')
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return {
				status: 401,
				item: 'Invalid username or password.',
			}
		}
		const compare_hash = await compareHash(req.body.password, user.password)
		if (compare_hash && compare_hash.status !== 200) {
<<<<<<< HEAD
			if (
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'test'
			)
				console.log('Invalid username or password.')
=======
			logError('validate login credentials', 'Invalid username or password.')
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return {
				status: 401,
				item: 'Invalid username or password.',
			}
		}
		return { status: 200, item: user }
	} catch (err) {
<<<<<<< HEAD
		return { status: 500, item: logError('validate login credentials', err) }
=======
		logError('validate login credentials', err)
		return { status: 500, item: err }
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}
///////////////////////////////////

const decodeToken = async (token) => {
	try {
<<<<<<< HEAD
		if (!process.env.JWT_SECRET_KEY)
			return {
				status: 500,
				item: logError(`decode token`, 'No token encryption key found.'),
			}

		if (!token)
			return {
				status: 500,
				item: logError(`decode token`, 'No token provided.'),
			}
=======
		if (!process.env.JWT_SECRET_KEY) {
			logError(`decode token`, 'No token encryption key found.')
			return {
				status: 500,
				item: 'No token encryption key found.',
			}
		}

		if (!token) {
			logError(`decode token`, 'No token provided.')
			return {
				status: 500,
				item: 'No token provided.',
			}
		}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

		const payloadFromToken = await PayloadFromToken(token)

		if (payloadFromToken.status === 200) {
			Log(`Token decoded successfully: ${token}`)
		} else {
			logError(`decode token`, payloadFromToken.item)
		}
		return { status: payloadFromToken.status, item: payloadFromToken.item }
	} catch (err) {
<<<<<<< HEAD
		return { status: 500, item: logError('decode token', err) }
=======
		logError('decode token', err)
		return { status: 500, item: err }
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}

/**
 * Authenticate the token sent from the client
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @returns {import('express').Response|{ status: number, item: any }} The Express response or an error object.
 */
export const authenticateToken = async (req, res, next) => {
	try {
		const token = req.headers.authentication?.replace('Bearer ', '')
		if (!token) {
<<<<<<< HEAD
			if (
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'test'
			)
				console.log('Authentication required')
=======
			logError('authenticate token', 'Authentication required')
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return res.status(401).json('Authentication required')
		}
		const response = await PayloadFromToken(token)

		if (response && response.status !== 200) {
			return res.status(response.status).json(response.item)
		}

		const userFromPayload = await UserFromPayload(response.item)

		if (userFromPayload && userFromPayload.status !== 200)
			return res.status(userFromPayload.status).json(userFromPayload.item)
		req.user = response.item
		Log(`Token authenticated successfully. User ID: ${userFromPayload.item.id}`)
		next()
	} catch (err) {
<<<<<<< HEAD
		return res.status(500).json(logError('authenticate token', err))
=======
		logError('authenticate token', err)
		return res.status(500).json(err)
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}
///////////////////////////////////

/**
 * Prevent user access to certain routes that shouldn't be accessed by logged in users.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @returns {import('express').Response|{ status: number, item: any }} The Express response or an error object.
 */
export const alreadyLoggedIn = async (req, res, next) => {
	try {
		const token = req.headers.authentication?.replace('Bearer ', '')
		if (!token) return next()
		const response = await PayloadFromToken(token)
		if (response.status !== 200)
			return res.status(response.status).json(response.item)

		const userfrompayload = await UserFromPayload(response.item)
		if (userfrompayload.status !== 200)
			return res.status(userfrompayload.status).json(userfrompayload.item)

		req.user = response.item
		return res.status(409).json('You are already logged in.')
	} catch (err) {
		return res.status(500).json(err)
	}
}
///////////////////////////////////

export const staffOnly = (req, res, next) => {
	if (req.user.role !== '9c048d7e-ef25-42fa-a496-23b0292ac96d') {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	next()
}

<<<<<<< HEAD
=======
export const studentsNotAllowed = (req, res, next) => {
	if (req.user.role === 'c2140ead-2d68-4be0-a711-9b8b1ceb9d8d') {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	next()
}

>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
export const staffNotAllowed = (req, res, next) => {
	if (req.user.role === '9c048d7e-ef25-42fa-a496-23b0292ac96d') {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	next()
}

/**
 * Authenticate apps that make requests to the server using an API
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @returns {import('express').Response|{ status: number, item: any }} The Express response or an error object.
 */
export const authenticateApp = (req, res, next) => {
	const apikey = req.headers.api?.replace('X-Api-Key ', '')
<<<<<<< HEAD
	console.log(apikey)
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	if (apikey !== process.env.API_KEY)
		return res.status(401).json('Unrecognized app.')
	next()
}
//////////////////////////////////

/**
 * Verify the token sent from client to see if it's valid and which user's information it carries.
 *
 * @param {string} token - The token to be verified
 * @returns {{ status: number, item: any }} The Express response or an error object.
 */
const PayloadFromToken = async (token) => {
	try {
<<<<<<< HEAD
		if (!process.env.JWT_SECRET_KEY)
			return {
				status: 500,
				item: logError(
					'decode authentication token',
					'No token encryption key provided',
				),
			}
=======
		if (!process.env.JWT_SECRET_KEY) {
			logError(
				'decode authentication token',
				'No token encryption key provided',
			)
			return {
				status: 500,
				item: 'No token encryption key provided',
			}
		}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		const data = await jwt.verify(
			token,
			process.env.JWT_SECRET_KEY,
			(err, decoded) => {
				if (err) {
					if (err.message === 'invalid token' || err.message === 'jwt expired')
						return { status: 401, item: err.message }
					return { status: 500, item: err.message }
				} else {
					return { status: 200, item: decoded }
				}
			},
		)
		return data
	} catch (err) {
<<<<<<< HEAD
		return { status: 500, item: logError('decode authentication token', err) }
=======
		logError('decode authentication token', err)
		return { status: 500, item: err }
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}
///////////////////////////////////

/**
 * Extract the user from a jwt payload and verify it's validity
 *
 * @param {jwtJwtPayload} payload - The payload from which to extract the user
 * @returns {{ status: number, item: any }} The Express response or an error object.
 */
const UserFromPayload = async (payload) => {
	try {
		const user = await db
			.select()
			.from(User)
			.where(eq(User.userId, payload.id))
			.limit(1)

		if (!user || user.length === 0) {
<<<<<<< HEAD
			return {
				status: 401,
				item: logError(`get user from token`, `User does not exist anymore.`),
			}
		}
		if (!user[0].isActive) {
			if (
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'test'
			)
				console.log(
					'This account is inactive. Please contact customer support for more information.',
				)
=======
			logError(
				`get user from token`,
				`Invalid user name or password or username doesn't exist`,
			)
			return {
				status: 401,
				item: `Invalid user name or password or username doesn't exist`,
			}
		}
		if (!user[0].isActive) {
			logError(
				`get user from token`,
				'This account is inactive. Please contact customer support for more information.',
			)
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return {
				status: 401,
				item: 'This account is inactive. Please contact customer support for more information.',
			}
		}

		if (user[0].isLocked) {
<<<<<<< HEAD
			if (
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'test'
			)
				console.log(
					'This account is suspended. Please contact customer support for more information.',
				)
=======
			logError(
				`get user from token`,
				'This account is suspended. Please contact customer support for more information.',
			)
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return {
				status: 401,
				item: 'This account is suspended. Please contact customer support for more information.',
			}
		}

		return { status: 200, item: user[0] }
	} catch (err) {
<<<<<<< HEAD
		return { status: 500, item: logError('convert jwt payload to user', err) }
=======
		logError('convert jwt payload to user', err)
		return { status: 500, item: err }
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}
///////////////////////////////////

/**
 * Encrypt the input password
 *
 * @param {string} password Input a password
 * @returns {{ status: number, item: any }} The Express response or an error object.
 */
export const hashPassword = async (password) => {
	try {
		const saltRounds = 10 // Number of salt rounds for bcryptjs to generate
		const results = await new Promise((resolve, reject) => {
			bcryptjs.hash(password, saltRounds, (err, hash) => {
				if (err) {
					// Error during password comparison
<<<<<<< HEAD
					reject({ status: 500, item: logError('encrypt password', err) }) // Reject the promise with the error
=======
					logError('encrypt password', err)
					reject({ status: 500, item: err }) // Reject the promise with the error
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
				} else {
					// Passwords match, login successful
					resolve({ status: 200, item: hash }) // Resolve the promise with the hash value
				}
			})
		})
		return results
	} catch (err) {
<<<<<<< HEAD
		return { status: 500, item: logError('encrypt password', err) }
=======
		logError('encrypt password', err)
		return { status: 500, item: err }
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}
///////////////////////////////////

/**
 * Compare the input password and the hashed password stored in the database.
 *
 * @param {string} plain_password Plain text
 * @param {string} hashed_password Hashed text
 * @returns {{ status: number, item: any }} The Express response or an error object.
 */
export const compareHash = async (plain_password, hashed_password) => {
	try {
		const results = await new Promise((resolve, reject) => {
			bcryptjs.compare(plain_password, hashed_password, (err, result) => {
				if (err) {
					// Error during password comparison
<<<<<<< HEAD
					reject({ status: 500, item: logError('compare password', err) })
=======
					logError('compare password', err)
					reject({ status: 500, item: err })
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
				} else {
					// Return the result whether it matches
					resolve({ status: result ? 200 : 401, item: result })
				}
			})
		})
		return results
	} catch (err) {
<<<<<<< HEAD
		return { status: 500, item: logError('compare password', err) }
=======
		logError('compare password', err)
		return { status: 500, item: err }
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}
///////////////////////////////////
