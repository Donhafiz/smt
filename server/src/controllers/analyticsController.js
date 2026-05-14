import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'

export const getDashboardAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments()
    const totalCustomers = await User.countDocuments({ role: 'user' })
    const totalProducts = await Product.countDocuments()
    
    const orders = await Order.find().sort('-createdAt').limit(10)
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)

    const recentOrders = orders.map(order => ({
      id: order._id,
      customer: order.customerName,
      total: order.total,
      status: order.status,
      date: order.createdAt
    }))

    res.json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      recentOrders,
      revenueByMonth: []
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getRevenueAnalytics = async (req, res) => {
  try {
    const orders = await Order.find()
    const monthly = {}

    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' })
      monthly[month] = (monthly[month] || 0) + (order.total || 0)
    })

    res.json({
      monthly: Object.entries(monthly).map(([month, revenue]) => ({ month, revenue })),
      weekly: [],
      daily: []
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getOrderAnalytics = async (req, res) => {
  try {
    const total = await Order.countDocuments()
    const pending = await Order.countDocuments({ status: 'pending' })
    const completed = await Order.countDocuments({ status: 'completed' })
    const cancelled = await Order.countDocuments({ status: 'cancelled' })

    res.json({ total, pending, completed, cancelled })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}