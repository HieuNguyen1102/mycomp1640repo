import { Outlet } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
function Layout() {
	return (
		<div className='bg-accent/5 min-h-screen'>
			<div className='flex flex-row'>
				<Sidebar />
				<div className='flex-1 ml-64 container'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Layout
