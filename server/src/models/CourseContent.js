import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: Number },
  order: { type: Number },
  isPreview: { type: Boolean, default: false },
  // ✅ NEW: Assignment
  assignment: {
    title: { type: String },
    description: { type: String },
    dueDate: { type: Date },
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number // Index of correct option
    }],
    passingScore: { type: Number, default: 70 }
  }
},
{ timestamps: true })
const courseContentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  sections: [sectionSchema],
  totalDuration: { type: Number }, // Total hours
  totalLessons: { type: Number },
  thumbnail: { type: String },
  trailerUrl: { type: String }, // Course preview video
  requirements: [String], // Prerequisites
  whatYouWillLearn: [String],
  instructor: {
    name: String,
    bio: String,
    photo: String
  }
}, { timestamps: true })

export default mongoose.model('CourseContent', courseContentSchema)