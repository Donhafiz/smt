import mongoose from 'mongoose'

const vendorSchema = new mongoose.Schema(

  {

    businessName: {
      type: String,
      required: true
    },

    ownerName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String
    },

    logo: {
      type: String
    },

    address: {
      type: String
    },

    commissionRate: {
      type: Number,
      default: 10
    },

    approved: {
      type: Boolean,
      default: false
    }

  },

  {
    timestamps: true
  }

)

export default mongoose.model(
  'Vendor',
  vendorSchema
)