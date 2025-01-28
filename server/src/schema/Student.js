import { uuid, pgTable } from 'drizzle-orm/pg-core'
import User from './User.js'
import Tutor from './Tutor.js'

const Student = pgTable('student', {
	studentId: uuid('studentId').defaultRandom().primaryKey(),
	userId: uuid('userId')
		.references(() => User.userId)
		.notNull(),
	personalTutorId: uuid('personalTutorId')
		.references(() => Tutor.tutorId)
		.notNull(),
})
export default Student
