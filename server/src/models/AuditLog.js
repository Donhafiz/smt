import mongoose from 'mongoose'

const auditLogSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant'
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    action: {
      type: String,
      required: true
    },

    entity: {
      type: String, // e.g. "order", "product"
      required: true
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId
    },

    metadata: {
      type: Object,
      default: {}
    },

    ipAddress: String,

    userAgent: String
  },
  { timestamps: true }
)

export default mongoose.model('AuditLog', auditLogSchema)