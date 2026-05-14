import express from 'express'
import { getStaff, createStaff, updateStaff, deleteStaff, grantAccess, revokeAccess, resetPassword, generateIdCard } from '../controllers/staffController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getStaff)
router.post('/', protect, createStaff)
router.put('/:id', protect, updateStaff)
router.delete('/:id', protect, deleteStaff)
router.put('/:id/grant-access', protect, grantAccess)
router.put('/:id/revoke-access', protect, revokeAccess)
router.put('/:id/reset-password', protect, resetPassword)
router.put('/:id/generate-id-card', protect, generateIdCard)

export default router