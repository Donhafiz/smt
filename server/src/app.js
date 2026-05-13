import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

// routes
import routes from './routes/index.js'
import servicesRoutes from './routes/services.js'
import staffRoutes from './routes/staffRoutes.js'
import authRoutes from './routes/authRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import paystackRoutes from './routes/paystackRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'
import walletRoutes from './routes/walletRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import deliveryRoutes from './routes/deliveryRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import billingRoutes from './routes/billingRoutes.js'
import forecastRoutes from './routes/forecastRoutes.js'
import paystackWebhookRoutes from './routes/paystackWebhookRoutes.js'
import superAdminRoutes from './routes/superAdminRoutes.js'
import onboardingRoutes from './routes/onboardingRoutes.js'
import auditRoutes from './routes/auditRoutes.js'
import aiAdvisorRoutes from './routes/aiAdvisorRoutes.js'
import restockRoutes from './routes/restockRoutes.js'
import webhookRoutes from './routes/webhookRoutes.js'

// middleware
import { attachTenant, attachBranding } from './middleware/tenantMiddleware.js'
import errorHandler from './middleware/errorHandler.js'
import { protect } from './middleware/authMiddleware.js'

const app = express()

// ========================
// CORE MIDDLEWARE
// ========================
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// AUTH + TENANT (ORDER MATTERS)
app.use(protect)
app.use(attachTenant)
app.use(attachBranding)

// ========================
// ROUTES
// ========================
app.use('/api', routes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/paystack', paystackRoutes)
app.use('/api/vendor', vendorRoutes)
app.use('/api/wallet', walletRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/deliveries', deliveryRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/billing', billingRoutes)
app.use('/api/forecast', forecastRoutes)
app.use('/api/webhook', paystackWebhookRoutes)
app.use('/api/superadmin', superAdminRoutes)
app.use('/api/onboarding', onboardingRoutes)
app.use('/api/audit', auditRoutes)
app.use('/api/ai-advisor', aiAdvisorRoutes)
app.use('/api/restock', restockRoutes)
app.use('/api/webhooks', webhookRoutes)

// ========================
// HEALTH CHECK
// ========================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  })
})

// ========================
// ERROR HANDLER
// ========================
app.use(errorHandler)

export default app