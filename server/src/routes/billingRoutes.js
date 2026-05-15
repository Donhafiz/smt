import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getPlans, getSubscription, upgradeSubscription, cancelSubscription, getPaymentHistory, getAllSubscriptions, updateSubscription, deleteSubscription } from '../controllers/billingController.js'

const router = express.Router()

// Public
router.get('/plans', getPlans)

// User
router.get('/subscription', protect, getSubscription)
router.post('/upgrade', protect, upgradeSubscription)
router.post('/cancel', protect, cancelSubscription)
router.get('/history', protect, getPaymentHistory)

// Admin
router.get('/admin/all', protect, getAllSubscriptions)
router.put('/admin/:id', protect, updateSubscription)
router.delete('/admin/:id', protect, deleteSubscription)

export default router