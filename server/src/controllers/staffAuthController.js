import Staff from '../models/Staff.js'
import jwt from 'jsonwebtoken'

// Generate JWT
const generateToken = (staff) => {
  return jwt.sign(
    { id: staff._id, staffId: staff.staffId, type: 'staff' },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}

// Staff Login
export const staffLogin = async (req, res) => {
  try {
    const { staffId, email, password } = req.body

    if ((!staffId && !email) || !password) {
      return res.status(400).json({ message: 'Please provide staff ID or email and password' })
    }

    // Find staff by staffId or email
    const query = staffId ? { staffId } : { email }
    const staff = await Staff.findOne(query)

    if (!staff) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    if (!staff.canLogin) {
      return res.status(403).json({ message: 'Account not activated. Contact admin.' })
    }

    if (!staff.isActive) {
      return res.status(403).json({ message: 'Account deactivated.' })
    }

    const isMatch = await staff.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Update last login
    staff.lastLogin = new Date()
    await staff.save()

    const token = generateToken(staff)

    res.json({
      staff: {
        id: staff._id,
        staffId: staff.staffId,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        role: staff.role,
        department: staff.department,
        photo: staff.photo
      },
      token
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get Staff Profile
export const getStaffProfile = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id).select('-password')
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' })
    }
    res.json(staff)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update Staff Profile
export const updateStaffProfile = async (req, res) => {
  try {
    const updates = req.body
    delete updates.password // Don't allow direct password update
    delete updates.staffId
    delete updates.canLogin

    const staff = await Staff.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select('-password')

    res.json(staff)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const staff = await Staff.findById(req.user.id)

    const isMatch = await staff.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' })
    }

    staff.password = newPassword
    await staff.save()

    res.json({ message: 'Password changed successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Mark Attendance
export const markAttendance = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingAttendance = staff.attendance.find(a => {
      const aDate = new Date(a.date)
      aDate.setHours(0, 0, 0, 0)
      return aDate.getTime() === today.getTime()
    })

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked for today' })
    }

    staff.attendance.push({
      date: new Date(),
      status: 'Present',
      checkIn: new Date()
    })

    await staff.save()
    res.json({ message: 'Attendance marked successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}