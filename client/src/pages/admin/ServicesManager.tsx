import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { Wrench, Plus, Edit2, Trash2, X, Save, AlertTriangle } from 'lucide-react'

interface Service {
  _id: string
  title: string
  description: string
  category: string
  icon: string
}

const emptyForm = {
  title: '',
  description: '',
  category: 'Software Development',
  icon: 'Monitor'
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Service | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchServices = async () => {
    try {
      const res = await api.get('/services')
      setServices(res.data)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchServices() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    
    try {
      console.log('Submitting service:', form)
      
      if (editItem) {
        await api.put(`/services/${editItem._id}`, form)
      } else {
        await api.post('/services', form)
      }
      
      setShowForm(false)
      setEditItem(null)
      setForm(emptyForm)
      fetchServices()
      
    } catch (err: any) {
      console.error('Save error:', err)
      setError(err?.response?.data?.message || 'Failed to save service')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditItem(service)
    setForm({
      title: service.title || '',
      description: service.description || '',
      category: service.category || 'Software Development',
      icon: service.icon || 'Monitor'
    })
    setShowForm(true)
    setError('')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    try {
      await api.delete(`/services/${id}`)
      fetchServices()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Delete failed')
    }
  }

  const categories = ['Software Development', 'IT Training', 'Consultancy', 'Commerce Market', 'AI Solutions']

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
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Services Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">{services.length} services available</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditItem(null); setForm(emptyForm); setError('') }}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-sm font-semibold hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editItem ? 'Edit Service' : 'Add Service'}</h2>
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
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Service Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. Web Development"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Description *</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 resize-none"
                  placeholder="Describe this service..."
                  required
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
                      {editItem ? 'Update Service' : 'Add Service'}
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

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center py-20">
          <Wrench size={64} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-500 text-lg mb-4">No services added yet</p>
          <button
            onClick={() => { setShowForm(true); setEditItem(null); setForm(emptyForm); setError('') }}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition-all"
          >
            Add Your First Service
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map(service => (
            <div key={service._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/30 transition-all flex items-start justify-between gap-4 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Wrench size={22} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <span className="text-xs text-cyan-400">{service.category}</span>
                  <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(service)} className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => handleDelete(service._id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all">
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