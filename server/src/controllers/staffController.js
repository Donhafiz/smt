import Staff from '../models/Staff.js'
import crypto from 'crypto'

// GET all staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({ tenantId: req.tenantId || 'default-tenant' }).select('-password')
    res.json(staff)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// CREATE staff with auto-generated credentials
export const createStaff = async (req, res) => {
  try {
    // Generate temporary password
    const tempPassword = crypto.randomBytes(4).toString('hex')

    const staff = await Staff.create({
      ...req.body,
      password: tempPassword,
      tenantId: req.tenantId || 'default-tenant',
      canLogin: req.body.canLogin || false
    })

    const credentials = {
      staffId: staff.staffId,
      email: staff.email,
      temporaryPassword: tempPassword
    }

    res.status(201).json({ staff, credentials })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// UPDATE staff
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password')
    res.json(staff)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// DELETE staff
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Grant login access
export const grantAccess = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { canLogin: true },
      { new: true }
    ).select('-password')
    res.json({ message: 'Access granted', staff })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Revoke login access
export const revokeAccess = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { canLogin: false },
      { new: true }
    ).select('-password')
    res.json({ message: 'Access revoked', staff })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Reset password
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

// Generate ID Card
export const generateIdCard = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { idCardGenerated: true },
      { new: true }
    ).select('-password')
    res.json({ message: 'ID Card generated', staff })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}