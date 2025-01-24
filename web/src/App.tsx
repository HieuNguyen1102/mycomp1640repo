import { useEffect, useState } from 'react'

function App() {
	const [dataFetched, setDataFetched] = useState(false)

	const fetchData = async () => {
		const response = await fetch(import.meta.env.VITE_HOST)
		alert(await response.json())
		setDataFetched(true)
	}

	useEffect(() => {
		if (!dataFetched) {
			fetchData()
		}
	}, [dataFetched])
	return (
		<>
			<p>{import.meta.env.VITE_GREETINGS}</p>
		</>
	)
}

export default App
