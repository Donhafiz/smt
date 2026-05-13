import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { checkPlan } from '../middleware/billingMiddleware.js'

import {
  createService,
  getServices,
  updateService,
  deleteService
} from '../controllers/serviceController.js'

const router = express.Router()

// CREATE
router.post('/', protect, checkPlan('pro'), createService)

// READ
router.get('/', protect, getServices)

// UPDATE
router.put('/:id', updateService)

// DELETE
router.delete('/:id', deleteService)

export default router