import express from 'express'

import { getAuditLogs } from '../controllers/auditController.js'

import { protect } from '../middleware/authMiddleware.js'
import { attachTenant } from '../middleware/tenantMiddleware.js'
import { authorize } from '../middleware/rbacMiddleware.js'

const router = express.Router()

router.get(
  '/',
  protect,
  attachTenant,
  authorize('admin', 'super_admin'),
  getAuditLogs
)

export default router