import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

interface User {
  name: string
  email: string
  token: string
  role: string
}

interface AuthContextType {
  user: User | null
  role: string | undefined
  login: (data: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // LOAD USER ON START
  useEffect(() => {
    const stored = localStorage.getItem('user')

    if (stored) {
      const parsedUser: User = JSON.parse(stored)
      setUser(parsedUser)

      // IMPORTANT: restore token on refresh
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${parsedUser.token}`
    }

    setLoading(false)
  }, [])

  // LOGIN
  const login = (data: User) => {
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))

    axios.defaults.headers.common['Authorization'] =
      `Bearer ${data.token}`
  }

  // LOGOUT
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')

    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, role: user?.role, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const user =
  JSON.parse(
    localStorage.getItem('user') || '{}'
  )

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        login: () => {},
        logout: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}