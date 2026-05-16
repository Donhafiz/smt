import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {   getServices,
  createService,
  updateService,
  deleteService
} from '../../services/serviceService'

interface Service {
  _id: string
  title: string
  description: string
  price: number
  category: string
}

export default function ServicesAdmin() {
  const { t } = useTranslation()
  const [services, setServices] = useState<Service[]>([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    category: ''
  })
  const [editId, setEditId] = useState<string | null>(null)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    const res = await getServices()
    setServices(res.data)
  }

  const handleSubmit = async () => {
    if (editId) {
      await updateService(editId, form)
    } else {
      await createService(form)
    }

    setForm({ title: '', description: '', price: 0, category: '' })
    setEditId(null)
    loadServices()
  }

  const handleEdit = (s: Service) => {
    setForm(s)
    setEditId(s._id)
  }

  const handleDelete = async (id: string) => {
    await deleteService(id)
    loadServices()
  }

  return (
    <div className="space-y-6 text-white">

      <h1 className="text-2xl font-bold">Services Management</h1>

      {/* FORM */}
      <div className="bg-[#0f172a] p-4 rounded-xl space-y-3">

        <input
          className="w-full p-2 bg-gray-900 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="w-full p-2 bg-gray-900 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          className="w-full p-2 bg-gray-900 rounded"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />

        <input
          className="w-full p-2 bg-gray-900 rounded"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          {editId ? 'Update Service' : 'Create Service'}
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {services.map((s) => (
          <div
            key={s._id}
            className="bg-[#0f172a] p-4 rounded-xl border border-gray-800"
          >

            <h3 className="font-bold">{s.title}</h3>
            <p className="text-sm text-gray-400">{s.description}</p>

            <div className="text-sm mt-2">
              <span className="text-green-400">
                GHS {s.price}
              </span>
              {' • '}
              {s.category}
            </div>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(s._id)}
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


