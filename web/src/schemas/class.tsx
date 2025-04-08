import { z } from 'zod'

<<<<<<< HEAD
=======
const scheduleSchema = z.object({
	days: z.array(z.string()),
	times: z.array(z.string())
})

>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
export const addClassSchema = z.object({
	className: z.string().min(1, 'Required'),
	studentId: z.string().min(1, 'Required'),
	tutorId: z.string().min(1, 'Required'),
<<<<<<< HEAD
	startDate: z.string().optional(),
	endDate: z.string().optional()
=======
	description: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	schedule: scheduleSchema.optional(),
	meetingLink: z.string().url('Must be a valid URL').optional()
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
})
