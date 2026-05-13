import mongoose from 'mongoose'

const driverSchema = new mongoose.Schema(

  {

    name: {
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

    phone: String,

    vehicleType: String,

    status: {
      type: String,
      enum: [
        'available',
        'busy',
        'offline'
      ],
      default: 'available'
    }

  },

  {
    timestamps: true
  }

)

export default mongoose.model(
  'Driver',
  driverSchema
)