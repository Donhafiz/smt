import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema({
  lessonId: { type: String },
  completed: { type: Boolean, default: false },
  watchedAt: { type: Date },
  watchTime: { type: Number, default: 0 },
  lastPosition: { type: Number, default: 0 }
})

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrolledAt: { type: Date, default: Date.now },
  progress: [progressSchema],
  completedAt: { type: Date },
  certificateGenerated: { type: Boolean, default: false },
  certificateUrl: { type: String },
  grade: { type: Number },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  reviewedAt: { type: Date }
}, { timestamps: true })

export default mongoose.model('Enrollment', enrollmentSchema)