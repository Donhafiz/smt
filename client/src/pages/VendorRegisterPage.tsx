import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function VendorRegisterPage() {

  const navigate = useNavigate()

  const [form, setForm] = useState({

    businessName: '',
    ownerName: '',
    email: '',
    password: ''

  })

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      await axios.post(
        '/api/vendors/register',
        form
      )

      navigate('/vendor/login')

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-5">

      <form
        onSubmit={handleSubmit}
        className="bg-[#0f172a] w-full max-w-lg p-8 rounded-2xl border border-gray-800 space-y-4"
      >

        <h1 className="text-3xl font-bold text-white">
          Vendor Registration
        </h1>

        <input
          placeholder="Business Name"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={form.businessName}
          onChange={e =>
            setForm({
              ...form,
              businessName:
                e.target.value
            })
          }
        />

        <input
          placeholder="Owner Name"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={form.ownerName}
          onChange={e =>
            setForm({
              ...form,
              ownerName:
                e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={form.email}
          onChange={e =>
            setForm({
              ...form,
              email:
                e.target.value
            })
          }
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          value={form.password}
          onChange={e =>
            setForm({
              ...form,
              password:
                e.target.value
            })
          }
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold"
        >
          Create Vendor Account
        </button>

      </form>

    </div>
  )
}