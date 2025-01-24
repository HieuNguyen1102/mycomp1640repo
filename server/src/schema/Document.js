const {
	uuid,
	text,
	pgTable,
	timestamp,
	pgEnum,
	primaryKey,
} = require('drizzle-orm/pg-core')
const { Tutor } = require('./Tutor')
const { Student } = require('./Student')

const Document = pgTable('document', {
	documentId: uuid('documentId').defaultRandom().primaryKey(),
	tutorId: uuid('tutorId')
		.references(() => Tutor.tutorId)
		.notNull(),
	studentId: uuid('studentId')
		.references(() => Student.studentId)
		.notNull(),
	documentName: text('documentName').notNull(),
	filePath: text('filePath').notNull(),
	uploadDate: timestamp('uploadDate', { withTimezone: true })
		.notNull()
		.defaultNow(),
})

module.exports = { Document }
