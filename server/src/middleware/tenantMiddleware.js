import Tenant from '../models/Tenant.js'

export const attachTenant = async (req, res, next) => {
  try {

    // Expect tenantId from auth middleware (VERY IMPORTANT)
    const tenantId =
      req.user?.tenantId ||
      req.headers['x-tenant-id']

    if (!tenantId) {
      return res.status(400).json({
        message: 'Tenant ID missing'
      })
    }

    const tenant = await Tenant.findById(tenantId)

    if (!tenant) {
      return res.status(404).json({
        message: 'Tenant not found'
      })
    }

    req.tenantId = tenant._id
    req.tenant = tenant

    next()

  } catch (err) {

    return res.status(500).json({
      message: 'Tenant middleware error',
      error: err.message
    })

  }
}

export const attachBranding = (req, res, next) => {
  try {

    // default safe branding object for SaaS UI layer
    req.branding = {
      appName: process.env.APP_NAME || 'SMT ERP',
      theme: 'dark',
      currency: 'GHS'
    }

    next()

  } catch (err) {
    next(err)
  }
}