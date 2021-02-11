import { useContext, useState, useEffect, createContext } from 'react'
import API from '../utils/API'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(newUser) {

        let result = await API.addUser(newUser)
        debugger
        setCurrentUser(newUser)
        return result
    }
    
    function login(screen_name) { }
    
    function logout(screen_name) { }
    

    useEffect(() => {

    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}