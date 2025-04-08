// NodeMailer configuration
import nodemailer from 'nodemailer'

import { Log, logError } from './logger.js'

let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'login',
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
})

/**
 * Sends the email
 *
 * @param {string} recipient - Recipient email
 * @param {string} content - Mail content
 * @param {string} subject - Mail subject
 * @param {string} success - Message after success
 * @returns {Promise<{status: number, item: any}>} - Returns a message after success or error
 */
<<<<<<< HEAD
export const sendMail = async (recipient, content, subject, success) => {
	try {
=======
export const sendMail = async ({ recipient, content, subject, success }) => {
	try {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		let details = {
			from: process.env.GMAIL_USER,
			to: recipient,
			subject,
<<<<<<< HEAD
			content,
=======
			html: content,
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		}

		const results = new Promise(async (resolve, reject) => {
			await mailTransporter.sendMail(details, (err, info) => {
				if (err) {
					console.error(err)
					reject({ status: 500, item: { err, info } })
				}

				resolve({
					status: 200,
					item: success,
				})
			})
		})
		return results
	} catch (err) {
		return { status: 500, item: logError('send an email', err) }
<<<<<<< HEAD
=======
	} finally {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}
