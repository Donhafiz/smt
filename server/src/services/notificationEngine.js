import { sendEmail, sendSMS } from './notificationService.js'

// =========================
// CENTRAL NOTIFICATION ROUTER
// =========================
export const notify = async ({
  type,
  channel,
  to,
  subject,
  message,
  html
}) => {

  try {

    // =========================
    // EMAIL CHANNEL
    // =========================
    if (channel === 'email') {

      await sendEmail({
        to,
        subject,
        html: html || `<p>${message}</p>`
      })

    }

    // =========================
    // SMS CHANNEL
    // =========================
    if (channel === 'sms') {

      await sendSMS({
        to,
        message
      })

    }

    // =========================
    // BOTH CHANNELS
    // =========================
    if (channel === 'both') {

      await sendEmail({
        to,
        subject,
        html: html || `<p>${message}</p>`
      })

      await sendSMS({
        to,
        message
      })

    }

  } catch (err) {

    console.error('Notification Engine Error:', err.message)

  }
}