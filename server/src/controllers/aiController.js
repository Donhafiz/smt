import { generateAIResponse } from '../services/aiService.js'

export const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body

    const reply =
      await generateAIResponse(message)

    res.json({
      reply
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}