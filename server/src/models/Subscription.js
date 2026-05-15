import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
  tenantId: { type: String, default: 'default-tenant' },
  plan: { type: String, enum: ['free', 'starter', 'pro', 'enterprise'], default: 'free' },
  status: { type: String, enum: ['active', 'cancelled', 'expired', 'trial'], default: 'active' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  trialEndsAt: { type: Date },
  price: { type: Number, default: 0 },
  billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
  features: [String],
  paymentHistory: [{
    amount: Number,
    date: Date,
    method: String,
    status: String,
    transactionId: String
  }],
  autoRenew: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Subscription', subscriptionSchema)