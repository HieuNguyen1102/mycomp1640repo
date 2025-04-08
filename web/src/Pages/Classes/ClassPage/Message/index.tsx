import { getClassById, getConversation, getMessages } from '@/actions/getData'
import { getSocket, initializeSocket } from '@/lib/socket'
import { convertToLocalTimezone } from '@/lib/utils'
import { useGlobalState } from '@/misc/GlobalStateContext'
<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FaPaperPlane } from 'react-icons/fa'
=======
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FaPaperPlane } from 'react-icons/fa6'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

const MessagePage = ({ found_class }: { found_class: any }) => {
	const params = useParams()
	const navigate = useNavigate()
	const { authToken, currentUser } = useGlobalState()
	const [currentClass, setCurrentClass] = useState(null)

	const [messages, setMessages] = useState<
		{
			messageId: string
			conversationId: string
			senderId: string
			messageContent: string
			sendDate: string
		}[]
	>([])
	const [conversation, setConversation] = useState(null)
	const [socket, setSocket] = useState<any>(null)

<<<<<<< HEAD
=======
	const [page, setPage] = useState(0)
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	useEffect(() => {
		if (currentUser) {
			initializeSocket(currentUser.username)
			setSocket(getSocket())
		}
	}, [currentUser])

	const getData = async () => {
		if (!params.id) navigate('/')

		if (!found_class) {
			navigate('/')
		} else {
			setCurrentClass(found_class)
		}
<<<<<<< HEAD
		
=======

>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		const found_conversation = await getConversation({
			token: authToken,
			classId: params.id ?? '',
			conversationId: conversation ? (conversation as any).id : '',
		})
		if (found_conversation) {
			setConversation(found_conversation)

			const found_messages = await getMessages({
				token: authToken,
				conversationId: found_conversation.id,
<<<<<<< HEAD
			})

			if (found_messages) setMessages(found_messages)
=======
				offset: 0,
			})

			if (found_messages)
				// setMessages((prevMessages) => [...prevMessages, ...found_messages])
				setMessages(found_messages)
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
		} else {
			navigate('/')
		}
	}

	useEffect(() => {
		if (socket) {
			if (conversation) socket.emit('joinRoom', (conversation as any).id)
			socket.on('receiveMessage', (messageData: any) => {
<<<<<<< HEAD
				setMessages((prevMessages) => [...prevMessages, messageData])
=======
				setMessages((prevMessages) => [messageData, ...prevMessages])
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			})

			return () => {
				socket.off('receiveMessage')
			}
		}
	}, [socket, conversation])

	useEffect(() => {
<<<<<<< HEAD
		if (currentUser) {
			getData()
		}
	}, [currentUser])

	const [message, setMessage] = useState('')

=======
		if (currentUser) getData()
	}, [])

	const [message, setMessage] = useState('')

	const messagesEndRef = useRef(null)
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages]) // Runs when messages update

