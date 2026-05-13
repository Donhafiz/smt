import { useEffect, useState } from 'react'
import axios from 'axios'

interface Staff {
  _id?: string
  name: string
  role: string
  department: string
  email?: string
  phone?: string
}

export default function StaffManager() {
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [form, setForm] = useState<Staff>({
    name: '',
    role: '',
    department: 'Software Development',
    email: '',
    phone: ''
  })

  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    const res = await axios.get('/api/staff')
    setStaffList(res.data)
  }

  // CREATE or UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      await axios.put(`/api/staff/${editingId}`, form)
    } else {
      await axios.post('/api/staff', form)
    }

    setForm({
      name: '',
      role: '',
      department: 'Software Development',
      email: '',
      phone: ''
    })

    setEditingId(null)
    fetchStaff()
  }

  // DELETE
  const deleteStaff = async (id: string) => {
    await axios.delete(`/api/staff/${id}`)
    fetchStaff()
  }

  // EDIT
  const startEdit = (s: Staff) => {
    setForm(s)
    setEditingId(s._id || null)
  }

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <p className="text-gray-400">Manage SMT staff members</p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f172a] p-4 rounded-xl space-y-3"
      >
        <input
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <input
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 bg-[#020617] border border-gray-700 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button className="bg-blue-600 px-4 py-2 rounded">
          {editingId ? 'Update Staff' : 'Add Staff'}
        </button>
      </form>

      {/* STAFF LIST */}
      <div className="grid gap-3">

        {staffList.map((s) => (
          <div
            key={s._id}
            className="bg-[#0f172a] p-4 rounded-xl flex justify-between items-center"
          >

            <div>
              <h2 className="font-bold">{s.name}</h2>
              <p className="text-sm text-gray-400">
                {s.role} • {s.department}
              </p>
              <p className="text-xs text-gray-500">
                {s.email} | {s.phone}
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => startEdit(s)}
                className="bg-yellow-600 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteStaff(s._id!)}
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