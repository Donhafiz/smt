import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { Users, Plus, Edit2, Trash2, X, Save, AlertTriangle, Copy, Eye, EyeOff, Key } from 'lucide-react'

interface Staff {
  _id: string
  name: string
  staffId: string
  role: string
  department: string
  email: string
  phone: string
  canLogin: boolean
  idCardGenerated: boolean
}

const emptyForm = {
  name: '',
  role: '',
  department: 'Software Development',
  email: '',
  phone: '',
  description: ''
}

export default function StaffManager() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Staff | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  // Credentials popup
  const [showCredentials, setShowCredentials] = useState(false)
  const [credentials, setCredentials] = useState<any>(null)
  const [showTempPassword, setShowTempPassword] = useState(false)

  const fetchStaff = async () => {
    try {
      const res = await api.get('/staff')
      setStaff(res.data)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStaff() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    
    try {
      if (editItem) {
        await api.put(`/staff/${editItem._id}`, form)
        setShowForm(false)
        setEditItem(null)
        setForm(emptyForm)
        fetchStaff()
      } else {
        const res = await api.post('/staff', form)
        console.log('Staff created:', res.data)
        
        // Show credentials popup
        if (res.data.credentials) {
          setCredentials(res.data.credentials)
          setShowCredentials(true)
          setShowTempPassword(true)
        }
        
        setShowForm(false)
        setForm(emptyForm)
        fetchStaff()
      }
    } catch (err: any) {
      console.error('Save error:', err)
      setError(err?.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (member: Staff) => {
    setEditItem(member)
    setForm({
      name: member.name || '',
      role: member.role || '',
      department: member.department || 'Software Development',
      email: member.email || '',
      phone: member.phone || '',
      description: ''
    })
    setShowForm(true)
    setError('')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this staff member?')) return
    try {
      await api.delete(`/staff/${id}`)
      fetchStaff()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Delete failed')
    }
  }

  const handleGrantAccess = async (id: string) => {
    try {
      await api.put(`/staff/${id}/grant-access`)
      fetchStaff()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed')
    }
  }

  const handleCopyCredentials = () => {
    if (!credentials) return
    const text = `Staff ID: ${credentials.staffId}\nEmail: ${credentials.email}\nPassword: ${credentials.temporaryPassword}`
    navigator.clipboard.writeText(text)
    alert('Credentials copied to clipboard!')
  }

  const departments = ['Admin', 'Software Development', 'IT Training', 'Consultancy', 'Commerce Market', 'Marketing', 'Security']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Staff Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">{staff.length} team members</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditItem(null); setForm(emptyForm); setError('') }}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-sm font-semibold hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add Staff
        </button>
      </div>

      {/* Credentials Modal */}
      {showCredentials && credentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1a1f3a] border border-cyan-500/30 rounded-2xl p-6 w-full max-w-md text-center shadow-2xl shadow-cyan-500/20">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <Key size={28} className="text-white" />
            </div>
            
            <h2 className="text-xl font-bold mb-2">🎉 Staff Created!</h2>
            <p className="text-gray-400 text-sm mb-6">Share these credentials with the staff member</p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-black/30 rounded-xl p-3 text-left">
                <p className="text-xs text-gray-500 mb-1">Staff ID</p>
                <p className="text-lg font-bold text-cyan-400">{credentials.staffId}</p>
              </div>
              
              {credentials.email && (
                <div className="bg-black/30 rounded-xl p-3 text-left">
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-white">{credentials.email}</p>
                </div>
              )}
              
              <div className="bg-black/30 rounded-xl p-3 text-left">
                <p className="text-xs text-gray-500 mb-1">Temporary Password</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-yellow-400">
                    {showTempPassword ? credentials.temporaryPassword : '••••••••'}
                  </p>
                  <button
                    onClick={() => setShowTempPassword(!showTempPassword)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400"
                  >
                    {showTempPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyCredentials}
                className="flex-1 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 font-medium hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Copy size={16} /> Copy All
              </button>
              <button
                onClick={() => { setShowCredentials(false); setCredentials(null) }}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:scale-[1.02] transition-all"
              >
                Done
              </button>
            </div>
            
            <p className="text-xs text-red-400 mt-4">
              ⚠️ Save these credentials now — they won't be shown again!
            </p>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editItem ? 'Edit Staff' : 'Add Staff Member'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/10 transition-all">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm flex items-center gap-2">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Full Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Role *</label>
                  <input
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Senior Developer"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Department</label>
                <select
                  value={form.department}
                  onChange={e => setForm({ ...form, department: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                >
                  {departments.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Phone</label>
                <input
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {editItem ? 'Update Staff' : 'Add Staff'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff Grid */}
      {staff.length === 0 ? (
        <div className="text-center py-20">
          <Users size={64} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-500 text-lg mb-4">No staff members yet</p>
          <button
            onClick={() => { setShowForm(true); setEditItem(null); setForm(emptyForm); setError('') }}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition-all"
          >
            Add Your First Staff Member
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {staff.map(member => (
            <div key={member._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/30 transition-all text-center group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                {member.name?.charAt(0) || '?'}
              </div>
              <h3 className="font-bold">{member.name}</h3>
              <p className="text-cyan-400 text-xs">{member.staffId}</p>
              <p className="text-gray-400 text-sm">{member.role}</p>
              <p className="text-gray-500 text-xs mt-1">{member.department}</p>
              
              <div className="flex items-center justify-center gap-2 mt-2">
                {member.canLogin ? (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Can Login</span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">No Access</span>
                )}
              </div>

              <div className="flex justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(member)} className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all">
                  <Edit2 size={14} />
                </button>
                {!member.canLogin && (
                  <button onClick={() => handleGrantAccess(member._id)} className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all" title="Grant Login Access">
                    <Key size={14} />
                  </button>
                )}
                <button onClick={() => handleDelete(member._id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}