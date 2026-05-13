import { generateInsights } from '../services/insightEngine.js'

export const getAIInsights = async (req, res) => {
  try {
    const data = await generateInsights(req.tenantId)

    res.json(data)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}