const {
	uuid,
	text,
	Date,
	boolean,
	pgTable,
	primaryKey,
	timestamp,
} = require('drizzle-orm/pg-core')

const User = pgTable('user', {
	userId: uuid('userId').defaultRandom().primaryKey(),
	username: text('username').notNull(),
	password: text('password').notNull(),
	email: text('email').notNull(),
	isActive: boolean('isActive').default(false).notNull(),
	isLocked: boolean('isActive').default(false).notNull(),
	lastLoggedIn: timestamp('lastLoggedIn', { withTimezone: true })
		.notNull()
		.defaultNow(),
})
module.exports = { User }
