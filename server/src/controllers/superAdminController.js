import User from '../models/User.js'
import Staff from '../models/Staff.js'
import Vendor from '../models/vendorModel.js'

// Get ALL users across the platform
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update user (role, status, etc.)
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body
    const updates = {}
    if (name) updates.name = name
    if (email) updates.email = email
    if (role) updates.role = role
    if (isActive !== undefined) updates.isActive = isActive

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Ban user (set isActive to false)
export const banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User banned', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Activate user
export const activateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true }).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User activated', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get platform stats
export const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalStaff = await Staff.countDocuments()
    const totalVendors = await Vendor.countDocuments()
    const activeUsers = await User.countDocuments({ isActive: true })
    const bannedUsers = await User.countDocuments({ isActive: false })

    res.json({
      totalUsers,
      totalStaff,
      totalVendors,
      activeUsers,
      bannedUsers
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}