import { getCurrentUser } from '@/actions/getData'
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react'

// Define the shape of your global state
interface GlobalState {
	authToken: string
	setAuthToken: any
	currentUser: any
	setCurrentUser: any
<<<<<<< HEAD
=======
	isLoading: boolean
	setIsLoading: any
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
}

// Create a context with a default value
const GlobalStateContext = createContext<GlobalState | undefined>(undefined)

// Create a provider component
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
	const [authToken, setAuthToken] = useState<string>(
		localStorage.getItem('auth_token') ?? '',
	)
	const [currentUser, setCurrentUser] = useState<any>(null)
<<<<<<< HEAD

	const getUser = async () => {
		const user = await getCurrentUser(authToken)
		setCurrentUser(user)
	}

	useEffect(() => {
		// localStorage.setItem('auth_token', '')
		// setAuthToken('')
		if (authToken) {
			getUser()
		}
	}, [authToken])
=======
	const [isLoading, setIsLoading] = useState(true)

	const getUser = async () => {
		try {
			if (authToken && !currentUser) {
				setIsLoading(true)
				const user = await getCurrentUser(authToken)
				setCurrentUser(user)
			}
		} catch (error) {
			console.error('Error fetching user:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (authToken && !currentUser) {
			getUser()
		}
	}, [authToken, currentUser])
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5

	return (
		<GlobalStateContext.Provider
			value={{
				authToken,
				setAuthToken,
				currentUser,
				setCurrentUser,
<<<<<<< HEAD
=======
				isLoading,
				setIsLoading,
>>>>>>> 57756ee52d1b0a1a0410c6bead949a5fb6a450e5
			}}
		>
			{children}
		</GlobalStateContext.Provider>
	)
}

// Create a custom hook to access the global state
export const useGlobalState = () => {
	const context = useContext(GlobalStateContext)
	if (!context) {
		throw new Error('useGlobalState must be used within a GlobalStateProvider')
	}
	return context
}
