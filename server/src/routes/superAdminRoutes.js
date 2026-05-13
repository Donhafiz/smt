import express from 'express'

import {
  getPlatformStats,
  getTenants
} from '../controllers/superAdminController.js'

import { protect } from '../middleware/authMiddleware.js'

import {
  authorize
} from '../middleware/rbacMiddleware.js'

const router = express.Router()

// =========================
// PLATFORM STATS
// =========================
router.get(
  '/stats',
  protect,
  authorize('super_admin'),
  getPlatformStats
)

// =========================
// TENANTS
// =========================
router.get(
  '/tenants',
  protect,
  authorize('super_admin'),
  getTenants
)

export default router