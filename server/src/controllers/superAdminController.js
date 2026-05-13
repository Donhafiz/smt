import Tenant from '../models/Tenant.js'
import User from '../models/User.js'
import Order from '../models/Order.js'
import Subscription from '../models/Subscription.js'

// =========================
// PLATFORM ANALYTICS
// =========================
export const getPlatformStats =
  async (req, res) => {

    try {

      const tenants =
        await Tenant.countDocuments()

      const users =
        await User.countDocuments()

      const orders =
        await Order.countDocuments()

      const subscriptions =
        await Subscription.find()

      const revenue =
        subscriptions.reduce(
          (sum, s) => sum + (s.amount || 0),
          0
        )

      const activeSubscriptions =
        subscriptions.filter(
          s => s.status === 'active'
        ).length

      res.json({
        tenants,
        users,
        orders,
        revenue,
        activeSubscriptions
      })

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }
  }

// =========================
// GET ALL TENANTS
// =========================
export const getTenants =
  async (req, res) => {

    try {

      const tenants =
        await Tenant.find()
          .sort({ createdAt: -1 })

      res.json(tenants)

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }
  }