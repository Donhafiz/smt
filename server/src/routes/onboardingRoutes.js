import express from 'express'

import {
  onboardCompany
} from '../controllers/onboardingController.js'

const router = express.Router()

router.post(
  '/company-signup',
  onboardCompany
)

export default router