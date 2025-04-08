<<<<<<< HEAD
import React, { lazy, ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
import Layout from './Pages/layout'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import OverViewPage from './Pages/Overview'
import ClassesPage from './Pages/Classes'
import NotFound from '@/Components/NotFound'
import StaffLayout from './Pages/Staff/layout'
import ReallocatePage from './Pages/Staff/Reallocate'
import AddClass from './Pages/Staff/Class/AddClass'
import StaffDashboardPage from './Pages/Staff/StaffDashboardPage'
<<<<<<< HEAD
import { GlobalStateProvider, useGlobalState } from './misc/GlobalStateContext'
import MessagePage from './Pages/Classes/ClassPage/Message'
=======
import { GlobalStateProvider } from './misc/GlobalStateContext'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
import ClassPage from './Pages/Classes/ClassPage'
import { Toaster } from '@/Components/ui/toaster'
import MeetingPage from './Pages/Staff/Class/MeetingPage'
import NewMeeting from './Pages/Staff/Class/MeetingPage/NewMeeting'
<<<<<<< HEAD
import Schedule from './Pages/Schedule'

// Root redirect component
function RootRedirect() {
	const { currentUser, authToken } = useGlobalState()
	
	if (!authToken) {
		return <Navigate to="/login" replace />
	}
	
	if (currentUser?.role === 'staff') {
		return <Navigate to="/staff" replace />
	}
	
	// Only redirect to dashboard if currentUser has an id
	if (currentUser && currentUser.id) {
		return <Navigate to={`/dashboard/${currentUser.id}`} replace />
	}
	
	// Show loading state until user data is available
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
		</div>
	)
}

// Redirect to the current user's dashboard
function DashboardRedirect() {
	const { currentUser } = useGlobalState()
	
	if (!currentUser || !currentUser.id) {
		// Optional: show loading state until user data is available
		return (
			<div className="flex items-center justify-center h-full">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
			</div>
		)
	}
	
	return <Navigate to={`/dashboard/${currentUser.id}`} replace />
}

// TutorRoute - Protects routes that should only be accessible by tutors
interface TutorRouteProps {
	element: ReactElement;
}

function TutorRoute({ element }: TutorRouteProps) {
	const { currentUser } = useGlobalState()
	
	// Show loading state until authentication is checked
	if (!currentUser) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
			</div>
		)
	}
	
	// Redirect non-tutors to dashboard
	if (currentUser.role !== 'tutor') {
		return <Navigate to="/dashboard" replace />
	}
	
	// If user is a tutor, render the protected component
	return element
}
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

function App() {
	return (
		<GlobalStateProvider>
			<Router>
				<Routes>
<<<<<<< HEAD
					{/* Root redirect */}
					<Route path="/" element={<RootRedirect />} />

					{/* Public routes */}
					<Route path='/login' element={<LoginPage />} />

					{/* Student/User routes */}
					<Route element={<Layout />}>
						{/* Dashboard routes */}
						<Route path='/dashboard'>
							<Route index element={<DashboardRedirect />} />
							<Route path=':userId' element={<OverViewPage />} />
							<Route path='overview' element={<DashboardRedirect />} />
							<Route path='schedule' element={<Schedule />} />
							
							{/* Classes routes */}
							<Route path='classes'>
								<Route index element={<ClassesPage />} />
								<Route path=':id'>
									<Route index element={<ClassPage />} />
									<Route path='meetings'>
										<Route index element={<TutorRoute element={<MeetingPage />} />} />
										<Route path='new' element={<TutorRoute element={<NewMeeting />} />} />
										<Route path='newMeeting' element={<TutorRoute element={<NewMeeting />} />} />
									</Route>
								</Route>
							</Route>
						</Route>
					</Route>

					{/* Staff routes */}
					<Route element={<StaffLayout />}>
						<Route path='/staff'>
							<Route index element={<StaffDashboardPage />} />
							<Route path='classes'>
								<Route path='new' element={<AddClass />} />
							</Route>
							<Route path='reallocate' element={<ReallocatePage />} />
						</Route>
					</Route>

					{/* Catch-all route for 404 */}
					<Route path='*' element={<NotFound />} />
=======
					<Route
						path='*'
						element={<NotFound />}
					/>
					<Route
						index
						path='/login'
						element={<LoginPage />}
					/>
					<Route element={<Layout />}>
						<Route
							index
							path='/'
							element={<HomePage />}
						/>
						<Route
							path='/dashboard/overview'
							element={<OverViewPage />}
						/>

						<Route
							index
							path='/dashboard/classes'
							element={<ClassesPage />}
						/>
						<Route
							index
							path='/dashboard/classes/:id'
							element={<ClassPage />}
						/>
						<Route
							path='/dashboard/classes/:id/meetings'
							element={<MeetingPage />}
						/>
						<Route
							path='/dashboard/classes/:id/meetings/newMeeting'
							element={<NewMeeting />}
						/>
					</Route>
					<Route element={<StaffLayout />}>
						<Route
							path='/staff'
							element={<StaffDashboardPage />}
						/>
						<Route
							path='/staff/classes/new'
							element={<AddClass />}
						/>
						<Route
							path='/staff/reallocate'
							element={<ReallocatePage />}
						/>
					</Route>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
				</Routes>
				<Toaster />
			</Router>
		</GlobalStateProvider>
	)
}

export default App
