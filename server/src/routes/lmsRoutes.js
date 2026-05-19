import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getCourseContent,
  saveCourseContent,
  enrollCourse,
  updateProgress,
  getMyEnrollments,
  getEnrollmentProgress,
  generateCertificate,
  downloadCertificate,
  rateCourse,
  getCourseReviews
} from '../controllers/lmsController.js'

const router = express.Router()

// Public
router.get('/course/:courseId/content', getCourseContent)
router.get('/course/:courseId/reviews', getCourseReviews)

// Protected
router.post('/course/:courseId/content', protect, saveCourseContent)
router.put('/course/:courseId/content', protect, saveCourseContent)
router.post('/enroll', protect, enrollCourse)
router.put('/progress', protect, updateProgress)
router.get('/my-courses', protect, getMyEnrollments)
router.get('/course-progress/:courseId', protect, getEnrollmentProgress)
router.post('/certificate/:courseId', protect, generateCertificate)
router.get('/certificate/:courseId/download', protect, downloadCertificate)
router.post('/rate/:courseId', protect, rateCourse)

export default router