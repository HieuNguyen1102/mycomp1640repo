const { uuid, pgTable, text, primaryKey } = require('drizzle-orm/pg-core')
const { User } = require('./User')

const Tutor = pgTable('tutor', {
	tutorId: uuid('tutorId').defaultRandom().primaryKey(),
	userId: uuid('userId')
		.references(() => User.userId)
		.notNull(),
})
module.exports = { Tutor }
