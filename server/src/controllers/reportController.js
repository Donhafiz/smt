import { generateCEOReport } from '../services/reportService.js'

export const getCEOReport = async (req, res) => {
  try {
    const file = await generateCEOReport(req.tenantId)
    res.json({ file })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}