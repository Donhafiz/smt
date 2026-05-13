import mongoose from 'mongoose'

const deliverySchema =
  new mongoose.Schema(

    {

      order: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Order',

        required: true

      },

      driver: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Driver'

      },

      status: {

        type: String,

        enum: [

          'pending',

          'assigned',

          'picked-up',

          'in-transit',

          'delivered'

        ],

        default: 'pending'
      },

      trackingCode: {

        type: String,

        unique: true
      },

      currentLocation: {

        lat: Number,

        lng: Number

      }

    },

    {
      timestamps: true
    }

  )

export default mongoose.model(
  'Delivery',
  deliverySchema
)