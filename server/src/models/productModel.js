import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor'
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      default: 'general'
    },
    stock: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)