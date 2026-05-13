import express from 'express'
import Billing from '../models/Billing.js'

const router = express.Router()

// GET CURRENT PLAN
router.get('/', async (req, res) => {
  try {
    const billing = await Billing.findOne({
      tenantId: req.tenantId
    })

    res.json(billing)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// UPGRADE PLAN (manual for now)
router.post('/upgrade', async (req, res) => {
  try {
    const { plan, amount } = req.body

    const billing = await Billing.findOneAndUpdate(
      { tenantId: req.tenantId },
      {
        plan,
        amount,
        status: 'active',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      { new: true, upsert: true }
    )

    res.json(billing)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router