import React from 'react'
import { FaHouse } from 'react-icons/fa6'
import { FaBookOpenReader } from 'react-icons/fa6'
import { FaCalendar } from 'react-icons/fa6'
import MenuButton from './MenuButton'
import { FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Sidebar() {
	return (
		<div className='flex w-64 flex-col border border-l-0 border-t-0 h-screen fixed top-0 left-0 border-gray-300 gap-4 m-0 p-0'>
			<div className='flex flex-col gap-2 p-5'>
				<h1 className='text-2xl mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-700 font-bold'>
					eTutoring
				</h1>
				<MenuButton href='#'>
					<FaHouse className='text-gray-600 h-5 w-5' />{' '}
					<p className='text-sm'>Overview</p>
				</MenuButton>
				<MenuButton href='#'>
					<FaBookOpenReader className='text-gray-600 h-5 w-5' />{' '}
					<p className='text-sm'>My Classes</p>
				</MenuButton>
				<MenuButton href='#'>
					<FaCalendar className='text-gray-600 h-5 w-5' />{' '}
					<p className='text-sm'>Schedule</p>
				</MenuButton>
			</div>
			<div className='fixed bottom-0 border border-l-0 border-r-0 border-b-0 border-gray-300 w-64 p-5'>
				<div className='flex flex-row gap-4 align-middle items-center justify-between'>
					<div className='flex flex-row gap-4 align-middle items-center'>
						<div className='border border-gray-200 rounded-full w-10 h-10 bg-gray-200'></div>
						<div className='flex flex-col'>
							<h4 className='text-sm font-semibold'>John Doe</h4>
							<h4 className='text-sm'>Student</h4>
						</div>
					</div>
					<Link to='/#'>
						<FaGear className='h-5 w-5' />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
