import AuditLog from '../models/AuditLog.js'

// ================================
// AUDIT MIDDLEWARE FACTORY
// ================================
export const audit = (action, entity) => {
  return async (req, res, next) => {
    try {

      const originalJson = res.json

      res.json = function (data) {

        // fire-and-forget audit log
        AuditLog.create({
          tenantId: req.tenantId,
          userId: req.user?._id,
          action,
          entity,
          entityId: data?._id || null,
          metadata: {
            body: req.body,
            params: req.params,
            query: req.query,
            response: data
          },
          ipAddress: req.ip,
          userAgent: req.headers['user-agent']
        })

        return originalJson.call(this, data)
      }

      next()

    } catch (err) {
      console.error('Audit middleware error:', err.message)
      next()
    }
  }
}