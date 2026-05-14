import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { createService, getServices, updateService, deleteService } from '../controllers/serviceController.js'

const router = express.Router()

router.get('/', protect, getServices)
router.post('/', protect, createService)
router.put('/:id', protect, updateService)
router.delete('/:id', protect, deleteService)

export default router