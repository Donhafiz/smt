import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    email: String,
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant'
    }
  },
  { timestamps: true }
)

const Staff = mongoose.models.Staff || mongoose.model('Staff', staffSchema)

export default Staff