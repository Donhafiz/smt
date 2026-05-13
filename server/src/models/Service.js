import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String, default: 'General' }
  },
  { timestamps: true }
)

export default mongoose.model('Service', serviceSchema)