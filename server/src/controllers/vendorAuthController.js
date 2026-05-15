import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Vendor from '../models/vendorModel.js'

const generateToken = (id) => {
  return jwt.sign({ id, type: 'vendor' }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

/* REGISTER */
export const registerVendor = async (req, res) => {
  try {
    const { name, businessName, storeName, ownerName, email, phone, password } = req.body

    const vendorName = businessName || storeName || name || 'Vendor'
    const contactName = ownerName || name || 'Owner'

    const exists = await Vendor.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Vendor with this email already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const vendor = await Vendor.create({
      businessName: vendorName,
      ownerName: contactName,
      email,
      phone: phone || '',
      password: hashed,
      tenantId: 'default-tenant'
    })

    res.status(201).json({
      vendor: {
        _id: vendor._id,
        businessName: vendor.businessName,
        ownerName: vendor.ownerName,
        email: vendor.email
      },
      token: generateToken(vendor._id)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/* LOGIN */
export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body

    const vendor = await Vendor.findOne({ email })
    if (!vendor) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, vendor.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.json({
      vendor: {
        _id: vendor._id,
        businessName: vendor.businessName,
        ownerName: vendor.ownerName,
        email: vendor.email,
        approved: vendor.approved
      },
      token: generateToken(vendor._id)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}