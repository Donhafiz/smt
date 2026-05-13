import AuditLog from '../models/AuditLog.js'
import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
export const createAuditLog = async ({
  tenantId,
  userId,
  action,
  entity,
  entityId,
  metadata,
  req
}) => {


  try {

    await AuditLog.create({
      tenantId,
      userId,
      action,
      entity,
      entityId,
      metadata,
      ipAddress: req?.ip,
      userAgent: req?.headers['user-agent']
    })

  } catch (err) {

    console.error('Audit log error:', err)

  }
}

export const getAuditLogs = async (tenantId, page = 1, limit = 50) => {
  return await AuditLog.find({ tenantId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
}


export const pushLiveMetrics = async (tenantId) => {
  const orders = await Order.find({ tenantId })
  const users = await User.find({ tenantId })
  const products = await Product.find({ tenantId })

  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0)

  const payload = {
    revenue,
    orders: orders.length,
    users: users.length,
    lowStock: products.filter(p => p.stock <= 5).length,
    timestamp: new Date()
  }

  getIO().to(tenantId.toString()).emit('live-metrics', payload)
}