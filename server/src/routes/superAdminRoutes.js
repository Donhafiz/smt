import express from 'express'
import { getSuperAdminStats, getAllUsers } from '../controllers/superAdminController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/stats', protect, getSuperAdminStats)
router.get('/users', protect, getAllUsers)

export default router