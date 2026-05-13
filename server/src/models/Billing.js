import mongoose from 'mongoose'

const billingSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
    index: true
  },

  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },

  status: {
    type: String,
    enum: ['active', 'inactive', 'past_due'],
    default: 'active'
  },

  amount: {
    type: Number,
    default: 0
  },

  nextBillingDate: Date,

  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Billing', billingSchema)