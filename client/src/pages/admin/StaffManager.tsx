import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { Users, Plus, Edit2, Trash2, X, Save, AlertTriangle } from 'lucide-react'

interface Staff {
  _id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  description: string
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

  const fetchStaff = async () => {
    try {
      const res = await api.get('/staff')
      setStaff(res.data)
    } catch (err: any) {
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
      console.log('Submitting:', form)
      
      if (editItem) {
        const res = await api.put(`/staff/${editItem._id}`, form)
        console.log('Update response:', res.data)
      } else {
        const res = await api.post('/staff', form)
        console.log('Create response:', res.data)
      }

      setShowForm(false)
      setEditItem(null)
      setForm(emptyForm)
      fetchStaff()
    } catch (err: any) {
      console.error('Submit error:', err)
      const message = err?.response?.data?.message || err?.message || 'Failed to save staff member'
      setError(message)
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
      description: member.description || ''
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

  const departments = ['Software Development', 'IT Training', 'Consultancy', 'Commerce Market', 'Marketing', 'Admin', 'Security']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
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

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editItem ? 'Edit Staff' : 'Add Staff Member'}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/10 transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm flex items-center gap-2">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Phone</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {editItem ? 'Update Staff' : 'Add Staff'}
                    </>
                  )}
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
              <p className="text-cyan-400 text-sm">{member.role}</p>
              <p className="text-gray-500 text-xs mt-1">{member.department}</p>

              <div className="flex justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(member)} className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all">
                  <Edit2 size={14} />
                </button>
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