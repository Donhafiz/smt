import Order from '../models/Order.js'
import { writeFileSync } from 'fs'

// simple PDF-style text report (upgrade to pdfkit later)
export const generateCEOReport = async (tenantId) => {
  const orders = await Order.find({ tenantId })

  const revenue = orders.reduce((s, o) => s + o.total, 0)

  const report = `
CEO WEEKLY REPORT
====================

Total Orders: ${orders.length}
Total Revenue: GHS ${revenue}

Performance Summary:
- Business is ${revenue > 5000 ? 'GROWING' : 'STABLE'}
- Orders trend: ${orders.length > 20 ? 'High Activity' : 'Normal'}

Generated: ${new Date().toISOString()}
  `

  const path = `/tmp/ceo-report-${tenantId}.txt`

  writeFileSync(path, report)

  return path
}