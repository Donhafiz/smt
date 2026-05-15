import PDFDocument from 'pdfkit'

export const generateInvoice = (order) => {
  const doc = new PDFDocument({ margin: 50 })
  const buffers = []
  
  doc.on('data', buffers.push.bind(buffers))
  
  // Header
  doc.fontSize(24).font('Helvetica-Bold').text('STAR MEDIA TECH', { align: 'center' })
  doc.fontSize(10).font('Helvetica').text('Tamale, Ghana | +233 559 137 611', { align: 'center' })
  doc.moveDown()
  doc.text('INVOICE', { align: 'center', fontSize: 18 })
  doc.moveDown()
  
  // Order Info
  doc.fontSize(10)
  doc.text(`Order ID: ${order._id}`)
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`)
  doc.text(`Customer: ${order.customerName || 'N/A'}`)
  doc.moveDown()
  
  // Items
  doc.text('Items:', { underline: true })
  order.items?.forEach((item, i) => {
    doc.text(`${i + 1}. ${item.name} - GHS ${item.price} x ${item.quantity}`)
  })
  doc.moveDown()
  doc.font('Helvetica-Bold').text(`Total: GHS ${order.total?.toLocaleString()}`)
  
  doc.end()
  
  return Buffer.concat(buffers)
}