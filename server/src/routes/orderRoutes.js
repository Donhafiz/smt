import express from 'express'

import {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController.js'

import { protect } from '../middleware/authMiddleware.js'
import { attachTenant } from '../middleware/tenantMiddleware.js'
import { authorize } from '../middleware/rbacMiddleware.js'
import { audit } from '../middleware/auditMiddleware.js'

const router = express.Router()

// =========================
// GET ALL ORDERS
// =========================
router.get(
  '/',
  protect,
  attachTenant,
  authorize(
    'admin',
    'manager',
    'super_admin'
  ),
  audit('get_orders', 'order'),
  getOrders
)

// =========================
// CREATE ORDER
// =========================
router.post(
  '/',
  protect,
  attachTenant,
  authorize(
    'admin',
    'manager',
    'cashier'
  ),
  audit('create_order', 'order'),
  createOrder
)

// =========================
// UPDATE ORDER STATUS
// =========================
router.put(
  '/:id',
  protect,
  attachTenant,
  audit('update_order_status', 'order'),
  updateOrderStatus
)

// =========================
// DELETE ORDER
// =========================
router.delete(
  '/:id',
  protect,
  attachTenant,
  authorize(
    'admin',
    'super_admin'
  ),
  audit('delete_order', 'order'),
  deleteOrder
)

export default router