<<<<<<< HEAD
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
=======
import { Outlet, useNavigate } from 'react-router-dom'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
import Sidebar from '@/Components/Sidebar'
import { useGlobalState } from '@/misc/GlobalStateContext'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/actions/getData'

function Layout() {
<<<<<<< HEAD
	const { currentUser, authToken, setCurrentUser } = useGlobalState()
	const navigate = useNavigate()
	const location = useLocation()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			if (!authToken) {
				setIsLoading(false)
				navigate('/login')
				return
			}

			try {
				const user = await getCurrentUser(authToken)
				if (!user) {
					setIsLoading(false)
					navigate('/login')
					return
				}
				
				setCurrentUser(user)
				
				// Only redirect staff if they're not viewing a student dashboard
				if (user.role === 'staff' && !location.pathname.startsWith('/dashboard/')) {
					setIsLoading(false)
					navigate('/staff')
					return
				}
				
				// Redirect root path to dashboard only if user has an id
				if (location.pathname === '/' && user.id) {
					navigate(`/dashboard/${user.id}`)
				}
				
				setIsLoading(false)
			} catch (error) {
				console.error('Auth check failed:', error)
				setIsLoading(false)
				navigate('/login')
			}
		}

		checkAuth()
	}, [authToken, navigate, setCurrentUser, location])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
			</div>
		)
	}

	// Allow staff to view student dashboards without sidebar
	if (currentUser?.role === 'staff') {
		return <Outlet />
	}

	if (!currentUser) {
		return null
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 to-blue-50'>
			<div className='flex flex-col md:flex-row'>
				<Sidebar />
				<div className='flex-1 md:ml-64 container py-3 px-2 md:py-6 md:px-8'>
					<div className='bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-3rem)]'>
						<Outlet />
					</div>
=======
	const { currentUser, isLoading, authToken, setIsLoading } = useGlobalState()
	const navigate = useNavigate()

	useEffect(() => {
		try {
			if (!isLoading) {
				if (!currentUser || !authToken) {
					navigate('/login')
				} else {
					if (currentUser.role === 'staff') navigate('/staff')
				}
			}
		} catch (err) {
			console.error('Error navigating:', err)
		} finally {
			setIsLoading(false)
		}
	}, [isLoading, currentUser])

	if (isLoading || !authToken) return <div>Loading...</div>

	return (
		<div className='bg-accent/5 min-h-screen'>
			<div className='flex flex-col'>
				<div className='flex w-full md:w-64 border border-l-0 border-t-0 h-fit md:h-screen fixed sm:top-0 sm:left-0 md:right-0 border-gray-300 gap-4 m-0 p-0 bg-white'>
					<Sidebar />
				</div>

				<div className='flex-1 md:ml-64 mt-20 md:mt-0 bg-gray-50'>
					<Outlet />
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
				</div>
			</div>
		</div>
	)
}

export default Layout
