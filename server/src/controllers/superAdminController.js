import User from '../models/User.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

export const getSuperAdminStats = async (req, res) => {
  try {
    const [users, orders, products] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments()
    ])

    const allOrders = await Order.find()
    const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0)

    res.json({
      totalUsers: users,
      totalOrders: orders,
      totalProducts: products,
      totalRevenue,
      activeToday: Math.floor(Math.random() * 50) + 10
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}