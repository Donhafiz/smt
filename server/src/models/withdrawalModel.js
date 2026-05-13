import mongoose from 'mongoose'

const withdrawalSchema =
  new mongoose.Schema(

    {

      vendor: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Vendor',

        required: true

      },

      amount: {

        type: Number,

        required: true

      },

      bankName: String,

      accountNumber: String,

      accountName: String,

      status: {

        type: String,

        enum: [
          'pending',
          'approved',
          'rejected',
          'paid'
        ],

        default: 'pending'
      }

    },

    {
      timestamps: true
    }

  )

export default mongoose.model(
  'Withdrawal',
  withdrawalSchema
)