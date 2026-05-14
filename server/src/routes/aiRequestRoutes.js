import express from 'express'
import { createRequest, getRequests } from '../controllers/aiRequestController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createRequest)
router.get('/', protect, getRequests)

export default router