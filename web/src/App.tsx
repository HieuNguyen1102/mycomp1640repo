import React, { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Pages/layout'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import OverViewPage from './Pages/Overview'
import ClassPage from './Pages/ClassPage'
import NotFound from './components/NotFound'
import StaffLayout from './Pages/Staff'
import EditClass from './Pages/Staff/Class/EditClass'
import AddClass from './Pages/Staff/Class/AddClass'

function App() {
	return (
		<Router>
			<Routes>
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
						element={<ClassPage />}
					/>
					<Route
						index
						path='/dashboard/classes/:id'
						element={<ClassPage />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Route>
				<Route element={<StaffLayout />}>
					<Route
						path='/classes/:id/edit'
						element={<EditClass />}
					/>
					<Route
						path='/classes/add'
						element={<AddClass />}
					/>
				</Route>
			</Routes>
		</Router>
	)
}

export default App
