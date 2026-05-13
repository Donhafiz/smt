import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true
    },

    plan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'enterprise'],
      default: 'free'
    },

    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active'
    },

    amount: {
      type: Number,
      default: 0
    },

    paystackCustomerCode: String,

    paystackSubscriptionCode: String,

    nextBillingDate: Date

  },
  { timestamps: true }
)

export default mongoose.model(
  'Subscription',
  subscriptionSchema
)