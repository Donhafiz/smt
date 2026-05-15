import express from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public — anyone can view products
router.get('/', getProducts)

// Protected — only admin can modify
router.post('/', protect, createProduct)
router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct)

export default router