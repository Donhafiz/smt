import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendWelcomeEmail = async (to, name, staffId, tempPassword) => {
  const html = `
    <div style="max-width:600px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;background:#0f172a;color:#fff;border-radius:16px;">
      <div style="text-align:center;padding:20px;background:linear-gradient(135deg,#06b6d4,#3b82f6);border-radius:12px;margin-bottom:20px;">
        <h1 style="margin:0;font-size:28px;">🎉 Welcome to SMT!</h1>
      </div>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your staff account has been created at <strong>Star Media Tech</strong>.</p>
      <div style="background:#1e293b;padding:20px;border-radius:12px;margin:20px 0;">
        <p><strong>Staff ID:</strong> ${staffId}</p>
        <p><strong>Email:</strong> ${to}</p>
        <p><strong>Temporary Password:</strong> ${tempPassword}</p>
      </div>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/staff-login" 
         style="display:inline-block;padding:12px 24px;background:#06b6d4;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
        Login to Staff Portal
      </a>
      <p style="margin-top:20px;color:#94a3b8;font-size:12px;">Change your password after first login.</p>
    </div>
  `

  return transporter.sendMail({
    from: `"Star Media Tech" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Star Media Tech - Staff Account',
    html
  })
}

export const sendOrderConfirmation = async (to, orderDetails) => {
  const html = `
    <div style="max-width:600px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;background:#0f172a;color:#fff;border-radius:16px;">
      <div style="text-align:center;padding:20px;background:linear-gradient(135deg,#06b6d4,#3b82f6);border-radius:12px;margin-bottom:20px;">
        <h1 style="margin:0;">🛍️ Order Confirmed!</h1>
      </div>
      <p>Thank you for your order!</p>
      <div style="background:#1e293b;padding:20px;border-radius:12px;margin:20px 0;">
        <p><strong>Order ID:</strong> ${orderDetails._id}</p>
        <p><strong>Total:</strong> GHS ${orderDetails.total?.toLocaleString()}</p>
        <p><strong>Items:</strong> ${orderDetails.items?.length || 0}</p>
      </div>
      <p style="color:#94a3b8;font-size:12px;">We'll notify you when your order ships.</p>
    </div>
  `

  return transporter.sendMail({
    from: `"Star Media Tech" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Order Confirmed - Star Media Tech',
    html
  })
}