>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
	const sendMessage = () => {
		if (message && socket && conversation && currentUser) {
			const messageData = {
				messageId: '',
				conversationId: (conversation as any).id,
				messageContent: message,
				senderId: currentUser.id,
				sendDate: new Date().toISOString(),
			}

<<<<<<< HEAD
			setMessages((prevMessages) => [...prevMessages, messageData])
=======
			setMessages((prevMessages) => [messageData, ...prevMessages])
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

			socket.emit('sendMessage', {
				message: messageData,
				room: conversation ? (conversation as any).id : '',
			})
			setMessage('')
		}
	}

	if (socket)
		return (
<<<<<<< HEAD
			<div className='flex h-full bg-white rounded-lg shadow-sm overflow-hidden'>
				{/* Chat Section */}
				<div className='flex-1 flex flex-col'>
					<div className='p-2 md:p-4 flex items-center justify-between border-b border-gray-200'>
=======
			<div className='flex h-screen bg-gray-100'>
				{/* Chat Section */}
				<div className='flex-1 flex flex-col'>
					<div className='p-4 flex items-center justify-between border-b border-gray-200'>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
						<div className='flex items-center'>
							<img
								src='https://storage.googleapis.com/a1aa/image/df0CF7_imT5d76erw6dMhuYdT-uuq7ZtPaisg2K6FYI.jpg'
								alt='Group 11223'
<<<<<<< HEAD
								className='rounded-full w-8 h-8 md:w-10 md:h-10'
							/>
							<span className='ml-2 text-sm md:text-lg font-semibold truncate max-w-[120px] md:max-w-full'>
=======
								className='rounded-full w-10 h-10'
							/>
							<span className='ml-2 text-lg font-semibold'>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
								{currentClass ? (currentClass as any).className : 'N/A'}
							</span>
							<span className='ml-2 text-green-500'>
								<i className='fas fa-circle'></i>
							</span>
						</div>
						<div className='flex space-x-2 text-gray-500'>
<<<<<<< HEAD
=======
							<i className='fas fa-search'></i>
							<i className='fas fa-phone'></i>
							<i className='fas fa-video'></i>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
							<i className='fas fa-ellipsis-v'></i>
						</div>
					</div>

					{/* Chat Messages */}
<<<<<<< HEAD
					<div className='flex-1 p-2 md:p-4 overflow-y-auto'>
						<div className='flex flex-col space-y-3 md:space-y-4'>
							{/* Example message */}

							{messages.length === 0 && (
								<div className='text-center text-gray-500'>No messages yet</div>
							)}

							{messages.length > 0 &&
								messages.map((message, i) => {
									const key = message.messageId || `message-${i}-${message.sendDate}`;
									
									return message.senderId === currentUser.id ? (
										<div
											className='flex justify-end space-x-2'
											key={key}
										>
											<div>
												<div className='bg-blue-500 text-white p-2 rounded-lg max-w-[200px] sm:max-w-[300px] md:max-w-[400px]'>
													<p className='break-words text-sm md:text-base'>
														{message.messageContent}
													</p>
													<span className='text-[10px] md:text-xs text-gray-200'>
														{convertToLocalTimezone(message.sendDate)}
													</span>
												</div>
											</div>
										</div>
									) : (
										<div className='flex items-start space-x-2' key={key}>
											<img
												src='https://storage.googleapis.com/a1aa/image/dh0AmYifcf0VudUDHtqN8bwFEwYDcelC5fhSHMFLOYQ.jpg'
												alt='Patrick Hendricks'
												className='rounded-full w-8 h-8 md:w-10 md:h-10'
											/>
											<div>
												<div className='bg-purple-500 text-white p-2 rounded-lg max-w-[200px] sm:max-w-[300px] md:max-w-[400px]'>
													<p className='break-words text-sm md:text-base'>
														{message.messageContent}
													</p>
													<span className='text-[10px] md:text-xs text-gray-200'>
														{convertToLocalTimezone(message.sendDate)}
													</span>
												</div>
											</div>
										</div>
									);
								})}
=======
					<div className='flex-1 p-4 overflow-y-auto'>
						<div className='flex flex-col space-y-4'>
							{/* Example message */}
							{messages.length === 0 && (
								<div className='text-center text-gray-500'>No messages yet</div>
							)}
							{messages.length > 0 &&
								[...messages].reverse().map(
									(message, i) =>
										(message.senderId === currentUser.id && (
											<div
												className='flex justify-end space-x-2'
												key={i}
											>
												<div>
													<div className='bg-blue-500 text-white p-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg'>
														<p className='break-words'>
															{message.messageContent}
														</p>
														<span className='text-xs text-gray-200'>
															{convertToLocalTimezone(message.sendDate)}
														</span>
													</div>
												</div>
											</div>
										)) ||
										(message.senderId !== currentUser.id && (
											<div className='flex items-start space-x-2'>
												<img
													src='https://storage.googleapis.com/a1aa/image/dh0AmYifcf0VudUDHtqN8bwFEwYDcelC5fhSHMFLOYQ.jpg'
													alt='Patrick Hendricks'
													className='rounded-full w-10 h-10'
												/>
												<div>
													<div className='bg-blue-500 text-white p-2 rounded-lg max-w-xs md:max-w-md lg:max-w-lg'>
														<p className='break-words'>
															{message.messageContent}
														</p>
														<span className='text-xs text-gray-200'>
															{convertToLocalTimezone(message.sendDate)}
														</span>
													</div>
												</div>
											</div>
										)),
								)}
							<div ref={messagesEndRef} /> {/* Invisible div at the bottom */}
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
						</div>
					</div>

					{/* Message Input */}
					<form
						onSubmit={(e) => {
							sendMessage()
							e.preventDefault()
						}}
					>
<<<<<<< HEAD
						<div className='p-2 md:p-4 border-t border-gray-200 flex items-center'>
=======
						<div className='p-4 border-t border-gray-200 flex items-center'>
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
							<input
								type='text'
								value={message}
								placeholder='Enter Message...'
<<<<<<< HEAD
								className='w-full p-1 md:p-2 border border-gray-300 rounded-lg text-sm md:text-base'
=======
								className='w-full p-2 border border-gray-300 rounded-lg'
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
								onChange={(e) => setMessage(e.target.value)}
							/>
							<button
								title='Send message'
<<<<<<< HEAD
								className='ml-2 bg-blue-500 text-white p-1 md:p-2 rounded-lg'
							>
								<FaPaperPlane className="h-4 w-4 md:h-5 md:w-5" />
=======
								className='ml-2 bg-blue-500 text-white p-2 rounded-lg'
							>
								<FaPaperPlane />
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
							</button>
						</div>
					</form>
				</div>
			</div>
		)
}

export default MessagePage
