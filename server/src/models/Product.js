import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    stock: Number,
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant'
    }
  },
  { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product