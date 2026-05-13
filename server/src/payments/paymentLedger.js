import mongoose from 'mongoose'

const ledgerSchema = new mongoose.Schema({
  tenantId: String,
  orderId: String,
  amount: Number,
  currency: { type: String, default: 'GHS' },
  status: String,
  reference: String,
  source: String, // paystack, stripe, manual
  metadata: Object,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('PaymentLedger', ledgerSchema)