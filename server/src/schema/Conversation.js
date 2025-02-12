import {
	uuid,
	text,
	pgTable,
	timestamp,
	pgEnum,
	primaryKey,
} from 'drizzle-orm/pg-core'
import User from './User.js'

const Conversation = pgTable('conversation', {
	conversationId: uuid('conversationId').defaultRandom().primaryKey(),
})

export default Conversation
