import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: 'Phones' },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    tenantId: { type: String, default: 'default-tenant' }
  },
  { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product