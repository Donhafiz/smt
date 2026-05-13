import Billing from '../models/Billing.js'

export const checkPlan = (requiredPlan) => {
  return async (req, res, next) => {
    try {
      const billing = await Billing.findOne({
        tenantId: req.tenantId
      })

      const planHierarchy = {
        free: 1,
        pro: 2,
        enterprise: 3
      }

      const userPlanLevel = planHierarchy[billing?.plan || 'free']
      const requiredPlanLevel = planHierarchy[requiredPlan]

      if (userPlanLevel < requiredPlanLevel) {
        return res.status(403).json({
          message: 'Upgrade plan required'
        })
      }

      next()
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}