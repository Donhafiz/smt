import express from 'express'
import { paystackWebhook } from '../webhooks/paystackWebhook.js'

const router = express.Router()

router.post('/paystack', paystackWebhook)

export default router