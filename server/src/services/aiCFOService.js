import Order from '../models/Order.js'

export const askBusinessAI = async (question) => {

  const orders = await Order.find()

  const revenue = orders.reduce((s, o) => s + o.total, 0)

  // SIMPLE NLP LOGIC (upgrade later to OpenAI fine-tune)
  if (question.includes('revenue')) {
    return `Total revenue is GHS ${revenue}`
  }

  if (question.includes('performance')) {
    return revenue > 5000
      ? 'Business is performing strongly'
      : 'Business performance is below expectation'
  }

  if (question.includes('stock')) {
    return 'Check inventory dashboard for low stock alerts'
  }

  return "I don't have enough data for that question yet."
}