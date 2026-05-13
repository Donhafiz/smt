getIO().emit('payment-success', {
  message: '💳 Payment completed successfully'
})

await sendEmail({

  to: order.customerEmail,

  subject: '💳 Payment Receipt',

  html: `
    <div style="font-family: Arial; padding: 20px;">

      <h2>Payment Successful</h2>

      <p>
        Your payment has been confirmed.
      </p>

      <h3>Amount Paid: GHS ${order.total}</h3>

      <p>
        Reference: ${order._id}
      </p>

    </div>
  `
})