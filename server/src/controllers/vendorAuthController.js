import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Vendor from '../models/vendorModel.js'

const generateToken = id => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  )

}

/* REGISTER */
export const registerVendor = async (req, res) => {

  try {

    const {
      businessName,
      ownerName,
      email,
      password
    } = req.body

    const exists =
      await Vendor.findOne({ email })

    if (exists) {

      return res.status(400).json({
        message: 'Vendor already exists'
      })

    }

    const hashed =
      await bcrypt.hash(password, 10)

    const vendor =
      await Vendor.create({

        businessName,
        ownerName,
        email,
        password: hashed

      })

    res.status(201).json({

      _id: vendor._id,

      businessName:
        vendor.businessName,

      token:
        generateToken(vendor._id)

    })

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

}

/* LOGIN */
export const loginVendor = async (req, res) => {

  try {

    const { email, password } = req.body

    const vendor =
      await Vendor.findOne({ email })

    if (
      vendor &&
      (await bcrypt.compare(
        password,
        vendor.password
      ))
    ) {

      res.json({

        _id: vendor._id,

        businessName:
          vendor.businessName,

        approved:
          vendor.approved,

        token:
          generateToken(vendor._id)

      })

    } else {

      res.status(401).json({
        message: 'Invalid credentials'
      })

    }

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }

}