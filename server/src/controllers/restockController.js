import { evaluateRestockNeeds } from '../services/autoRestockAI.js'

export const getRestockInsights = async (req, res) => {

  try {

    const data =
      await evaluateRestockNeeds(req.tenantId)

    res.json(data)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }
}