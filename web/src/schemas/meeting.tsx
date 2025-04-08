import { z } from 'zod'

export const newMeetingSchema = z
	.object({
		classId: z.string().min(1, 'Required'),
		meetingDate: z.string().min(1, 'Required'),
		meetingType: z.string().min(1, 'Required'),
<<<<<<< HEAD
		meetingNote: z.string(),
=======
		meetingNotes: z.string(),
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		meetingLink: z.string().optional(),
		location: z.string().optional(),
		studentAttended: z.number().default(0),
	})
	.superRefine((data, ctx) => {
		if (data.meetingType === 'online' && !data.meetingLink) {
			ctx.addIssue({
				code: 'custom',
				message: 'You must provide a meeting link for online meetings',
				path: ['meetingLink'],
			})
		} else if (data.meetingType === 'in-person' && !data.location) {
			ctx.addIssue({
				code: 'custom',
				message: 'You must provide a location for in-person meetings',
				path: ['location'],
			})
		}
	})

export const meetingAttendanceSchema = z.object({
	meetings: z.array(
		z.object({
			meetingId: z.string(),
			status: z.number(),
		}),
	),
})
