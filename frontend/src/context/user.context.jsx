import { useState } from 'react'
import { UserContext } from './user-context.js'

const TOKEN_KEY = 'authToken'
const USER_KEY = 'authUser'

function readStoredUser() {
	try {
		return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
	} catch {
		localStorage.removeItem(USER_KEY)
		return null
	}
}

export function UserProvider({ children }) {
	const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
	const [user, setUser] = useState(readStoredUser)

	function login({ token: nextToken, user: nextUser = null }) {
		localStorage.setItem(TOKEN_KEY, nextToken)
		if (nextUser) {
			localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
		} else {
			localStorage.removeItem(USER_KEY)
		}
		setToken(nextToken)
		setUser(nextUser)
	}

	function logout() {
		localStorage.removeItem(TOKEN_KEY)
		localStorage.removeItem(USER_KEY)
		setToken(null)
		setUser(null)
	}

	return (
		<UserContext.Provider value={{ token, user, isAuthenticated: Boolean(token), login, logout }}>
			{children}
		</UserContext.Provider>
	)
}
