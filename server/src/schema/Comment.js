const {
	uuid,
	text,
	pgTable,
	timestamp,
	pgEnum,
	primaryKey,
} = require('drizzle-orm/pg-core')
const { User } = require('./User')
const { Post } = require('./Post')

const Comment = pgTable('comment', {
	commentId: uuid('commentId').defaultRandom().primaryKey(),
	postId: uuid('postId')
		.references(() => Post.postId)
		.notNull(),
	userId: uuid('userId')
		.references(() => User.userId)
		.notNull(),
	commentContent: text('commentContent').notNull(),
	commentDate: timestamp('commentDate', { withTimezone: true })
		.notNull()
		.defaultNow(),
})

module.exports = { Comment }
