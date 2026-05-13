import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Eye, EyeOff, Mail, Lock, AlertCircle, LogIn } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  // Optionally show success message if redirected from registration
  const locationState = window.history.state?.usr?.registered
  const [successMessage, setSuccessMessage] = useState(locationState || '')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setValidationErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email'
    }
    if (!form.password) errors.password = 'Password is required'
    return errors
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const errors = validate()
    setValidationErrors(errors)
    if (Object.keys(errors).length > 0) return

    try {
      setLoading(true)
      setError('')
      const res = await axios.post('/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const inputContainer = 'relative group mb-4'
  const inputBase =
    'w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent transition-all duration-300 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 hover:border-white/20'
  const labelBase =
    'absolute left-10 top-3.5 text-gray-400 text-sm transition-all duration-300 pointer-events-none'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        {/* Success message after registration */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-300 text-sm flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Registration successful! Please log in.
          </div>
        )}

        {/* General error */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Email */}
        <div className={inputContainer}>
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors z-10" />
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
            placeholder="Email"
            autoComplete="email"
          />
          <label
            className={`${labelBase} ${
              form.email ? 'opacity-0' : 'opacity-100'
            } group-focus-within:-top-3 group-focus-within:left-3 group-focus-within:text-xs group-focus-within:text-blue-400 group-focus-within:bg-slate-900 group-focus-within:px-1`}
          >
            Email
          </label>
          {validationErrors.email && (
            <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {validationErrors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className={inputContainer}>
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors z-10" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            className={inputBase}
            placeholder="Password"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-400 transition-colors z-10"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <label
            className={`${labelBase} ${
              form.password ? 'opacity-0' : 'opacity-100'
            } group-focus-within:-top-3 group-focus-within:left-3 group-focus-within:text-xs group-focus-within:text-blue-400 group-focus-within:bg-slate-900 group-focus-within:px-1`}
          >
            Password
          </label>
          {validationErrors.password && (
            <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {validationErrors.password}
            </p>
          )}
        </div>

        {/* Forgot password (optional) */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="text-xs text-gray-400 hover:text-blue-400 transition-colors underline underline-offset-2"
            onClick={() => alert('Password reset coming soon!')}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline underline-offset-2"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}