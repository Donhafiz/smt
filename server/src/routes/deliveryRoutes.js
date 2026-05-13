import express from 'express'

import {
  createSubscription,
  getSubscription
} from '../controllers/billingController.js'

import { protect } from '../middleware/authMiddleware.js'
import { attachTenant } from '../middleware/tenantMiddleware.js'

const router = express.Router()

router.post(
  '/subscribe',
  protect,
  attachTenant,
  createSubscription
)

router.get(
  '/current',
  protect,
  attachTenant,
  getSubscription
)

export default router