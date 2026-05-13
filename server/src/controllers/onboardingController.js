import bcrypt from 'bcryptjs'

import Tenant from '../models/Tenant.js'
import User from '../models/User.js'
import Subscription from '../models/Subscription.js'

import generateToken
from '../utils/generateToken.js'

// =========================
// COMPANY SIGNUP
// =========================
export const onboardCompany =
  async (req, res) => {

    try {

      const {
        companyName,
        email,
        password,
        ownerName
      } = req.body

      // =========================
      // CHECK EXISTING
      // =========================
      const existingTenant =
        await Tenant.findOne({ email })

      if (existingTenant) {

        return res.status(400).json({
          message: 'Company already exists'
        })

      }

      // =========================
      // CREATE TENANT
      // =========================
      const tenant =
        await Tenant.create({

          name: companyName,

          email,

          plan: 'free'

        })

      // =========================
      // HASH PASSWORD
      // =========================
      const salt =
        await bcrypt.genSalt(10)

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        )

      // =========================
      // CREATE ADMIN USER
      // =========================
      const user =
        await User.create({

          name: ownerName,

          email,

          password: hashedPassword,

          role: 'admin',

          tenantId: tenant._id

        })

      // =========================
      // CREATE TRIAL SUBSCRIPTION
      // =========================
      await Subscription.create({

        tenantId: tenant._id,

        plan: 'free',

        status: 'active',

        amount: 0,

        nextBillingDate:
          new Date(
            Date.now() +
            14 * 24 * 60 * 60 * 1000
          )

      })

      // =========================
      // JWT TOKEN
      // =========================
      const token =
        generateToken(user._id)

      res.status(201).json({

        token,

        tenantId: tenant._id,

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role

        }

      })

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }
  }