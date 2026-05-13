import express from 'express'

import {
  getWallet,
  requestWithdrawal
} from '../controllers/walletController.js'

const router = express.Router()

router.get('/:vendorId', getWallet)

router.post(
  '/withdraw',
  requestWithdrawal
)

export default router