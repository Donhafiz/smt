import express from 'express'
import { forecastRevenue } from '../controllers/forecastController.js'

const router = express.Router()

router.get('/revenue', forecastRevenue)

export default router