import { z } from 'zod'

export const addClassSchema = z.object({
	className: z.string().min(1, 'Required'),
	studentId: z.string().min(1, 'Required'),
	tutorId: z.string().min(1, 'Required'),
})
