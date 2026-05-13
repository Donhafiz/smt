import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CompanySignup() {

  const navigate = useNavigate()

  const [form, setForm] = useState({

    companyName: '',
    ownerName: '',
    email: '',
    password: ''

  })

  const [loading, setLoading] =
    useState(false)

  const handleSignup = async () => {

    try {

      setLoading(true)

      const res = await axios.post(
        '/api/onboarding/company-signup',
        form
      )

      localStorage.setItem(
        'token',
        res.data.token
      )

      localStorage.setItem(
        'tenantId',
        res.data.tenantId
      )

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      )

      navigate('/admin')

    } catch (err: any) {

      alert(
        err.response?.data?.message
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-[#0f172a] border border-gray-800 rounded-2xl p-8 space-y-5">

        <div>

          <h1 className="text-3xl font-bold">
            Create Your ERP Workspace
          </h1>

          <p className="text-gray-400 mt-2">
            Launch your business system instantly
          </p>

        </div>

        <input
          placeholder="Company Name"
          className="w-full p-3 bg-black border border-gray-700 rounded-lg"
          value={form.companyName}
          onChange={(e) =>
            setForm({
              ...form,
              companyName: e.target.value
            })
          }
        />

        <input
          placeholder="Owner Name"
          className="w-full p-3 bg-black border border-gray-700 rounded-lg"
          value={form.ownerName}
          onChange={(e) =>
            setForm({
              ...form,
              ownerName: e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          className="w-full p-3 bg-black border border-gray-700 rounded-lg"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-black border border-gray-700 rounded-lg"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
        >

          {
            loading
              ? 'Creating Workspace...'
              : 'Create Company'
          }

        </button>

      </div>

    </div>
  )
}