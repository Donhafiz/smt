import crypto from 'crypto'
import PaymentLedger from './paymentLedger.js'
import { PAYMENT_STATUS } from './paymentState.js'

export const createPaymentIntent = async ({ order, tenantId }) => {
  const idempotencyKey = crypto
    .createHash('sha256')
    .update(order._id + order.total)
    .digest('hex')

  const existing = await PaymentLedger.findOne({
    orderId: order._id,
    status: PAYMENT_STATUS.SUCCESS
  })

  if (existing) return existing

  const intent = await PaymentLedger.create({
    tenantId,
    orderId: order._id,
    amount: order.total,
    status: PAYMENT_STATUS.PENDING,
    source: 'system',
    metadata: {
      idempotencyKey
    }
  })

  return intent
}