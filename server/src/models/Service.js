import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    category: { type: String, default: 'General' },
    icon: { type: String, default: 'Monitor' },
    tenantId: { type: String, default: 'default-tenant' }
  },
  { timestamps: true }
)

export default mongoose.model('Service', serviceSchema)