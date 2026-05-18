import CourseContent from '../models/CourseContent.js'
import Enrollment from '../models/Enrollment.js'
import Course from '../models/Course.js'
import PDFDocument from 'pdfkit'

// Get course content with sections and lessons
export const getCourseContent = async (req, res) => {
  try {
    const content = await CourseContent.findOne({ courseId: req.params.courseId })
    if (!content) {
      return res.status(404).json({ message: 'Course content not available yet' })
    }
    res.json(content)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Save course content (create or update)
export const saveCourseContent = async (req, res) => {
  try {
    const { courseId } = req.params
    const contentData = req.body

    let content = await CourseContent.findOne({ courseId })
    
    if (content) {
      Object.assign(content, contentData)
      await content.save()
    } else {
      content = await CourseContent.create({ courseId, ...contentData })
    }

    res.json(content)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const studentId = req.user._id

    const existing = await Enrollment.findOne({ studentId, courseId })
    if (existing) {
      return res.json({ message: 'Already enrolled', enrollment: existing })
    }

    const content = await CourseContent.findOne({ courseId })
    const progress = content?.sections?.flatMap(s => 
      s.lessons.map(l => ({ lessonId: l._id?.toString(), completed: false, watchTime: 0, lastPosition: 0 }))
    ) || []

    const enrollment = await Enrollment.create({
      studentId,
      courseId,
      progress
    })

    res.status(201).json({ message: 'Enrolled successfully', enrollment })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update lesson progress (with watch time tracking)
export const updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, completed, watchTime, lastPosition } = req.body
    const studentId = req.user._id

    const enrollment = await Enrollment.findOne({ studentId, courseId })
    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled' })
    }

    const existingProgress = enrollment.progress.find(p => p.lessonId === lessonId)
    if (existingProgress) {
      existingProgress.completed = completed
      existingProgress.watchedAt = completed ? new Date() : null
      if (watchTime) existingProgress.watchTime = (existingProgress.watchTime || 0) + watchTime
      if (lastPosition) existingProgress.lastPosition = lastPosition
    } else {
      enrollment.progress.push({ 
        lessonId, completed, 
        watchedAt: completed ? new Date() : null,
        watchTime: watchTime || 0,
        lastPosition: lastPosition || 0
      })
    }

    // Check if all lessons are completed
    const content = await CourseContent.findOne({ courseId })
    const totalLessons = content?.sections?.reduce((sum, s) => sum + s.lessons.length, 0) || 0
    const completedLessons = enrollment.progress.filter(p => p.completed).length

    if (completedLessons >= totalLessons && totalLessons > 0 && !enrollment.completedAt) {
      enrollment.completedAt = new Date()
      enrollment.grade = Math.round((completedLessons / totalLessons) * 100)

      // Send congratulations email
      const student = await import('../models/User.js').then(m => m.default.findById(studentId))
      const course = await Course.findById(courseId)
      
      if (student?.email && course) {
        import('../services/emailService.js')
          .then(m => {
            if (m.sendCourseCompletionEmail) {
              m.sendCourseCompletionEmail(student.email, student.name, course.title)
            } else if (m.sendEmail) {
              m.sendEmail({
                to: student.email,
                subject: '🎉 Course Completed!',
                html: `<h2>Congratulations ${student.name}!</h2><p>You've completed <strong>${course.title}</strong>.</p><p>Download your certificate from your dashboard.</p>`
              })
            }
          })
          .catch(err => console.error('Completion email failed:', err.message))
      }
    }

    await enrollment.save()
    res.json({ message: 'Progress updated', enrollment })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get student enrollments
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user._id })
      .populate('courseId')
      .sort({ createdAt: -1 })
    res.json(enrollments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get enrollment progress
export const getEnrollmentProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: req.params.courseId
    }).populate('courseId')

    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled' })
    }

    const content = await CourseContent.findOne({ courseId: req.params.courseId })
    const totalLessons = content?.sections?.reduce((sum, s) => sum + s.lessons.length, 0) || 0
    const completedLessons = enrollment.progress.filter(p => p.completed).length
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    res.json({
      enrollment,
      totalLessons,
      completedLessons,
      percentage,
      isCompleted: !!enrollment.completedAt
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Generate Certificate URL
export const generateCertificate = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: req.params.courseId
    }).populate('courseId').populate('studentId')

    if (!enrollment || !enrollment.completedAt) {
      return res.status(400).json({ message: 'Course not completed yet' })
    }

    const certificateUrl = `https://smt-tech.vercel.app/certificate/${enrollment._id}`
    
    enrollment.certificateGenerated = true
    enrollment.certificateUrl = certificateUrl
    await enrollment.save()

    res.json({
      message: 'Certificate generated!',
      certificateUrl,
      student: enrollment.studentId?.name,
      course: enrollment.courseId?.title
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Download Certificate as PDF
export const downloadCertificate = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: req.params.courseId
    }).populate('courseId').populate('studentId')

    if (!enrollment || !enrollment.completedAt) {
      return res.status(400).json({ message: 'Course not completed yet' })
    }

    const doc = new PDFDocument({ layout: 'landscape', size: 'A4' })
    const buffers = []
    
    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers)
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename=certificate-${enrollment._id}.pdf`)
      res.send(pdfData)
    })

    // Certificate Design
    doc.rect(0, 0, 842, 595).fill('#020617')
    doc.rect(20, 20, 802, 555).lineWidth(3).stroke('#06b6d4')
    doc.rect(30, 30, 782, 535).lineWidth(1).stroke('#3b82f6')
    doc.rect(40, 40, 762, 515).lineWidth(0.5).stroke('#1e293b')

    // Stars
    doc.fontSize(14).fill('#f59e0b').text('★ ★ ★', { align: 'center' })
    doc.moveDown(1)

    doc.fontSize(36).font('Helvetica-Bold').fill('#06b6d4')
      .text('CERTIFICATE OF COMPLETION', { align: 'center' })
    doc.moveDown(2)
    
    doc.fontSize(18).font('Helvetica').fill('#94a3b8')
      .text('This is to certify that', { align: 'center' })
    doc.moveDown(1)
    
    doc.fontSize(30).font('Helvetica-Bold').fill('#ffffff')
      .text(enrollment.studentId?.name || 'Student', { align: 'center' })
    doc.moveDown(1)
    
    doc.fontSize(16).font('Helvetica').fill('#94a3b8')
      .text('has successfully completed the course', { align: 'center' })
    doc.moveDown(1)
    
    doc.fontSize(24).font('Helvetica-Bold').fill('#06b6d4')
      .text(enrollment.courseId?.title || 'Course', { align: 'center' })
    doc.moveDown(2)
    
    doc.fontSize(12).font('Helvetica').fill('#64748b')
      .text(`Date: ${new Date(enrollment.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, { align: 'center' })
      .text(`Grade: ${enrollment.grade || 100}%`, { align: 'center' })
    doc.moveDown(2)
    
    // Signature line
    doc.moveTo(300, doc.y).lineTo(542, doc.y).stroke('#475569')
    doc.fontSize(10).fill('#64748b').text('Star Media Tech — Premium Technology Institution', { align: 'center' })
    doc.text('Tamale, Ghana | smt-tech.vercel.app', { align: 'center' })
    doc.moveDown(1)
    doc.fontSize(8).fill('#475569')
      .text(`Certificate ID: ${enrollment._id} | Verify at smt-tech.vercel.app/verify`, { align: 'center' })

    doc.end()
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Rate a course
export const rateCourse = async (req, res) => {
  try {
    const { rating, review } = req.body
    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: req.params.courseId
    })

    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled' })
    }

    enrollment.rating = rating
    enrollment.review = review
    enrollment.reviewedAt = new Date()
    await enrollment.save()

    res.json({ message: 'Review submitted!', enrollment })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get course reviews
export const getCourseReviews = async (req, res) => {
  try {
    const reviews = await Enrollment.find({
      courseId: req.params.courseId,
      rating: { $exists: true }
    }).populate('studentId', 'name photo').select('rating review reviewedAt')

    const avgRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0

    res.json({ reviews, averageRating: avgRating, totalReviews: reviews.length })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}