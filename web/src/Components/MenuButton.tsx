import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuButton({
	children,
	href,
}: {
	children: any
	href: string
}) {
	return (
		<div>
			<Link
<<<<<<< HEAD
				className='flex flex-row items-center gap-4 p-2 hover:bg-pink-50 h-10 rounded-md text-gray-500 hover:text-purple-700'
=======
				className='flex flex-row items-center gap-4 p-2 hover:bg-pink-50 rounded-md text-gray-500 hover:text-purple-700 h-fit'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
				to={href}
			>
				{children}
			</Link>
		</div>
	)
}
