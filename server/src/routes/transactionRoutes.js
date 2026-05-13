import express from 'express'
import Transaction from '../models/transactionModel.js'

const router = express.Router()

router.get('/:vendorId', async (
  req,
  res
) => {

  try {

    const transactions =
      await Transaction.find({

        vendor:
          req.params.vendorId

      }).sort({
        createdAt: -1
      })

    res.json(transactions)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

})

export default router