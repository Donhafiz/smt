import mongoose from 'mongoose'

const walletSchema = new mongoose.Schema(

  {

    vendor: {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'Vendor',

      required: true

    },

    balance: {

      type: Number,

      default: 0

    },

    totalEarnings: {

      type: Number,

      default: 0

    },

    totalWithdrawn: {

      type: Number,

      default: 0

    }

  },

  {
    timestamps: true
  }

)

export default mongoose.model(
  'Wallet',
  walletSchema
)