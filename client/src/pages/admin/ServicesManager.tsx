import { useEffect, useState } from 'react'
import axios from 'axios'

interface Service {
  _id?: string
  title: string
  category: 'Software' | 'Training' | 'Consulting' | 'Commerce'
  description: string
  price?: string
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])

  const [form, setForm] = useState<Service>({
    title: '',
    category: 'Software',
    description: '',
    price: ''
  })

  const [editId, setEditId] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const res = await axios.get('/api/services')
    setServices(res.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editId) {
      await axios.put(`/api/services/${editId}`, form)
    } else {
      await axios.post('/api/services', form)
    }

    setForm({
      title: '',
      category: 'Software',
      description: '',
      price: ''
    })

    setEditId(null)
    fetchServices()
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/services/${id}`)
    fetchServices()
  }

  const handleEdit = (s: Service) => {
    setForm(s)
    setEditId(s._id || null)
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Services Management</h1>
        <p className="text-gray-400">Manage SMT service offerings</p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f172a] p-4 rounded-xl space-y-3"
      >

        <input
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          placeholder="Service Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value as Service['category'] })
          }
        >
          <option value="Software">Software Development</option>
          <option value="Training">IT Training</option>
          <option value="Consulting">IT Consulting</option>
          <option value="Commerce">Commerce / Sales</option>
        </select>

        <textarea
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          placeholder="Price (optional)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button className="bg-blue-600 px-4 py-2 rounded">
          {editId ? 'Update Service' : 'Add Service'}
        </button>
      </form>

      {/* LIST */}
      <div className="grid gap-3">

        {services.map((s) => (
          <div
            key={s._id}
            className="bg-[#0f172a] p-4 rounded-xl flex justify-between"
          >

            <div>
              <h2 className="font-bold">{s.title}</h2>
              <p className="text-sm text-blue-400">{s.category}</p>
              <p className="text-sm text-gray-400">{s.description}</p>
              {s.price && (
                <p className="text-xs text-green-400">GH₵ {s.price}</p>
              )}
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-600 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(s._id!)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}