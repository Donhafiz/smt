import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  // Optional: Check if user is valid JSON
  try {
    const parsedUser = JSON.parse(user)
    if (!parsedUser) {
      return <Navigate to="/login" replace />
    }
  } catch {
    return <Navigate to="/login" replace />
  }

  return children
}