import { uuid, pgTable, text } from 'drizzle-orm/pg-core'
import Tutor from './Tutor.js'
import Student from './Student.js'

const Class = pgTable('class', {
	id: uuid('id').defaultRandom().primaryKey(),
	className: text('className').notNull(),
	studentId: uuid('studentId')
		.references(() => Student.studentId)
		.notNull(),
	tutorId: uuid('tutorId')
		.references(() => Tutor.tutorId)
		.notNull(),
})
export default Class
