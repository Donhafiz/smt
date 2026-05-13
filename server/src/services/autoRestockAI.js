import Product from '../models/Product.js'
import { notify } from './notificationEngine.js'

export const evaluateRestockNeeds = async (tenantId) => {

  const products = await Product.find({ tenantId })

  const alerts = []
  const restockSuggestions = []

  for (const product of products) {

    // =========================
    // CRITICAL LOW STOCK
    // =========================
    if (product.stock <= 2) {

      alerts.push({
        level: 'critical',
        productId: product._id,
        message: `${product.name} is critically low (${product.stock})`
      })

      restockSuggestions.push({
        productId: product._id,
        productName: product.name,
        suggestedQuantity: 20,
        priority: 'high'
      })
      
      // Send notification
      await notify({
        channel: 'email',
        to: 'admin@shop.com',
        subject: 'CRITICAL: Low Stock Alert',
        message: `${product.name} is critically low (${product.stock}) - Restock immediately`,
        html: `
          <div style="font-family:Arial">
            <h2>CRITICAL: Low Stock Alert</h2>
            <p><strong>${product.name}</strong> is critically low (${product.stock})</p>
            <p>Restock immediately to avoid stockout</p>
          </div>
        `
      })
    }

    // =========================
    // LOW STOCK WARNING
    // =========================
    else if (product.stock <= 5) {

      alerts.push({
        level: 'warning',
        productId: product._id,
        message: `${product.name} is low (${product.stock})`
      })

      restockSuggestions.push({
        productId: product._id,
        productName: product.name,
        suggestedQuantity: 10,
        priority: 'medium'
      })
    }

    // =========================
    // NORMAL STOCK
    // =========================
    else if (product.stock <= 10) {

      alerts.push({
        level: 'info',
        productId: product._id,
        message: `${product.name} stock is getting low`
      })
    }
  }

  return {
    totalProducts: products.length,
    alerts,
    restockSuggestions,
    criticalCount: alerts.filter(a => a.level === 'critical').length,
    warningCount: alerts.filter(a => a.level === 'warning').length
  }
}