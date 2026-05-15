import express from 'express'
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public — anyone can view courses
router.get('/', getCourses)

// Protected — only admin can modify
router.post('/', protect, createCourse)
router.put('/:id', protect, updateCourse)
router.delete('/:id', protect, deleteCourse)

export default router