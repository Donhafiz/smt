import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Staff from '../models/Staff.js'

// =========================
// AUTH PROTECT MIDDLEWARE
// =========================
export const protect = async (req, res, next) => {
  try {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, no token'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check if it's a staff token or regular user token
    if (decoded.type === 'staff') {
      req.user = await Staff.findById(decoded.id).select('-password')
    } else {
      req.user = await User.findById(decoded.id).select('-password')
    }

    if (!req.user) {
      return res.status(401).json({
        message: 'User not found'
      })
    }

    next()

  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized',
      error: err.message
    })
  }
}