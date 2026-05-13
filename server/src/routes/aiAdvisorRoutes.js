import express from 'express'

import { getBusinessAdvice } from '../controllers/aiAdvisorController.js'

import { protect } from '../middleware/authMiddleware.js'
import { attachTenant } from '../middleware/tenantMiddleware.js'

const router = express.Router()

router.get(
  '/business-advice',
  protect,
  attachTenant,
  getBusinessAdvice
)

export default router