import mongoose from 'mongoose'

const aiRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  description: String,
  serviceType: { type: String, enum: ['Consultancy', 'AI Solution', 'Software Development'] },
  status: { type: String, default: 'pending', enum: ['pending', 'contacted', 'resolved'] }
}, { timestamps: true })

export default mongoose.model('AIRequest', aiRequestSchema)