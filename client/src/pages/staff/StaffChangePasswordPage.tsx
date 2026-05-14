import { useState } from 'react'
import api from '../../lib/axios'
import { Key, Lock, Save } from 'lucide-react'

export default function StaffChangePasswordPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('staffToken')
      await api.put('/staff-portal/change-password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      }, { headers: { Authorization: `Bearer ${token}` } })
      setMessage('Password changed successfully!')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Change Password
      </h1>

      {message && <div className="p-3 bg-green-500/10 text-green-400 rounded-xl text-sm">{message}</div>}
      {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="glass p-6 rounded-2xl space-y-4">
        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-gray-500" />
          <input type="password" placeholder="Current Password" value={form.currentPassword}
            onChange={e => setForm({ ...form, currentPassword: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" required />
        </div>
        <div className="relative">
          <Key size={18} className="absolute left-3 top-3.5 text-gray-500" />
          <input type="password" placeholder="New Password" value={form.newPassword}
            onChange={e => setForm({ ...form, newPassword: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" required />
        </div>
        <div className="relative">
          <Key size={18} className="absolute left-3 top-3.5 text-gray-500" />
          <input type="password" placeholder="Confirm New Password" value={form.confirmPassword}
            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" required />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2">
          {loading ? 'Changing...' : <><Save size={18} /> Change Password</>}
        </button>
      </form>
    </div>
  )
}