import Wallet from '../models/walletModel.js'
import Withdrawal from '../models/withdrawalModel.js'
import Transaction from '../models/transactionModel.js'

/* GET WALLET */
export const getWallet = async (
  req,
  res
) => {

  try {

    const wallet =
      await Wallet.findOne({

        vendor: req.params.vendorId

      })

    res.json(wallet)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

}

/* REQUEST WITHDRAWAL */
export const requestWithdrawal =
  async (req, res) => {

    try {

      const {
        vendorId,
        amount,
        bankName,
        accountNumber,
        accountName
      } = req.body

      const wallet =
        await Wallet.findOne({
          vendor: vendorId
        })

      if (!wallet) {

        return res.status(404).json({
          message: 'Wallet not found'
        })

      }

      if (wallet.balance < amount) {

        return res.status(400).json({
          message:
            'Insufficient balance'
        })

      }

      const withdrawal =
        await Withdrawal.create({

          vendor: vendorId,

          amount,

          bankName,

          accountNumber,

          accountName

        })

      wallet.balance -= amount

      wallet.totalWithdrawn += amount

      await wallet.save()

      await Transaction.create({

        vendor: vendorId,

        amount,

        type: 'withdrawal'

      })

      res.status(201).json(
        withdrawal
      )

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }

  }