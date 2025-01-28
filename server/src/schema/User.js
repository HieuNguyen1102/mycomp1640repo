import { uuid, text, boolean, pgTable } from 'drizzle-orm/pg-core'

const User = pgTable('user', {
	userId: uuid('userId').defaultRandom().primaryKey(),
	username: text('username').notNull(),
	password: text('password').notNull(),
	email: text('email').notNull(),
	isActive: boolean('isActive').default(false).notNull(),
	isLocked: boolean('isLocked').default(false).notNull(),
})
export default User
