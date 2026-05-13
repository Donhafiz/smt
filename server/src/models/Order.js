import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    customerEmail: String,
    items: Array,
    total: Number,
    status: {
      type: String,
      default: 'pending'
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant'
    }
  },
  { timestamps: true }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order