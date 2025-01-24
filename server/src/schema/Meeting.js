const {
	uuid,
	text,
	pgTable,
	pgEnum,
	timestamp,
} = require('drizzle-orm/pg-core')
const { Tutor } = require('./Tutor')
const { User } = require('./User')

// Define the ENUM type separately
const meetingTypeEnum = pgEnum('meetingType', ['in-person', 'online'])

const Meeting = pgTable('meeting', {
	meetingId: uuid('meetingId').defaultRandom().primaryKey(),
	userId: uuid('userId').references(() => User.userId),
	tutorId: uuid('tutorId')
		.references(() => Tutor.tutorId)
		.notNull(),
	meetingDate: timestamp('meetingDate', { withTimezone: true }).notNull(),
	meetingType: meetingTypeEnum('meetingType').notNull(), // Use the defined ENUM
	meetingNotes: text('meetingNotes'),
	meetingLink: text('meetingLink'),
})

module.exports = { Meeting, meetingTypeEnum } // Export the ENUM
