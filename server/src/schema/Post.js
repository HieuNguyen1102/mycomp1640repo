const {
	uuid,
	text,
	pgTable,
	timestamp,
	pgEnum,
	primaryKey,
} = require('drizzle-orm/pg-core')
const { User } = require('./User')

const Post = pgTable('post', {
	postId: uuid('postId').defaultRandom().primaryKey(),
	userId: uuid('userId')
		.references(() => User.userId)
		.notNull(),
	postContent: text('postContent').notNull(),
	postDate: timestamp('postDate', { withTimezone: true })
		.notNull()
		.defaultNow(),
})

module.exports = { Post }
