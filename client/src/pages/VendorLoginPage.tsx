import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function VendorLoginPage() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      const res = await axios.post(
        '/api/vendors/login',
        form
      )

      localStorage.setItem(
        'vendor',
        JSON.stringify(res.data)
      )

      navigate('/vendor/dashboard')

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-5">

      <form
        onSubmit={handleSubmit}
        className="bg-[#0f172a] w-full max-w-md p-8 rounded-2xl border border-gray-800 space-y-4"
      >

        <h1 className="text-3xl font-bold text-white">
          Vendor Login
        </h1>

        <input
          type="email"
          placeholder="Email"
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
          type="password"
          placeholder="Password"
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
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-semibold"
        >
          Login
        </button>

      </form>

    </div>
  )
}