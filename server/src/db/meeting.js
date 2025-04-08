import { eq } from 'drizzle-orm'
import { db } from '../config/db_config.js'
import { logError } from '../lib/logger.js'
import { Meeting } from '../schema/Meeting.js'
import Class from '../schema/Class.js'
import Tutor from '../schema/Tutor.js'

export const getAllMeetingsOfAClass = async (classId) => {
	try {
		const meetings = await db
<<<<<<< HEAD
			.select({
				meetingId: Meeting.meetingId,
				classId: Meeting.classId,
				meetingDate: Meeting.meetingDate,
				meetingType: Meeting.meetingType,
				meetingNotes: Meeting.meetingNotes,
				meetingLink: Meeting.meetingLink,
				location: Meeting.location,
				studentAttended: Meeting.studentAttended
			})
=======
			.select()
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			.from(Meeting)
			.where(eq(Meeting.classId, classId))

		if (meetings.length === 0) {
<<<<<<< HEAD
			return {
				status: 200,
				item: []
=======
			logError('get all meetings of a class', 'No meetings found')
			return {
				status: 404,
				item: 'No meetings found',
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			}
		}

		const this_class = await db
<<<<<<< HEAD
			.select({
				id: Class.id,
				className: Class.className,
				tutorId: Class.tutorId,
				studentId: Class.studentId,
				startDate: Class.startDate,
				endDate: Class.endDate
			})
=======
			.select()
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			.from(Class)
			.where(eq(Class.id, classId))

		if (this_class.length === 0) {
<<<<<<< HEAD
			return {
				status: 200,
				item: []
=======
			logError('get all meetings of a class', 'Invalid class')
			return {
				status: 404,
				item: 'Invalid class',
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			}
		}

		const tutor = await db
<<<<<<< HEAD
			.select({
				tutorId: Tutor.tutorId
			})
=======
			.select()
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			.from(Tutor)
			.where(eq(Tutor.tutorId, this_class[0].tutorId))

		if (tutor.length === 0) {
<<<<<<< HEAD
			return {
				status: 200,
				item: []
=======
			logError('get all meetings of a class', 'Invalid tutor')
			return {
				status: 404,
				item: 'Invalid tutor',
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			}
		}

		const processed_meetings = meetings.map((meeting) => ({
			meetingId: meeting.meetingId,
<<<<<<< HEAD
			classId: meeting.classId,
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			meetingDate: new Date(meeting.meetingDate).toLocaleString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			}),
			meetingType: meeting.meetingType,
<<<<<<< HEAD
			meetingLink: meeting.meetingLink || null,
			location: meeting.location || null,
			meetingNotes: meeting.meetingNotes || null,
			studentAttended: meeting.studentAttended
=======
			meetingLink: meeting.meetingLink,
			location: meeting.location,
			meetingNotes: meeting.meetingNotes,
			studentAttended: meeting.studentAttended,
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		}))

		return { status: 200, item: processed_meetings }
	} catch (err) {
<<<<<<< HEAD
		console.error('Error in getAllMeetingsOfAClass:', err)
		return {
			status: 500,
			item: []
=======
		logError('get all meetings of a class', err)
		return {
			status: 500,
			item: err,
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		}
	}
}

export const newMeeting = async ({
	classId,
	meetingDate,
	meetingType,
<<<<<<< HEAD
	meetingNote,
=======
	meetingNotes,
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	meetingLink,
	location,
	studentAttended,
}) => {
	try {
<<<<<<< HEAD
		console.log({
			classId,
			meetingDate,
			meetingType,
			meetingNote,
			meetingLink,
			location,
			studentAttended,
		})
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		const newMeeting = await db
			.insert(Meeting)
			.values({
				classId,
				meetingDate: new Date(meetingDate),
				meetingType,
<<<<<<< HEAD
				meetingNotes: meetingNote ? meetingNote : null,
=======
				meetingNotes: meetingNotes ? meetingNotes : null,
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
				meetingLink: meetingLink ? meetingLink : null,
				location: location ? location : null,
				studentAttended,
			})
			.returning()

		if (newMeeting.length === 0) {
			logError('create a new meeting', 'Failed to create a new meeting')
			return {
				status: 500,
				item: 'Failed to create a new meeting',
			}
		}

		return { status: 200, item: newMeeting }
	} catch (err) {
		logError('create a new meeting', err)
		return {
			status: 500,
			item: err,
		}
	}
}

export const changeMeetingAttendance = async ({ meetings }) => {
	try {
		for (let i = 0; i < meetings.length; i++) {
			const meeting = await db
				.update(Meeting)
				.set({ studentAttended: meetings[i].status })
				.where(eq(Meeting.meetingId, meetings[i].meetingId))
				.returning()

			if (meeting.length === 0) {
				logError(
					'change meeting attendance',
					'Failed to change meeting attendance',
				)
				return {
					status: 500,
					item: 'Failed to change meeting attendance',
				}
			}
		}

		return { status: 200, item: 'Attendance status updated successfully' }
	} catch (err) {
		logError('change meeting attendance', err)
		return {
			status: 500,
			item: err,
		}
	}
}
<<<<<<< HEAD

export const deleteMeetingsByClassId = async (classId) => {
	try {
		// First check if there are any meetings for this class
		const meetings = await db
			.select({
				meetingId: Meeting.meetingId
			})
			.from(Meeting)
			.where(eq(Meeting.classId, classId));
		
		if (meetings.length === 0) {
			// No meetings found for this class
			return { 
				status: 200, 
				item: { 
					message: 'No meetings to delete', 
					count: 0 
				} 
			};
		}

		// Delete all meetings for this class
		const deletedMeetings = await db
			.delete(Meeting)
			.where(eq(Meeting.classId, classId))
			.returning();

		return { 
			status: 200, 
			item: { 
				message: 'All meetings deleted successfully', 
				count: deletedMeetings.length 
			} 
		};
	} catch (error) {
		console.error('Error in deleteMeetingsByClassId:', error);
		logError('delete meetings by class ID', error);
		return {
			status: 500,
			error: error.message || 'Failed to delete meetings'
		};
	}
}
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
