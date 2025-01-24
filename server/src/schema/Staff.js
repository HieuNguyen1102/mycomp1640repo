const { uuid, pgTable, primaryKey, text } = require('drizzle-orm/pg-core')
const { User } = require('./User')

const Staff = pgTable('staff', {
	staffId: uuid('staffId').defaultRandom().primaryKey(),
	userId: uuid('userId')
		.references(() => User.userId)
		.notNull(),
})
module.exports = { Staff }
