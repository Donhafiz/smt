import Staff from '../models/Staff.js'
import crypto from 'crypto'

// Import email service at the top
let sendWelcomeEmail = null
try {
  const emailModule = await import('../services/emailService.js')
  sendWelcomeEmail = emailModule.sendWelcomeEmail
} catch (err) {
  console.log('Email service not available:', err.message)
}

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({ tenantId: req.tenantId || 'default-tenant' }).select('-password')
    res.json(staff)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createStaff = async (req, res) => {
  try {
    const count = await Staff.countDocuments()
    const year = new Date().getFullYear().toString().slice(-2)
    const staffId = `SMT-${year}${String(count + 1).padStart(4, '0')}`
    const tempPassword = crypto.randomBytes(4).toString('hex')

    const staff = await Staff.create({
      ...req.body,
      staffId,
      idCardNumber: `SMT-ID-${staffId}`,
      password: tempPassword,
      tenantId: req.tenantId || 'default-tenant'
    })

    // Send welcome email if email service is available
    if (sendWelcomeEmail && staff.email) {
      sendWelcomeEmail(staff.email, staff.name, staff.staffId, tempPassword).catch(err =>
        console.error('Email send failed:', err.message)
      )
    }

    res.status(201).json({
      staff: { ...staff.toObject(), password: undefined },
      credentials: { staffId, email: req.body.email, temporaryPassword: tempPassword }
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const updateStaff = async (req, res) => {
  try {
    delete req.body.password
    delete req.body.staffId
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
    res.json(staff)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const grantAccess = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, { canLogin: true }, { new: true }).select('-password')
    res.json({ message: 'Access granted', staff })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const revokeAccess = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, { canLogin: false }, { new: true }).select('-password')
    res.json({ message: 'Access revoked', staff })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const tempPassword = crypto.randomBytes(4).toString('hex')
    const staff = await Staff.findById(req.params.id)
    staff.password = tempPassword
    await staff.save()
    res.json({ message: 'Password reset', temporaryPassword: tempPassword })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const generateIdCard = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, { idCardGenerated: true }, { new: true }).select('-password')
    res.json({ message: 'ID Card generated', staff })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}