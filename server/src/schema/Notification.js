const {
	uuid,
	text,
	pgTable,
	timestamp,
	pgEnum,
	primaryKey,
} = require('drizzle-orm/pg-core')
const { User } = require('./User')

const Notification = pgTable('notification', {
	notificationId: uuid('notificationId').defaultRandom().primaryKey(),
	userId: uuid('userId')
		.references(() => User.userId)
		.notNull(),
	notificationContent: text('notificationContent').notNull(),
	notificationDate: timestamp('notificationDate', { withTimezone: true })
		.notNull()
		.defaultNow(),
})

module.exports = { Notification }
