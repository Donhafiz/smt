import express from 'express'

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'

import { attachTenant } from '../middleware/tenantMiddleware.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// =========================
// PRODUCT ROUTES
// =========================

router.get('/', protect, attachTenant, getProducts)

router.post('/', protect, attachTenant, createProduct)

router.put('/:id', protect, attachTenant, updateProduct)

router.delete('/:id', protect, attachTenant, deleteProduct)

export default router