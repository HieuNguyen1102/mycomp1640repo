import { addClassSchema } from '@/schemas/class'

export const AddNewClass = async (unsafeData: any) => {
	try {
		const { success, data } = addClassSchema.safeParse(unsafeData)

		if (success) {
			const url = import.meta.env.VITE_HOST + '/addNewClass'
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
			const response = await fetch(url, options)
			const returned_data = await response.json()

			if (response.status !== 200) {
				return { students: [], tutors: [] }
			}
			return returned_data
		} else {
			return null
		}
	} catch (err) {
		console.error(err)
		return null
	}
}
