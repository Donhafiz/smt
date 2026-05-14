import AIRequest from '../models/AIRequest.js'

export const createRequest = async (req, res) => {
  try {
    const request = await AIRequest.create(req.body)
    res.status(201).json(request)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const getRequests = async (req, res) => {
  try {
    const requests = await AIRequest.find().sort('-createdAt')
    res.json(requests)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}