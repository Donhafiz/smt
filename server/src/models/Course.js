import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['Web Development', 'Mobile', 'Cybersecurity', 'Data Analysis', 'AI', 'Networking', 'Graphic Design']
  },
  price: { type: Number, default: 0 },
  duration: { type: String },
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  syllabus: [{ title: String, description: String }],
  instructor: { type: String },
  tenantId: { type: String, default: 'default-tenant' }
}, { timestamps: true })

export default mongoose.model('Course', courseSchema)