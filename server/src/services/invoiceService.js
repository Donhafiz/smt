import PDFDocument from 'pdfkit'
import fs from 'fs'

export const generateInvoice = async (order) => {
  const doc = new PDFDocument()

  const filePath = `invoices/invoice-${order._id}.pdf`
  doc.pipe(fs.createWriteStream(filePath))

  doc.fontSize(20).text('INVOICE', { align: 'center' })

  doc.moveDown()
  doc.text(`Customer: ${order.customerName}`)
  doc.text(`Email: ${order.customerEmail}`)
  doc.text(`Total: GHS ${order.total}`)

  doc.end()

  return filePath
}