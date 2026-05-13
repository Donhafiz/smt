import axios from 'axios'

const API = '/api/products'

export const getProducts = () => axios.get(API)
export const createProduct = (data: any) => axios.post(API, data)
export const updateProduct = (id: string, data: any) =>
  axios.put(`${API}/${id}`, data)

export const deleteProduct = (id: string) =>
  axios.delete(`${API}/${id}`)