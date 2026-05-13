import axios from 'axios'

const API = '/api/orders'

export const getOrders = () => axios.get(API)

export const createOrder = (data: any) => axios.post(API, data)

export const updateOrderStatus = (id: string, status: string) =>
  axios.put(`${API}/${id}`, { status })

export const deleteOrder = (id: string) =>
  axios.delete(`${API}/${id}`)