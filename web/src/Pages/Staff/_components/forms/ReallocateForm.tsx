import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/Components/ui/form'
import { Button } from '@/Components/ui/button'
import { useEffect, useState } from 'react'
import { getDataForCreatingClass } from '@/actions/getData'
import { useGlobalState } from '@/misc/GlobalStateContext'
import { getAllClasses } from '@/actions/getData'
import { reallocateClass } from '@/actions/postData'
<<<<<<< HEAD
import { toast } from '@/Components/ui/use-toast'
import { 
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/Components/ui/select'
import { Loader2, CheckCircle, RefreshCw } from 'lucide-react'
import { getSocket, initializeSocket } from '@/lib/socket'

// Schema for the reallocation form
const reallocateSchema = z.object({
	classId: z.string().min(1, 'Required'),
	newStudentId: z.string().optional(),
	newTutorId: z.string().optional(),
})

function ReallocateForm() {
	const { authToken, currentUser } = useGlobalState()
=======

// Schema for the reallocation form
const reallocateSchema = z.object({
	classId: z.string().min(1, 'Please select a class'),
	newStudentId: z.string().min(1, 'Please select a new student'),
	newTutorId: z.string().min(1, 'Please select a new tutor'),
})

function ReallocateForm() {
	const { authToken } = useGlobalState()
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	const [classes, setClasses] = useState([])
	const [selectedClass, setSelectedClass] = useState(null)
	const [studentsAndTutors, setStudentsAndTutors] = useState({
		students: [],
		tutors: [],
	})
	const [isLoading, setIsLoading] = useState(true)
<<<<<<< HEAD
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const [socket, setSocket] = useState<any>(null)
	const [successDetails, setSuccessDetails] = useState<{
		className: string;
		changes: string[];
		timestamp: Date | null;
	} | null>(null)
=======
	const [error, setError] = useState('')
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

	const form = useForm<z.infer<typeof reallocateSchema>>({
		resolver: zodResolver(reallocateSchema),
		defaultValues: {
			classId: '',
<<<<<<< HEAD
			newStudentId: 'none',
			newTutorId: 'none',
		},
	})

	// Initialize socket for connecting to dashboard
	useEffect(() => {
		if (currentUser) {
			initializeSocket(currentUser.username)
			const socketInstance = getSocket()
			setSocket(socketInstance)
			
			// Make sure this component can receive dashboard updates
			socketInstance.emit('joinDashboard')
			
			return () => {
				socketInstance.off('dashboardUpdate')
			}
		}
	}, [currentUser])

=======
			newStudentId: '',
			newTutorId: '',
		},
	})

