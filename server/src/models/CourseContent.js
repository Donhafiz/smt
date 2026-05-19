import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number
})

const assignmentSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  dueDate: { type: Date },
  questions: [questionSchema],
  passingScore: { type: Number, default: 70 }
})

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: Number },
  order: { type: Number },
  isPreview: { type: Boolean, default: false },
  assignment: assignmentSchema
})

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema]
})

const courseContentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  sections: [sectionSchema],
  totalDuration: { type: Number },
  totalLessons: { type: Number },
  thumbnail: { type: String },
  trailerUrl: { type: String },
  requirements: [String],
  whatYouWillLearn: [String],
  instructor: {
    name: String,
    bio: String,
    photo: String
  }
}, { timestamps: true })

export default mongoose.model('CourseContent', courseContentSchema)