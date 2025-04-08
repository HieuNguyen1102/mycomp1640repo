import { db } from '../config/db_config.js'
import { eq, and, inArray } from 'drizzle-orm'
import Class from '../schema/Class.js'
import Student from '../schema/Student.js'
import Tutor from '../schema/Tutor.js'
import { Log, logError } from '../lib/logger.js'
import User from '../schema/User.js'
<<<<<<< HEAD
import { deleteMeetingsByClassId } from './meeting.js'
import { deletePostsByClassId } from './post.js'
=======
import { sendMail } from '../lib/mailer.js'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

export const getAllStudents = async () => {
	try {
		const data = await db.select().from(Student)
		Log('got all students')
		return { status: 200, item: data }
	} catch (err) {
		logError('get all students', err)
		return { status: 500, error: err }
	}
}

export const getAllTutors = async () => {
	try {
		const data = await db.select().from(Tutor)
		Log('got all tutors')
		return { status: 200, item: data }
	} catch (err) {
		logError('get all tutors', err)
		return { status: 500, error: err }
	}
}

export async function getAllClasses() {
	try {
<<<<<<< HEAD
		console.log('Starting getAllClasses...')
		
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		// Get all classes first
		const classes = await db
			.select({
				id: Class.id,
				className: Class.className,
				studentId: Class.studentId,
				tutorId: Class.tutorId,
<<<<<<< HEAD
				startDate: Class.startDate,
				endDate: Class.endDate
			})
			.from(Class)

		console.log('Found classes:', classes)

		if (!classes || classes.length === 0) {
			console.log('No classes found')
			return { status: 200, item: [] }
		}

		// Get all unique student and tutor IDs from the classes
		const studentIds = [...new Set(classes.map(c => c.studentId))]
		const tutorIds = [...new Set(classes.map(c => c.tutorId))]

		let students = []
		let tutors = []

		// Only fetch if we have IDs to fetch
		if (studentIds.length > 0) {
			students = await db
				.select({
					studentId: Student.studentId,
					username: User.username,
				})
				.from(Student)
				.innerJoin(User, eq(Student.userId, User.userId))
				.where(inArray(Student.studentId, studentIds))
		}

		if (tutorIds.length > 0) {
			tutors = await db
				.select({
					tutorId: Tutor.tutorId,
					username: User.username,
				})
				.from(Tutor)
				.innerJoin(User, eq(Tutor.userId, User.userId))
				.where(inArray(Tutor.tutorId, tutorIds))
		}

		// Create lookup maps
		const studentMap = Object.fromEntries(
			students.map(s => [s.studentId, s.username])
		)
		const tutorMap = Object.fromEntries(
			tutors.map(t => [t.tutorId, t.username])
		)

		// Map the classes with usernames
		const classesWithUsernames = classes.map(classItem => ({
			...classItem,
			studentUsername: studentMap[classItem.studentId] || 'Unknown Student',
			tutorUsername: tutorMap[classItem.tutorId] || 'Unknown Tutor',
		}))

		return { status: 200, item: classesWithUsernames }
	} catch (error) {
		console.error('Error in getAllClasses:', error)
		logError('get all classes', error)
		return { status: 500, error: `Server error: ${error.message}` }
=======
				description: Class.description,
				startDate: Class.startDate,
				endDate: Class.endDate,
				schedule: Class.schedule,
				meetingLink: Class.meetingLink,
			})
			.from(Class)
			.execute()

		if (!classes) {
			console.error('No classes found')
			return {
				status: 200,
				item: [],
			}
		}

		// Get student and tutor details for each class
		const classesWithDetails = await Promise.all(
			classes.map(async (classItem) => {
				try {
					// Get student details with username from User table
					const student = await db
						.select({
							username: User.username,
						})
						.from(Student)
						.innerJoin(User, eq(Student.userId, User.userId))
						.where(eq(Student.studentId, classItem.studentId))
						.execute()

					// Get tutor details with username from User table
					const tutor = await db
						.select({
							username: User.username,
						})
						.from(Tutor)
						.innerJoin(User, eq(Tutor.userId, User.userId))
						.where(eq(Tutor.tutorId, classItem.tutorId))
						.execute()

					return {
						...classItem,
						studentUsername: student[0]?.username || 'Unknown',
						tutorUsername: tutor[0]?.username || 'Unknown',
					}
				} catch (error) {
					console.error('Error getting details for class:', classItem.id, error)
					return {
						...classItem,
						studentUsername: 'Unknown',
						tutorUsername: 'Unknown',
					}
				}
			}),
		)

		return {
			status: 200,
			item: classesWithDetails || [],
		}
	} catch (error) {
		console.error('Error in getAllClasses:', error)
		return {
			status: 500,
			item: { error: error.message || 'Failed to fetch classes' },
		}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	}
}

