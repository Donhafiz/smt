import mongoose from 'mongoose'

const aiRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  description: { type: String, required: true },
  serviceType: { 
    type: String, 
    enum: ['Consultancy', 'AI Solution', 'Software Development'],
    default: 'Consultancy'
  },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'resolved'],
    default: 'pending'
  },
  tenantId: { type: String, default: 'default-tenant' }
}, { timestamps: true })

export default mongoose.model('AIRequest', aiRequestSchema)