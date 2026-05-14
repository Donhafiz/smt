import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { User, Clock, Calendar, CheckCircle, Camera } from 'lucide-react'

export default function StaffDashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('staffToken')
    api.get('/staff-portal/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleAttendance = async () => {
    const token = localStorage.getItem('staffToken')
    try {
      await api.post('/staff-portal/attendance', {}, { headers: { Authorization: `Bearer ${token}` } })
      alert('Attendance marked!')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed')
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Staff Dashboard
        </h1>
        <button onClick={handleAttendance} className="px-5 py-2.5 bg-green-500 hover:bg-green-600 rounded-xl font-semibold flex items-center gap-2">
          <CheckCircle size={18} /> Mark Attendance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="glass p-6 rounded-2xl text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto text-3xl font-bold">
            {profile?.photo ? <img src={profile.photo} className="w-full h-full rounded-full object-cover" /> : profile?.firstName?.charAt(0)}
          </div>
          <h2 className="text-xl font-bold mt-4">{profile?.firstName} {profile?.lastName}</h2>
          <p className="text-cyan-400">{profile?.staffId}</p>
          <p className="text-gray-400 text-sm">{profile?.role}</p>
        </div>

        {/* Quick Stats */}
        <div className="glass p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3"><Calendar size={20} className="text-cyan-400" /><span>Joining: {new Date(profile?.joiningDate).toLocaleDateString()}</span></div>
          <div className="flex items-center gap-3"><Clock size={20} className="text-cyan-400" /><span>Department: {profile?.department}</span></div>
          <div className="flex items-center gap-3"><User size={20} className="text-cyan-400" /><span>Status: {profile?.isActive ? 'Active' : 'Inactive'}</span></div>
        </div>

        {/* ID Card Preview */}
        <div className="glass p-6 rounded-2xl text-center">
          <h3 className="font-bold mb-3">Staff ID Card</h3>
          {profile?.idCardGenerated ? (
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-xl">
              <p className="text-white font-bold">{profile?.staffId}</p>
              <p className="text-white/80 text-sm">{profile?.firstName} {profile?.lastName}</p>
              <button className="mt-3 px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold">Print ID Card</button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">ID Card not generated yet. Contact admin.</p>
          )}
        </div>
      </div>
    </div>
  )
}