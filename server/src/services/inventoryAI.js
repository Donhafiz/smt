import Product from '../models/Product.js'
import { getIO } from '../socket.js'

export const runInventoryAI = async () => {
  const io = getIO()

  const products = await Product.find()

  let lowStockItems = []
  let criticalItems = []

  products.forEach(p => {

    // =========================
    // CRITICAL STOCK LEVEL
    // =========================
    if (p.stock <= 2) {
      criticalItems.push(p)
    }

    // =========================
    // LOW STOCK WARNING
    // =========================
    else if (p.stock <= 5) {
      lowStockItems.push(p)
    }
  })

  // =========================
  // ALERT: CRITICAL STOCK
  // =========================
  if (criticalItems.length > 0) {
    io.emit('alert', {
      type: 'danger',
      message: `🚨 ${criticalItems.length} products critically low (≤2 stock)`
    })
  }

  // =========================
  // ALERT: LOW STOCK
  // =========================
  if (lowStockItems.length > 0) {
    io.emit('alert', {
      type: 'warning',
      message: `⚠️ ${lowStockItems.length} products running low`
    })
  }

  // =========================
  // INVENTORY HEALTH STATUS
  // =========================
  const totalProducts = products.length
  const healthy = totalProducts - (lowStockItems.length + criticalItems.length)

  io.emit('inventory-health', {
    total: totalProducts,
    healthy,
    low: lowStockItems.length,
    critical: criticalItems.length
  })

  return {
    totalProducts,
    healthy,
    lowStockItems,
    criticalItems
  }
}