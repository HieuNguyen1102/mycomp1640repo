<<<<<<< HEAD
import { uuid, pgTable, text, unique, timestamp } from 'drizzle-orm/pg-core'
=======
import { uuid, pgTable, text, unique, timestamp, json } from 'drizzle-orm/pg-core'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
import Tutor from './Tutor.js'
import Student from './Student.js'

const Class = pgTable('class', {
	id: uuid('id').defaultRandom().unique().primaryKey(),
	className: text('className').notNull(),
	studentId: uuid('studentId')
		.references(() => Student.studentId)
		.notNull(),
	tutorId: uuid('tutorId')
		.references(() => Tutor.tutorId)
		.notNull(),
<<<<<<< HEAD
	startDate: timestamp('startDate'),
	endDate: timestamp('endDate')
=======
	description: text('description'),
	startDate: timestamp('startDate'),
	endDate: timestamp('endDate'),
	schedule: json('schedule'),
	meetingLink: text('meetingLink')
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
})

export default Class
