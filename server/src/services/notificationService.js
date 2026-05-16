import nodemailer from 'nodemailer'

// =========================
// EMAIL SETUP
// =========================
const emailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// =========================
// SMS SETUP (TWILIO — OPTIONAL)
// =========================
let smsClient = null

if (process.env.TWILIO_SID && process.env.TWILIO_SID.startsWith('AC')) {
  try {
    const twilio = await import('twilio')
    smsClient = twilio.default(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
    console.log('✅ Twilio SMS ready')
  } catch (err) {
    console.log('⚠️ Twilio not available:', err.message)
  }
} else {
  console.log('ℹ️ Twilio not configured — SMS features disabled')
}

// =========================
// SEND EMAIL
// =========================
export const sendEmail = async ({ to, subject, html }) => {
  try {
    await emailTransport.sendMail({
      from: `"Star Media Tech" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    })
    console.log('📧 Email sent to:', to)
  } catch (err) {
    console.error('Email send failed:', err.message)
  }
}

// =========================
// SEND SMS
// =========================
export const sendSMS = async (to, message) => {
  if (!smsClient) {
    console.log('📱 SMS skipped (Twilio not configured)')
    return
  }
  try {
    await smsClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to
    })
    console.log('📱 SMS sent to:', to)
  } catch (err) {
    console.error('SMS send failed:', err.message)
  }
}

// =========================
// NOTIFY (Email + SMS)
// =========================
export const notify = async ({ channel, to, subject, message, html }) => {
  if (channel === 'email' || channel === 'both') {
    await sendEmail({ to, subject: subject || 'Star Media Tech', html: html || `<p>${message}</p>` })
  }
  if (channel === 'sms' || channel === 'both') {
    await sendSMS(to, message)
  }
}