import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import useBranding from '../hooks/useBranding'


export default function AdminLayout() {
  const { user } = useAuth()
  const branding = useBranding()
  const themeColor =
    branding?.primaryColor || '#0f172a'
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (user.role !== 'super-admin') {
    return <Navigate to="/login" replace />
  }
  
  return (
    <div style={{ borderColor: themeColor }} className="flex min-h-screen bg-[#020617] text-white">
      <header style={{ background: themeColor }}>
        <h1 className="text-white">
          {branding?.companyName || 'ERP System'}
        </h1>
      </header>
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  )
}