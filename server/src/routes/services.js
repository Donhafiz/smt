import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { createService, getServices, updateService, deleteService } from '../controllers/serviceController.js'

const router = express.Router()

// Public — anyone can view services
router.get('/', getServices)

// Protected — only admin can modify
router.post('/', protect, createService)
router.put('/:id', protect, updateService)
router.delete('/:id', protect, deleteService)

export default router