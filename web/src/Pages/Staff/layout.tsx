import { Outlet } from 'react-router-dom'
import StaffSidebar from '@/components/StaffSidebar'

function StaffLayout() {
	return (
		<div className='bg-accent/5 min-h-screen'>
			<div className='flex flex-row'>
				<StaffSidebar />
				<div className='flex-1 ml-64 container p-15'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default StaffLayout
