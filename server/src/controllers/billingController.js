import axios from 'axios'
import Subscription from '../models/Subscription.js'

const PAYSTACK_SECRET =
  process.env.PAYSTACK_SECRET_KEY

// =========================
// CREATE PAYMENT LINK
// =========================
export const createSubscription =
  async (req, res) => {

    try {

      const {
        email,
        plan,
        amount
      } = req.body

      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: amount * 100,
          metadata: {
            tenantId: req.tenantId,
            plan
          }
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
            'Content-Type': 'application/json'
          }
        }
      )

      res.json(response.data)

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }
  }

// =========================
// GET CURRENT SUBSCRIPTION
// =========================
export const getSubscription =
  async (req, res) => {

    try {

      const subscription =
        await Subscription.findOne({
          tenantId: req.tenantId
        })

      res.json(subscription)

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }
  }