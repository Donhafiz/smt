import mongoose from 'mongoose'

const tenantSchema = new mongoose.Schema(
  {
    name: String,
    plan: {
      type: String,
      default: 'free'
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

const Tenant = mongoose.models.Tenant || mongoose.model('Tenant', tenantSchema)

export default Tenant