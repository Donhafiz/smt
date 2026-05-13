import axios from 'axios'

export const loginUser = (data: any) =>
  axios.post('/api/auth/login', data)

export const registerUser = (data: any) =>
  axios.post('/api/auth/register', data)