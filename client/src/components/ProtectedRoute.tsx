import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: any) {
  // Check for any valid token (user, staff, or vendor)
  const token = localStorage.getItem('token') || 
                localStorage.getItem('staffToken') || 
                localStorage.getItem('vendorToken')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}