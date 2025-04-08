import {
	uuid,
	text,
	pgTable,
	timestamp,
	pgEnum,
	primaryKey,
	unique,
} from 'drizzle-orm/pg-core'
import User from './User.js'
<<<<<<< HEAD
import Class from './Class.js'
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

const Post = pgTable('post', {
	postId: uuid('postId').defaultRandom().unique().primaryKey(),
	userId: uuid('userId')
		.references(() => User.userId)
		.notNull(),
<<<<<<< HEAD
	classId: uuid('classId')
		.references(() => Class.id)
		.notNull(),
	title: text('title').notNull(),
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	postContent: text('postContent').notNull(),
	postDate: timestamp('postDate', { withTimezone: true })
		.notNull()
		.defaultNow(),
})

export default Post
