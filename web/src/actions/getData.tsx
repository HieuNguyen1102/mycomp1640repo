export const getDataForCreatingClass = async () => {
	const response = await fetch(
		import.meta.env.VITE_HOST + '/getDataForCreatingClass',
	)
	const data = await response.json()

	if (response.status !== 200) {
		return { students: [], tutors: [] }
	}
	return data
}
