import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

api.interceptors.request.use((config) => {
  // Check for staff token first, then regular token
  const staffToken = localStorage.getItem('staffToken')
  const token = localStorage.getItem('token')
  const tenantId = localStorage.getItem('tenantId')

  const authToken = staffToken || token

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  if (tenantId) {
    config.headers['x-tenant-id'] = tenantId
  }

  return config
})

export default api