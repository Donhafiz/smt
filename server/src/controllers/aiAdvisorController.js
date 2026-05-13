import { generateBusinessInsights } from '../services/aiBusinessAdvisor.js'

export const getBusinessAdvice = async (req, res) => {

  try {

    const tenantId = req.tenantId

    const data =
      await generateBusinessInsights(tenantId)

    res.json(data)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }
}