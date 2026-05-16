import Staff from '../models/Staff.js'
import crypto from 'crypto'

// ========================
// GET ALL STAFF
// ========================
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({ tenantId: req.tenantId || 'default-tenant' }).select('-password')
    res.json(staff)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ========================
// CREATE STAFF (with welcome email)
// ========================
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

    // Send welcome email (dynamic import, fails silently)
    if (staff.email && tempPassword) {
      import('../services/emailService.js')
        .then(m => m.sendWelcomeEmail(staff.email, staff.name, staff.staffId, tempPassword))
        .catch(err => console.error('Welcome email failed:', err.message))
    }

    res.status(201).json({
      staff: { ...staff.toObject(), password: undefined },
      credentials: { staffId, email: req.body.email, temporaryPassword: tempPassword }
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// ========================
// UPDATE STAFF
// ========================
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

// ========================
// DELETE STAFF
// ========================
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ========================
// GRANT LOGIN ACCESS
// ========================
export const grantAccess = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, { canLogin: true }, { new: true }).select('-password')
    res.json({ message: 'Access granted', staff })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ========================
// REVOKE LOGIN ACCESS
// ========================
export const revokeAccess = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, { canLogin: false }, { new: true }).select('-password')
    res.json({ message: 'Access revoked', staff })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ========================
// RESET PASSWORD (with email)
// ========================
export const resetPassword = async (req, res) => {
  try {
    const tempPassword = crypto.randomBytes(4).toString('hex')
    const staff = await Staff.findById(req.params.id)
    staff.password = tempPassword
    await staff.save()

    // Send password reset email
    if (staff.email) {
      import('../services/emailService.js')
        .then(m => m.sendWelcomeEmail(staff.email, staff.name, staff.staffId, tempPassword))
        .catch(err => console.error('Password reset email failed:', err.message))
    }

    res.json({ message: 'Password reset', temporaryPassword: tempPassword })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// ========================
// GENERATE ID CARD
// ========================
export const generateIdCard = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, { idCardGenerated: true }, { new: true }).select('-password')
    res.json({ message: 'ID Card generated', staff })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}