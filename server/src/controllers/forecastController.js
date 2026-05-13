import Order from '../models/Order.js'
import { getForecast } from '../services/mlService.js'

export const forecastRevenue = async (req, res) => {
  try {

    const orders = await Order.find()

    const revenue = orders.map(o => o.total || 0)

    const prediction = await getForecast(revenue)

    res.json(prediction)

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}