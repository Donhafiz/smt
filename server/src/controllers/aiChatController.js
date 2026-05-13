import { askBusinessAI } from '../services/aiCFOService.js'

export const aiChat = async (req, res) => {
  try {
    const { message } = req.body

    const response = await askBusinessAI(message)

    res.json({ response })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}