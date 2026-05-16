import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://smt-backend-amad.onrender.com/api'
})

api.interceptors.request.use((config) => {
  const staffToken = localStorage.getItem('staffToken')
  const token = localStorage.getItem('token')
  const authToken = staffToken || token
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

export default api