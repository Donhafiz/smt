import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'

// ================================
// REGISTER
// ================================
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Only allow 'user' role on registration (admins must be created by superadmin)
    const allowedRoles = ['user', 'student', 'customer']
    const safeRole = allowedRoles.includes(role) ? role : 'user'

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: safeRole,
      tenantId: 'default-tenant'
    })

    const token = generateToken(user)

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId
      },
      token
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ================================
// LOGIN
// ================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check if user is active
    if (user.isActive === false) {
      return res.status(401).json({ message: 'Account is deactivated. Contact support.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user)

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId
      },
      token
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}