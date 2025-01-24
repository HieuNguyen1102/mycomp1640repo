const {
	uuid,
	text,
	pgTable,
	timestamp,
	pgEnum,
	primaryKey,
} = require('drizzle-orm/pg-core')
const { User } = require('./User')

const Message = pgTable('message', {
	messageId: uuid('messageId').defaultRandom().primaryKey(),
	senderId: uuid('senderId')
		.references(() => User.userId)
		.notNull(),
	recipientId: uuid('recipientId')
		.references(() => User.userId)
		.notNull(),
	messageContent: text('messageContent').notNull(),
	sendDate: timestamp('sendDate', { withTimezone: true })
		.notNull()
		.defaultNow(),
})

module.exports = { Message }
