import express from 'express'
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getCourses)            // Public
router.post('/', protect, createCourse)
router.put('/:id', protect, updateCourse)
router.delete('/:id', protect, deleteCourse)

export default router