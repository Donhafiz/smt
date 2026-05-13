import express from 'express'

import { getRestockInsights } from '../controllers/restockController.js'

import { protect } from '../middleware/authMiddleware.js'
import { attachTenant } from '../middleware/tenantMiddleware.js'

const router = express.Router()

router.get(
  '/insights',
  protect,
  attachTenant,
  getRestockInsights
)

export default router