import { generateForecast } from '../services/predictiveEngine.js'

export const getForecast = async (req, res) => {
  try {
    const data = await generateForecast(req.tenantId)
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}