>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	// Fetch classes and students/tutors data
	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				setError('')

				const [classesData, studentsAndTutorsData] = await Promise.all([
					getAllClasses(authToken),
<<<<<<< HEAD
					getDataForCreatingClass(authToken)
=======
					getDataForCreatingClass(authToken),
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
				])

				if (classesData) {
					setClasses(classesData)
				} else {
					setError('Failed to fetch classes')
				}

				if (studentsAndTutorsData) {
					setStudentsAndTutors(studentsAndTutorsData)
				} else {
					setError('Failed to fetch students and tutors')
				}
			} catch (err) {
				console.error('Error fetching data:', err)
				setError('Failed to load data')
<<<<<<< HEAD
				toast({
					title: "Error",
					description: "Failed to load necessary data. Please try again.",
					variant: "destructive",
				})
=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			} finally {
				setIsLoading(false)
			}
		}

		if (authToken) {
			fetchData()
		}
	}, [authToken])

	// Update selected class when classId changes
	const onClassChange = (classId: string) => {
		const selected = classes.find((c: any) => c.id === classId)
		setSelectedClass(selected)
		form.setValue('classId', classId)
	}

	const onSubmit = async (values: z.infer<typeof reallocateSchema>) => {
		try {
<<<<<<< HEAD
			setIsSubmitting(true)
			setError('')
			setSuccessDetails(null)
			
			// Store original values for comparison
			const originalClass = { ...selectedClass };
			
			// Convert the form values - replace 'none' with empty string for API
			const formData = {
				...values,
				newStudentId: values.newStudentId === 'none' ? '' : values.newStudentId,
				newTutorId: values.newTutorId === 'none' ? '' : values.newTutorId,
			}
			
			if (!formData.newStudentId && !formData.newTutorId) {
				toast({
					title: "Validation Error",
					description: "You must select either a new student or a new tutor (or both).",
					variant: "destructive",
				})
				return
			}
			
			// Lookup new data before API call for the confirmation message
			const newTutor = formData.newTutorId ? 
				studentsAndTutors.tutors.find((t: any) => t.tutorId === formData.newTutorId)?.username : 
				originalClass.tutorUsername;
				
			const newStudent = formData.newStudentId ? 
				studentsAndTutors.students.find((s: any) => s.studentId === formData.newStudentId)?.username : 
				originalClass.studentUsername;
			
			const result = await reallocateClass(authToken, formData);
			
			if (result.success) {
				// Refresh the classes data to get the latest changes
				const updatedClassesData = await getAllClasses(authToken);
				
				// Find the updated class
				const updatedClass = updatedClassesData.find((c: any) => c.id === values.classId);
				
				// Set selected class to the updated one
				if (updatedClass) {
					setSelectedClass(updatedClass);
				}
				
				// Build a detailed confirmation message
				let changes = [];
				if (formData.newTutorId && newTutor !== originalClass.tutorUsername) {
					changes.push(`Changed tutor from "${originalClass.tutorUsername}" to "${newTutor}"`);
				}
				if (formData.newStudentId && newStudent !== originalClass.studentUsername) {
					changes.push(`Changed student from "${originalClass.studentUsername}" to "${newStudent}"`);
				}
				
				const changeMessage = changes.length > 0 
					? changes.join(", ")
					: "No changes were made";
				
				// Store success details for display
				setSuccessDetails({
					className: originalClass.className,
					changes: changes.length > 0 ? changes : ["No changes were made"],
					timestamp: new Date()
				});
				
				toast({
					title: "Class Reallocated Successfully",
					description: (
						<div className="space-y-1">
							<p className="font-medium">{originalClass.className}</p>
							<p className="text-sm">{changeMessage}</p>
						</div>
					),
					duration: 5000,
				});
				
				// Update the classes data in state
				setClasses(updatedClassesData);
				
				// Emit our own dashboardUpdate event to ensure immediate update
				if (socket) {
					console.log('Requesting dashboard update refresh');
					// Directly trigger a data refresh on any listening dashboards
					socket.emit('dashboardUpdate', {
						type: 'reallocateClass',
						data: { refresh: true }
					});
				}
				
				// Reset form
				form.reset({
					classId: '',
					newStudentId: 'none',
					newTutorId: 'none',
				});
				setSelectedClass(null);
			} else {
				setError(result.error || 'Failed to reallocate class')
				toast({
					title: "Error",
					description: result.error || "Failed to reallocate class. Please try again.",
					variant: "destructive",
				})
			}
		} catch (error) {
			console.error('Error in form submission:', error)
			const errorMsg = error instanceof Error ? error.message : 'Failed to reallocate class'
			setError(errorMsg)
			toast({
				title: "Error",
				description: errorMsg,
				variant: "destructive",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleStartNew = () => {
		setSuccessDetails(null);
		form.reset({
			classId: '',
			newStudentId: 'none',
			newTutorId: 'none',
		});
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2" />
				<p className="text-gray-600">Loading form data...</p>
			</div>
		)
	}

	// Show success screen if reallocation was successful
	if (successDetails) {
		return (
			<div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100 text-center">
				<div className="mb-4 flex justify-center">
					<CheckCircle className="h-16 w-16 text-green-500" />
				</div>
				<h3 className="text-xl font-semibold text-green-700 mb-2">Class Reallocated Successfully</h3>
				<div className="mb-4">
					<p className="text-lg font-medium text-purple-700">{successDetails.className}</p>
					<div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
						<h4 className="font-medium text-gray-700 mb-2">Changes made:</h4>
						<ul className="text-left space-y-2">
							{successDetails.changes.map((change, index) => (
								<li key={index} className="flex items-start">
									<span className="mr-2 text-green-500">✓</span>
									<span>{change}</span>
								</li>
							))}
						</ul>
						<p className="text-xs text-gray-500 mt-3">
							{successDetails.timestamp ? 
								`Completed at ${successDetails.timestamp.toLocaleTimeString()}` : 
								''}
						</p>
					</div>
				</div>
				<p className="text-sm text-gray-600 mb-4">
					The dashboard has been updated with these changes. All staff members will see the updated information.
				</p>
				<Button 
					onClick={handleStartNew} 
					className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
				>
					<RefreshCw className="h-4 w-4 mr-2" />
					Reallocate Another Class
				</Button>
			</div>
		);
	}
=======
			setError('')
			const result = await reallocateClass(authToken, values)

			if (result.success) {
				alert('Class reallocated successfully')
				const newStudent = studentsAndTutors.students.find(
					(student) => student.studentId === values.newStudentId,
				)
				const newTutor = studentsAndTutors.tutors.find(
					(tutor) => tutor.tutorId === values.newTutorId,
				)

				setSelectedClass((prevClass) =>
					prevClass
						? {
								...prevClass,
								studentUsername: newStudent.username,
								tutorUsername: newTutor.username,
						  }
						: null,
				)
			} else {
				setError(result.error || 'Failed to reallocate class')
			}
		} catch (error) {
			console.error('Error in form submission:', error)
			setError(
				error instanceof Error ? error.message : 'Failed to reallocate class',
			)
		}
	}

	if (isLoading) return <div>Loading...</div>

	if (error) return <div className='text-red-500'>{error}</div>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex gap-6 flex-col'
			>
				<div className='flex gap-6 flex-col'>
<<<<<<< HEAD
=======
					{/* Show current class details if a class is selected */}
					{selectedClass && (
						<div className='bg-gray-50 p-4 rounded-md'>
							<h3 className='font-semibold mb-2'>Current Class Details</h3>
							<p>Class Name: {selectedClass.className}</p>
							<p>Current Student: {selectedClass.studentUsername}</p>
							<p>Current Tutor: {selectedClass.tutorUsername}</p>
							{selectedClass.description && (
								<p>Description: {selectedClass.description}</p>
							)}
							{selectedClass.startDate && (
								<p>
									Start Date:{' '}
									{new Date(selectedClass.startDate).toLocaleDateString()}
								</p>
							)}
							{selectedClass.endDate && (
								<p>
									End Date:{' '}
									{new Date(selectedClass.endDate).toLocaleDateString()}
								</p>
							)}
						</div>
					)}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
					{/* Class Selection */}
					<FormField
						control={form.control}
						name='classId'
						render={({ field }) => (
							<FormItem>
<<<<<<< HEAD
								<FormLabel className="text-gray-700 font-medium">Select Class</FormLabel>
								<FormControl>
									<Select
										value={field.value}
										onValueChange={(value) => onClassChange(value)}
									>
										<SelectTrigger className="w-full border border-gray-200 rounded-md h-11">
											<SelectValue placeholder="Select a class" />
										</SelectTrigger>
										<SelectContent>
											{classes.length > 0 ? (
												classes.map((classItem: any) => (
													<SelectItem
														key={classItem.id}
														value={classItem.id}
													>
														{classItem.className}
													</SelectItem>
												))
											) : (
												<SelectItem value="" disabled>
													No classes available
												</SelectItem>
											)}
										</SelectContent>
									</Select>
=======
								<FormLabel>
									Select Class<p className='text-red-500'>*</p>
								</FormLabel>
								<FormControl>
									<select
										className='border p-4 rounded-md w-full'
										value={field.value}
										onChange={(e) => onClassChange(e.target.value)}
									>
										<option value=''>Select a class</option>
										{classes.map((classItem: any) => (
											<option
												key={classItem.id}
												value={classItem.id}
											>
												{classItem.className}
											</option>
										))}
									</select>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

<<<<<<< HEAD
					{/* Show current class details if a class is selected */}
					{selectedClass && (
						<div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
							<h3 className="font-semibold mb-3 text-purple-800">Current Class Details</h3>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-gray-600 text-sm">Class Name:</span>
									<span className="font-medium">{selectedClass.className}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600 text-sm">Current Student:</span>
									<span className="font-medium">{selectedClass.studentUsername}</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600 text-sm">Current Tutor:</span>
									<span className="font-medium">{selectedClass.tutorUsername}</span>
								</div>
								{selectedClass.description && (
									<div className="flex items-center justify-between">
										<span className="text-gray-600 text-sm">Description:</span>
										<span className="font-medium">{selectedClass.description}</span>
									</div>
								)}
								<div className="grid grid-cols-2 gap-4 mt-2 pt-2 border-t border-purple-100">
									{selectedClass.startDate && (
										<div className="flex flex-col">
											<span className="text-gray-600 text-xs">Start Date:</span>
											<span className="font-medium">{new Date(selectedClass.startDate).toLocaleDateString()}</span>
										</div>
									)}
									{selectedClass.endDate && (
										<div className="flex flex-col">
											<span className="text-gray-600 text-xs">End Date:</span>
											<span className="font-medium">{new Date(selectedClass.endDate).toLocaleDateString()}</span>
										</div>
									)}
								</div>
							</div>
						</div>
					)}

=======
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
					{/* New Student Selection */}
					<FormField
						control={form.control}
						name='newStudentId'
						render={({ field }) => (
							<FormItem>
<<<<<<< HEAD
								<FormLabel className="text-gray-700 font-medium">New Student (Optional)</FormLabel>
								<FormControl>
									<Select
										value={field.value || "none"}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full border border-gray-200 rounded-md h-11">
											<SelectValue placeholder="Select new student" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="none">None (Keep current)</SelectItem>
											{studentsAndTutors.students.length > 0 ? (
												studentsAndTutors.students.map((student: any) => (
													<SelectItem
														key={student.studentId}
														value={student.studentId}
													>
														{student.username}
													</SelectItem>
												))
											) : (
												<SelectItem value="no_students" disabled>
													No students available
												</SelectItem>
											)}
										</SelectContent>
									</Select>
=======
								<FormLabel>
									New Student<p className='text-red-500'>*</p>
								</FormLabel>
								<FormControl>
									<select
										className='border p-4 rounded-md w-full'
										value={field.value ?? ''}
										onChange={(e) => field.onChange(e.target.value)}
									>
										<option value=''>Select new student</option>
										{studentsAndTutors.students.map((student: any) => (
											<option
												key={student.studentId}
												value={student.studentId}
											>
												{student.username}
											</option>
										))}
									</select>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* New Tutor Selection */}
					<FormField
						control={form.control}
						name='newTutorId'
						render={({ field }) => (
							<FormItem>
<<<<<<< HEAD
								<FormLabel className="text-gray-700 font-medium">New Tutor (Optional)</FormLabel>
								<FormControl>
									<Select
										value={field.value || "none"}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full border border-gray-200 rounded-md h-11">
											<SelectValue placeholder="Select new tutor" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="none">None (Keep current)</SelectItem>
											{studentsAndTutors.tutors.length > 0 ? (
												studentsAndTutors.tutors.map((tutor: any) => (
													<SelectItem
														key={tutor.tutorId}
														value={tutor.tutorId}
													>
														{tutor.username}
													</SelectItem>
												))
											) : (
												<SelectItem value="no_tutors" disabled>
													No tutors available
												</SelectItem>
											)}
										</SelectContent>
									</Select>
=======
								<FormLabel>
									New Tutor<p className='text-red-500'>*</p>
								</FormLabel>
								<FormControl>
									<select
										className='border p-4 rounded-md w-full'
										value={field.value ?? ''}
										onChange={(e) => field.onChange(e.target.value)}
									>
										<option value=''>Select new tutor</option>
										{studentsAndTutors.tutors.map((tutor: any) => (
											<option
												key={tutor.tutorId}
												value={tutor.tutorId}
											>
												{tutor.username}
											</option>
										))}
									</select>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

<<<<<<< HEAD
				{error && (
					<div className="text-red-500 bg-red-50 p-3 rounded-md border border-red-200 text-sm">
						{error}
					</div>
				)}

				<div className='self-end'>
					<Button
						className='bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-md hover:shadow-lg'
						disabled={isSubmitting || !form.formState.isValid || !selectedClass}
					>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Reallocating...
							</>
						) : 'Reallocate Class'}
=======
				{error && <div className='text-red-500'>{error}</div>}

				<div className='self-end'>
					<Button
						className='bg-gradient-to-r from-purple-500 to-blue-700 cursor-pointer'
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? 'Reallocating...' : 'Reallocate'}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
					</Button>
				</div>
			</form>
		</Form>
	)
}

<<<<<<< HEAD
export default ReallocateForm 
=======
export default ReallocateForm
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
