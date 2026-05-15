import Subscription from '../models/Subscription.js'

const plans = {
  free: { name: 'Free', price: 0, features: ['5 Products', '1 Course', 'Basic Support', 'Community Access'] },
  starter: { name: 'Starter', price: 99, features: ['25 Products', '5 Courses', 'Email Support', 'Basic Analytics', '1 Staff Account'] },
  pro: { name: 'Professional', price: 299, features: ['Unlimited Products', 'Unlimited Courses', 'Priority Support', 'Advanced Analytics', '10 Staff Accounts', 'AI Features', 'Custom Domain'] },
  enterprise: { name: 'Enterprise', price: 999, features: ['Everything in Pro', 'Unlimited Staff', 'Dedicated Support', 'Custom Integrations', 'SLA Guarantee', 'White Labeling', 'API Access', 'SSO Authentication'] }
}

export const getPlans = async (req, res) => {
  try {
    res.json(plans)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getSubscription = async (req, res) => {
  try {
    let sub = await Subscription.findOne({ tenantId: req.tenantId || 'default-tenant' })
    if (!sub) {
      sub = await Subscription.create({ tenantId: req.tenantId || 'default-tenant', plan: 'free', status: 'trial', trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) })
    }
    res.json({ ...sub.toObject(), planDetails: plans[sub.plan] })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const upgradeSubscription = async (req, res) => {
  try {
    const { plan, billingCycle } = req.body
    if (!plans[plan]) return res.status(400).json({ message: 'Invalid plan' })

    let sub = await Subscription.findOne({ tenantId: req.tenantId || 'default-tenant' })
    if (!sub) {
      sub = new Subscription({ tenantId: req.tenantId || 'default-tenant' })
    }

    sub.plan = plan
    sub.price = plans[plan].price
    sub.status = 'active'
    sub.billingCycle = billingCycle || 'monthly'
    sub.startDate = new Date()
    
    const monthsToAdd = billingCycle === 'yearly' ? 12 : 1
    sub.endDate = new Date(Date.now() + monthsToAdd * 30 * 24 * 60 * 60 * 1000)

    sub.paymentHistory.push({
      amount: plans[plan].price,
      date: new Date(),
      method: 'card',
      status: 'completed',
      transactionId: 'TXN-' + Date.now()
    })

    await sub.save()
    res.json({ ...sub.toObject(), planDetails: plans[plan] })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const cancelSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findOne({ tenantId: req.tenantId || 'default-tenant' })
    if (!sub) return res.status(404).json({ message: 'No subscription found' })
    sub.status = 'cancelled'
    sub.autoRenew = false
    await sub.save()
    res.json(sub)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const getPaymentHistory = async (req, res) => {
  try {
    const sub = await Subscription.findOne({ tenantId: req.tenantId || 'default-tenant' })
    res.json(sub?.paymentHistory || [])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find()
    const enriched = subs.map(sub => ({ ...sub.toObject(), planDetails: plans[sub.plan] }))
    res.json(enriched)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ ...sub.toObject(), planDetails: plans[sub.plan] })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteSubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id)
    res.json({ message: 'Subscription deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export { plans }