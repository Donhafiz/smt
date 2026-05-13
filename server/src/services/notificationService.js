import nodemailer from 'nodemailer'
import twilio from 'twilio'

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
// SMS SETUP (TWILIO)
// =========================
const smsClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// =========================
// SEND EMAIL
// =========================
export const sendEmail = async ({
  to,
  subject,
  html
}) => {

  try {

    await emailTransport.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    })

  } catch (err) {

    console.error('Email error:', err.message)

  }
}

// =========================
// SEND SMS
// =========================
export const sendSMS = async ({
  to,
  message
}) => {

  try {

    await smsClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to
    })

  } catch (err) {

    console.error('SMS error:', err.message)

  }
}