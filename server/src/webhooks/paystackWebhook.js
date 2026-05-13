import Order from '../models/Order.js'
import PaymentLedger from '../payments/paymentLedger.js'
import { PAYMENT_STATUS } from '../payments/paymentState.js'
import { getIO } from '../socket.js'

export const paystackWebhook = async (req, res) => {
  try {
    const event = req.body

    if (event.event !== 'charge.success') {
      return res.sendStatus(200)
    }

    const data = event.data
    const reference = data.reference

    const ledger = await PaymentLedger.findOne({ reference })

    if (!ledger) return res.sendStatus(200)

    ledger.status = PAYMENT_STATUS.SUCCESS
    await ledger.save()

    const order = await Order.findById(ledger.orderId)

    if (order) {
      order.status = 'paid'
      await order.save()

      getIO().emit('payment-success', {
        orderId: order._id,
        amount: order.total
      })
    }

    return res.sendStatus(200)

  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
}