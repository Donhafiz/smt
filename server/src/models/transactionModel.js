import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(

  {

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    type: {
      type: String,
      enum: ['earning', 'withdrawal'],
      required: true
    },

    reference: {
      type: String,
      default: ''
    },

    status: {
      type: String,
      default: 'completed'
    }

  },

  {
    timestamps: true
  }

)

export default mongoose.model(
  'Transaction',
  transactionSchema
)