import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

export default function StaffAdmin() {
  const { t } = useTranslation()
  const [staff, setStaff] = useState<any[]>([])
  const [form, setForm] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    phone: ''
  })

  const [editId, setEditId] = useState<string | null>(null)

  const load = async () => {
    const res = await axios.get('/api/staff')
    setStaff(res.data)
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async () => {
    if (editId) {
      await axios.put(`/api/staff/${editId}`, form)
    } else {
      await axios.post('/api/staff', form)
    }

    setForm({ name: '', role: '', department: '', email: '', phone: '' })
    setEditId(null)
    load()
  }

  const del = async (id: string) => {
    await axios.delete(`/api/staff/${id}`)
    load()
  }

  return (
    <div className="text-white space-y-4">

      <h1 className="text-2xl font-bold">Staff Management</h1>

      {/* FORM */}
      <div className="bg-[#0f172a] p-4 rounded-xl space-y-2">

        <input placeholder="Name" className="w-full p-2 bg-gray-900"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input placeholder="Role"
          className="w-full p-2 bg-gray-900"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        />

        <input placeholder="Department"
          className="w-full p-2 bg-gray-900"
          value={form.department}
          onChange={e => setForm({ ...form, department: e.target.value })}
        />

        <input placeholder="Email"
          className="w-full p-2 bg-gray-900"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input placeholder="Phone"
          className="w-full p-2 bg-gray-900"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <button onClick={submit} className="bg-blue-600 px-4 py-2 rounded">
          {editId ? 'Update' : 'Create'}
        </button>

      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">

        {staff.map(s => (
          <div key={s._id} className="bg-[#0f172a] p-4 rounded-xl">

            <h2 className="font-bold">{s.name}</h2>
            <p className="text-sm text-gray-400">{s.role}</p>
            <p className="text-sm text-gray-400">{s.department}</p>

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => {
                  setForm(s)
                  setEditId(s._id)
                }}
                className="bg-yellow-500 px-3 py-1"
              >
                Edit
              </button>

              <button
                onClick={() => del(s._id)}
                className="bg-red-600 px-3 py-1"
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

