import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true }, // YouTube, Vimeo, or direct URL
  duration: { type: Number }, // in minutes
  order: { type: Number },
  isPreview: { type: Boolean, default: false } // Free preview lesson
})

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema]
})

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