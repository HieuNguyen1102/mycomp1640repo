const { uuid, pgTable, primaryKey, text } = require('drizzle-orm/pg-core')
const { User } = require('./User')
const { Tutor } = require('./Tutor')

const Student = pgTable('student', {
	studentId: uuid('studentId').defaultRandom().primaryKey(),
	userId: uuid('userId')
		.references(() => User.userId)
		.notNull(),
	personalTutorId: uuid('personalTutorId')
		.references(() => Tutor.tutorId)
		.notNull(),
})
module.exports = { Student }
