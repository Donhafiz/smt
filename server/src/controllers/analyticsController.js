import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Course from '../models/Course.js'
import Staff from '../models/Staff.js'

export const getDashboardAnalytics = async (req, res) => {
  try {
    const orders = await Order.find()
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    const totalOrders = orders.length
    const completedOrders = orders.filter(o => o.status === 'completed').length
    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length

    // Monthly revenue (last 6 months)
    const monthlyRevenue = {}
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    orders.forEach(order => {
      const m = new Date(order.createdAt).getMonth()
      const monthName = months[m]
      monthlyRevenue[monthName] = (monthlyRevenue[monthName] || 0) + (order.total || 0)
    })

    // Prepare labels and data for the last 6 months
    const now = new Date()
    const labels = []
    const revenueData = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = months[d.getMonth()]
      labels.push(monthName + ' ' + d.getFullYear().toString().slice(-2))
      revenueData.push(monthlyRevenue[monthName] || 0)
    }

    const totalProducts = await Product.countDocuments()
    const totalCourses = await Course.countDocuments()
    const totalStaff = await Staff.countDocuments()
    const totalUsers = await User.countDocuments()

    res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCourses,
      totalStaff,
      totalUsers,
      orderStatus: {
        completed: completedOrders,
        pending: pendingOrders,
        cancelled: cancelledOrders,
      },
      revenueChart: {
        labels,
        datasets: [{
          label: 'Revenue (GHS)',
          data: revenueData,
          backgroundColor: 'rgba(6, 182, 212, 0.2)',
          borderColor: '#06b6d4',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#06b6d4'
        }]
      },
      orderStatusChart: {
        labels: ['Completed', 'Pending', 'Cancelled'],
        datasets: [{
          data: [completedOrders, pendingOrders, cancelledOrders],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
          borderWidth: 0
        }]
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}