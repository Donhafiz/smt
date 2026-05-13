import axios from 'axios'

export const getServices = () => axios.get('/api/services')
export const createService = (data: any) => axios.post('/api/services', data)
export const updateService = (id: string, data: any) =>
  axios.put(`/api/services/${id}`, data)

export const deleteService = (id: string) =>
  axios.delete(`/api/services/${id}`)