export const getClassOfStudentAndTutor = async ({ studentId, tutorId }) => {
	try {
		const data = await db
			.select()
			.from(Class)
			.where(and(eq(Class.studentId, studentId), eq(Class.tutorId, tutorId)))
		Log('class found with user')
		return { status: 200, item: data }
	} catch (err) {
		logError('find class with user', err)
		return { status: 500, error: err }
	}
}

export const getClassesForUser = async (userId, role) => {
	if (role !== 'student' && role !== 'tutor') {
		logError('get classes for user', 'invalid role')
		return { status: 400, error: 'invalid role' }
	}
	try {
		let user = null
		switch (role) {
			case 'student': {
				user = await db.select().from(Student).where(eq(Student.userId, userId))
				break
			}
			case 'tutor': {
				user = await db.select().from(Tutor).where(eq(Tutor.userId, userId))
				break
			}
			default: {
				return { status: 404, error: 'invalid user' }
			}
		}

		if (!user || user.length === 0) {
			logError('get classes for user', 'invalid user')
			return { status: 404, error: 'invalid user' }
		}

		// Get classes for the user
		let classes = await db
<<<<<<< HEAD
			.select({
				id: Class.id,
				className: Class.className,
				studentId: Class.studentId,
				tutorId: Class.tutorId,
				startDate: Class.startDate,
				endDate: Class.endDate
			})
=======
			.select()
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			.from(Class)
			.where(
				role === 'student'
					? eq(Class.studentId, user[0].studentId)
					: eq(Class.tutorId, user[0].tutorId),
			)

		if (!classes || classes.length === 0) {
			return { status: 200, item: [] } // Return empty array instead of error
		}

		// Get all unique student and tutor IDs from the classes
<<<<<<< HEAD
		const studentIds = [...new Set(classes.map(c => c.studentId))]
		const tutorIds = [...new Set(classes.map(c => c.tutorId))]
=======
		const studentIds = [...new Set(classes.map((c) => c.studentId))]
		const tutorIds = [...new Set(classes.map((c) => c.tutorId))]
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

		let students = []
		let tutors = []

		// Only fetch if we have IDs to fetch
		if (studentIds.length > 0) {
			students = await db
				.select({
					studentId: Student.studentId,
					username: User.username,
				})
				.from(Student)
				.innerJoin(User, eq(Student.userId, User.userId))
				.where(inArray(Student.studentId, studentIds))
		}

		if (tutorIds.length > 0) {
			tutors = await db
				.select({
					tutorId: Tutor.tutorId,
					username: User.username,
				})
				.from(Tutor)
				.innerJoin(User, eq(Tutor.userId, User.userId))
				.where(inArray(Tutor.tutorId, tutorIds))
		}

		// Create lookup maps
		const studentMap = Object.fromEntries(
<<<<<<< HEAD
			students.map(s => [s.studentId, s.username])
		)
		const tutorMap = Object.fromEntries(
			tutors.map(t => [t.tutorId, t.username])
		)

		// Map the classes with usernames
		const classesWithUsernames = classes.map(classItem => ({
=======
			students.map((s) => [s.studentId, s.username]),
		)
		const tutorMap = Object.fromEntries(
			tutors.map((t) => [t.tutorId, t.username]),
		)

		// Map the classes with usernames
		const classesWithUsernames = classes.map((classItem) => ({
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			...classItem,
			studentUsername: studentMap[classItem.studentId] || 'Unknown Student',
			tutorUsername: tutorMap[classItem.tutorId] || 'Unknown Tutor',
		}))

		Log('classes found with user')

		return {
			status: 200,
			item: classesWithUsernames,
		}
	} catch (err) {
		console.error('Error in getClassesForUser:', err)
		logError('find classes with user', err)
		return { status: 500, error: err.message || 'Internal server error' }
	}
}

export const getClassById = async ({ classId, userId, role }) => {
	try {
		const data = await db.select().from(Class).where(eq(Class.id, classId))
		if (!data || data.length === 0) {
			logError('find class by id', 'class not found')
			return { status: 404, error: 'class not found' }
		}
		const user =
			role === 'student'
				? await db.select().from(Student).where(eq(Student.userId, userId))
				: await db.select().from(Tutor).where(eq(Tutor.userId, userId))
		if (!user || user.length === 0) {
			logError('find class by id', 'invalid user')
			return { status: 404, error: 'invalid user' }
		}
		switch (role) {
			case 'student': {
				if (data[0].studentId !== user[0].studentId) {
					logError('find class by id', 'invalid user')
					return { status: 404, error: 'invalid user' }
				}
				break
			}
			case 'tutor': {
				if (data[0].tutorId !== user[0].tutorId) {
					logError('find class by id', 'invalid user')
					return { status: 404, error: 'invalid user' }
				}
				break
			}
		}
		Log('class found by id')
		return { status: 200, item: data[0] }
	} catch (err) {
		logError('find class by id', err)
		return { status: 500, error: err }
	}
}

export const getDataForCreatingClass = async () => {
	try {
		const students = []
		const tutors = []
		const students_raw = await db.select().from(Student)
		for (let i = 0; i < students_raw.length; i++) {
			const student = await db
				.select()
				.from(User)
				.where(eq(User.userId, students_raw[i].userId))
				.limit(1)

			if (student && student.length > 0) {
				students.push({ ...students_raw[i], username: student[0].username })
			}
		}

		const tutors_raw = await db.select().from(Tutor)
		for (let i = 0; i < tutors_raw.length; i++) {
			const tutor = await db
				.select()
				.from(User)
				.where(eq(User.userId, tutors_raw[i].userId))
				.limit(1)

			if (tutor && tutor.length > 0) {
				tutors.push({ ...tutors_raw[i], username: tutor[0].username })
			}
		}

		return { status: 200, item: { students, tutors } }
	} catch (err) {
		logError('get data for creating class', err)
		return { status: 500, error: err }
	}
}

<<<<<<< HEAD
export const addNewClass = async ({ studentId, tutorId, className, startDate, endDate }) => {
	try {
		console.log('Received data:', { studentId, tutorId, className, startDate, endDate })
		
		// Validate required fields
		if (!studentId || !tutorId || !className) {
			console.log('Missing required fields:', { studentId, tutorId, className })
			return { status: 400, error: 'Missing required fields' }
		}

		// Validate student exists
		const student = await db.select().from(Student).where(eq(Student.studentId, studentId))
		console.log('Found student:', student)
		if (!student || student.length === 0) {
			return { status: 400, error: 'Invalid student ID' }
		}

		// Validate tutor exists
		const tutor = await db.select().from(Tutor).where(eq(Tutor.tutorId, tutorId))
		console.log('Found tutor:', tutor)
		if (!tutor || tutor.length === 0) {
			return { status: 400, error: 'Invalid tutor ID' }
		}
=======
export const addNewClass = async ({
	studentId,
	tutorId,
	className,
	description,
	startDate,
	endDate,
	schedule,
	meetingLink,
}) => {
	try {
		// Validate required fields
		if (!studentId || !tutorId || !className) {
			logError(
				'add a new class',
				'Missing required fields: ' + { studentId, tutorId, className },
			)
			return { status: 400, error: 'Missing required fields' }
		}

		let studentUser = null
		let tutorUser = null

		// Validate student exists
		const student = await db
			.select()
			.from(Student)
			.where(eq(Student.studentId, studentId))
		if (!student || student.length === 0) {
			return { status: 400, error: 'Invalid student ID' }
		}
		studentUser = await db
			.select()
			.from(User)
			.where(eq(User.userId, student[0].userId))
		if (!studentUser || studentUser.length === 0) {
			return { status: 400, error: 'Invalid student ID' }
		}

		// Validate tutor exists
		const tutor = await db
			.select()
			.from(Tutor)
			.where(eq(Tutor.tutorId, tutorId))
		if (!tutor || tutor.length === 0) {
			return { status: 400, error: 'Invalid tutor ID' }
		}
		tutorUser = await db
			.select()
			.from(User)
			.where(eq(User.userId, tutor[0].userId))
		if (!tutorUser || tutorUser.length === 0) {
			return { status: 400, error: 'Invalid tutor ID' }
		}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

		// Validate dates if provided
		if (startDate && endDate) {
			const start = new Date(startDate)
			const end = new Date(endDate)
<<<<<<< HEAD
			console.log('Dates:', { start, end })
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				return { status: 400, error: 'Invalid date format' }
			}
			if (start > end) {
				return { status: 400, error: 'Start date must be before end date' }
			}
		}

<<<<<<< HEAD
		const values = { 
			studentId, 
			tutorId, 
			className,
			startDate: startDate ? new Date(startDate) : null,
			endDate: endDate ? new Date(endDate) : null
		}
		console.log('Inserting values:', values)
=======
		// Validate schedule if provided
		if (schedule) {
			if (!Array.isArray(schedule.days) || !Array.isArray(schedule.times)) {
				return { status: 400, error: 'Invalid schedule format' }
			}
		}

		const values = {
			studentId,
			tutorId,
			className,
			description: description || null,
			startDate: startDate ? new Date(startDate) : null,
			endDate: endDate ? new Date(endDate) : null,
			schedule: schedule || null,
			meetingLink: meetingLink || null,
		}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

		try {
			const newRow = await db
				.insert(Class)
				.values(values)
				.onConflictDoNothing()
				.returning()

<<<<<<< HEAD
			console.log('Insert result:', newRow)

=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			if (!newRow || newRow.length === 0) {
				return { status: 500, error: 'Failed to create class' }
			}

			Log('new class added')
<<<<<<< HEAD
=======
			await sendMail({
				recipient: studentUser[0].email,
				content: `<p>You have been successfully added to this class: ${className}</p>`,
				subject: 'Class creation notice',
				success: true,
			})

			await sendMail({
				recipient: tutorUser[0].email,
				content: `<p>You have been successfully added to this class: ${className}</p>`,
				subject: 'Class creation notice',
				success: true,
			})
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			return { status: 200, item: newRow[0] }
		} catch (dbError) {
			console.error('Database error:', dbError)
			return { status: 500, error: `Database error: ${dbError.message}` }
		}
	} catch (err) {
		console.error('Error in addNewClass:', err)
		logError('add new class', err)
		return { status: 500, error: `Server error: ${err.message}` }
	}
}

<<<<<<< HEAD
export async function reallocateClass({ classId, studentId, tutorId, className }) {
	try {
		console.log('Reallocation request:', { classId, studentId, tutorId, className })
=======
export async function reallocateClass({ classId, newStudentId, newTutorId }) {
	try {
		if (!classId || !newStudentId || !newTutorId)
			return { status: 400, item: { error: 'Missing required fields' } }

		let studentUser = null
		let tutorUser = null
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

		// Validate that the class exists
		const existingClass = await db
			.select()
			.from(Class)
			.where(eq(Class.id, classId))
			.execute()

<<<<<<< HEAD
		if (!existingClass || existingClass.length === 0) {
			return { status: 404, item: { error: 'Class not found' } }
		}

		// Build update object based on provided values
		const updateObj = {}
		if (studentId) {
=======
		if (!existingClass || existingClass.length === 0)
			return { status: 404, item: { error: 'Class not found' } }

		// Build update object based on provided values
		const updateObj = {}
		if (newStudentId) {
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			// Validate that the student exists
			const student = await db
				.select()
				.from(Student)
<<<<<<< HEAD
				.where(eq(Student.studentId, studentId))
=======
				.where(eq(Student.studentId, newStudentId))
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
				.execute()

			if (!student || student.length === 0) {
				return { status: 404, item: { error: 'Student not found' } }
			}
<<<<<<< HEAD
			updateObj.studentId = studentId
		}

		if (tutorId) {
=======
			updateObj.studentId = newStudentId

			studentUser = await db
				.select()
				.from(User)
				.where(eq(User.userId, student[0].userId))
				.execute()

			if (!studentUser || studentUser.length === 0) {
				return { status: 404, item: { error: 'Student not found' } }
			}
		}

		if (newTutorId) {
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			// Validate that the tutor exists
			const tutor = await db
				.select()
				.from(Tutor)
<<<<<<< HEAD
				.where(eq(Tutor.tutorId, tutorId))
				.execute()

			if (!tutor || tutor.length === 0) {
				return { status: 404, item: { error: 'Tutor not found' } }
			}
			updateObj.tutorId = tutorId
		}
		
		if (className) {
			updateObj.className = className
=======
				.where(eq(Tutor.tutorId, newTutorId))
				.execute()

			if (!tutor || tutor.length === 0)
				return { status: 404, item: { error: 'Tutor not found' } }

			updateObj.tutorId = newTutorId

			tutorUser = await db
				.select()
				.from(User)
				.where(eq(User.userId, tutor[0].userId))
				.execute()

			if (!tutorUser || tutorUser.length === 0) {
				return { status: 404, item: { error: 'Tutor not found' } }
			}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		}

		// If no updates are provided
		if (Object.keys(updateObj).length === 0) {
			return { status: 400, item: { error: 'No changes requested' } }
		}

		// Perform the update
		const result = await db
			.update(Class)
			.set(updateObj)
			.where(eq(Class.id, classId))
<<<<<<< HEAD
			.execute()

		console.log('Update result:', result)
		
		// Get the updated class with complete details
		const fullClassDetails = await getFullClassDetails(classId);
		
		return { 
			status: 200, 
			item: { 
				success: true, 
				message: 'Class reallocated successfully',
				updatedClass: fullClassDetails
			} 
		}

	} catch (error) {
		console.error('Error in reallocateClass:', error)
		return { 
			status: 500, 
			item: { 
				error: error.message || 'Failed to reallocate class' 
			} 
		}
	}
}

// Helper function to get full class details including usernames
async function getFullClassDetails(classId) {
	try {
		// Get the class data
		const classData = await db
			.select()
			.from(Class)
			.where(eq(Class.id, classId))
			.execute();
			
		if (!classData || classData.length === 0) {
			return null;
		}
		
		const classItem = classData[0];
		
		// Get student username
		const studentData = await db
			.select({
				studentId: Student.studentId,
				username: User.username,
			})
			.from(Student)
			.innerJoin(User, eq(Student.userId, User.userId))
			.where(eq(Student.studentId, classItem.studentId))
			.execute();
			
		// Get tutor username
		const tutorData = await db
			.select({
				tutorId: Tutor.tutorId,
				username: User.username,
			})
			.from(Tutor)
			.innerJoin(User, eq(Tutor.userId, User.userId))
			.where(eq(Tutor.tutorId, classItem.tutorId))
			.execute();
			
		// Build the full class object with usernames
		return {
			...classItem,
			studentUsername: studentData.length > 0 ? studentData[0].username : 'Unknown Student',
			tutorUsername: tutorData.length > 0 ? tutorData[0].username : 'Unknown Tutor',
		};
	} catch (error) {
		console.error('Error in getFullClassDetails:', error);
		return null;
	}
}

export const updateClass = async ({ classId, className, startDate, endDate }) => {
	try {
		console.log('Updating class:', { classId, className, startDate, endDate });

		// Validate class exists
		const existingClass = await db
			.select()
			.from(Class)
			.where(eq(Class.id, classId));

		if (!existingClass || existingClass.length === 0) {
			return { status: 404, error: 'Class not found' };
		}

		// Validate dates if provided
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);
			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				return { status: 400, error: 'Invalid date format' };
			}
			if (start > end) {
				return { status: 400, error: 'Start date must be before end date' };
			}
		}

		// Build update object
		const updateData = {
			...(className && { className }),
			...(startDate && { startDate: new Date(startDate) }),
			...(endDate && { endDate: new Date(endDate) }),
		};

		// Update the class
		const updatedClass = await db
			.update(Class)
			.set(updateData)
			.where(eq(Class.id, classId))
			.returning();

		if (!updatedClass || updatedClass.length === 0) {
			return { status: 500, error: 'Failed to update class' };
		}

		Log('class updated');
		return { status: 200, item: updatedClass[0] };
	} catch (error) {
		console.error('Error in updateClass:', error);
		logError('update class', error);
		return { status: 500, error: error.message || 'Failed to update class' };
	}
};

export const deleteClass = async ({ classId }) => {
	try {
		console.log('Deleting class:', classId);

		// Validate class exists
		const existingClass = await db
			.select()
			.from(Class)
			.where(eq(Class.id, classId));

		if (!existingClass || existingClass.length === 0) {
			return { status: 404, error: 'Class not found' };
		}

		// Delete related meetings
		const meetingsResult = await deleteMeetingsByClassId(classId);
		if (meetingsResult.status !== 200) {
			console.error('Failed to delete meetings for class:', meetingsResult.error);
			return { status: 500, error: 'Failed to delete meetings for class' };
		}
		
		console.log(`Successfully deleted ${meetingsResult.item.count} meetings for class ${classId}`);

		// Delete related posts and their comments
		const postsResult = await deletePostsByClassId(classId);
		if (postsResult.status !== 200) {
			console.error('Failed to delete posts for class:', postsResult.error);
			return { status: 500, error: 'Failed to delete posts for class' };
		}
		
		console.log(`Successfully deleted ${postsResult.item.count} posts for class ${classId}`);

		// Delete the class
		const deletedClass = await db
			.delete(Class)
			.where(eq(Class.id, classId))
			.returning();

		if (!deletedClass || deletedClass.length === 0) {
			return { status: 500, error: 'Failed to delete class' };
		}

		Log('class deleted');
		return { 
			status: 200, 
			message: `Class deleted successfully. ${meetingsResult.item.count} related meetings and ${postsResult.item.count} related posts were also removed.` 
		};
	} catch (error) {
		console.error('Error in deleteClass:', error);
		logError('delete class', error);
		return { status: 500, error: error.message || 'Failed to delete class' };
	}
};
=======
			.returning()

		if (!result || result.length === 0) {
			logError('update class', 'Failed to update class')
			return { status: 500, item: { error: 'Failed to update class' } }
		}

		const emailContent = `
			<p>You have been successfully reallocated to this class: ${result[0].className}</p>
		`

		await sendMail({
			recipient: studentUser[0].email,
			content: emailContent,
			subject: 'Class reallocation notice',
			success: true,
		})
		await sendMail({
			recipient: tutorUser[0].email,
			content: emailContent,
			subject: 'Class reallocation notice',
			success: true,
		})
		return {
			status: 200,
			item: {
				success: true,
				message: 'Class reallocated successfully',
			},
		}
	} catch (error) {
		console.error('Error in reallocateClass:', error)
		return {
			status: 500,
			item: {
				error: error.message || 'Failed to reallocate class',
			},
		}
	}
}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
