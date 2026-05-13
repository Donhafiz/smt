import express from 'express'

import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff
} from '../controllers/staffController.js'

import { protect } from '../middleware/authMiddleware.js'
import { attachTenant } from '../middleware/tenantMiddleware.js'

const router = express.Router()

// =========================
// GET STAFF
// =========================
router.get(
  '/',
  protect,
  attachTenant,
  getStaff
)

// =========================
// CREATE STAFF
// =========================
router.post(
  '/',
  protect,
  attachTenant,
  createStaff
)

// =========================
// UPDATE STAFF
// =========================
router.put(
  '/:id',
  protect,
  attachTenant,
  updateStaff
)

// =========================
// DELETE STAFF
// =========================
router.delete(
  '/:id',
  protect,
  attachTenant,
  deleteStaff
)

export default router