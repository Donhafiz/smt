import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  banUser,
  activateUser,
  getPlatformStats
} from '../controllers/superAdminController.js'

const router = express.Router()

// All routes require admin/superadmin role
router.use(protect)
router.use((req, res, next) => {
  if (!['admin', 'superadmin', 'director'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Super admin access required' })
  }
  next()
})

router.get('/stats', getPlatformStats)
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.put('/users/:id/ban', banUser)
router.put('/users/:id/activate', activateUser)

export default router