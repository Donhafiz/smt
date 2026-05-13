import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'

// ================================
// REGISTER
// ================================
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'admin',
      tenantId: 'default-tenant' // You might want to generate this dynamically
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

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
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