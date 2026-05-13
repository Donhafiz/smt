import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    tenantId: String,
    type: String,
    channel: String,
    to: String,
    message: String,
    status: {
      type: String,
      default: 'sent'
    }
  },
  { timestamps: true }
)

export default mongoose.model(
  'NotificationLog',
  notificationSchema
)