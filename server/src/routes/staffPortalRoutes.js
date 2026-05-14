import express from 'express'
import { staffLogin, getStaffProfile, updateStaffProfile, changePassword, markAttendance } from '../controllers/staffAuthController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public
router.post('/login', staffLogin)

// Protected
router.get('/profile', protect, getStaffProfile)
router.put('/profile', protect, updateStaffProfile)
router.put('/change-password', protect, changePassword)
router.post('/attendance', protect, markAttendance)

export default router