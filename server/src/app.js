import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import errorHandler from './middleware/errorHandler.js'

// Routes
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
import courseRoutes from './routes/courseRoutes.js'
import aiRequestRoutes from './routes/aiRequestRoutes.js'
import aiChatRoutes from './routes/aiChatRoutes.js'
import productRoutes from './routes/productRoutes.js'
import staffPortalRoutes from './routes/staffPortalRoutes.js'

// In public routes:
app.use('/api/staff-portal', staffPortalRoutes)
const app = express()

// CORE MIDDLEWARE
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// PUBLIC ENDPOINTS
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// PUBLIC ROUTES (NO AUTH)
app.use('/api/auth', authRoutes)
app.use('/api/webhook', paystackWebhookRoutes)
app.use('/api/webhooks', webhookRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/ai-requests', aiRequestRoutes)
app.use('/api/ai-chat', aiChatRoutes)

// PROTECTED ROUTES (AUTH REQUIRED — NO TENANT MIDDLEWARE)
import { protect } from './middleware/authMiddleware.js'

app.use('/api', protect, routes)
app.use('/api/analytics', protect, analyticsRoutes)
app.use('/api/services', protect, servicesRoutes)
app.use('/api/staff', protect, staffRoutes)
app.use('/api/orders', protect, orderRoutes)
app.use('/api/products', protect, productRoutes)
app.use('/api/paystack', protect, paystackRoutes)
app.use('/api/vendor', protect, vendorRoutes)
app.use('/api/wallet', protect, walletRoutes)
app.use('/api/transactions', protect, transactionRoutes)
app.use('/api/deliveries', protect, deliveryRoutes)
app.use('/api/ai', protect, aiRoutes)
app.use('/api/billing', protect, billingRoutes)
app.use('/api/forecast', protect, forecastRoutes)
app.use('/api/superadmin', protect, superAdminRoutes)
app.use('/api/onboarding', protect, onboardingRoutes)
app.use('/api/audit', protect, auditRoutes)
app.use('/api/ai-advisor', protect, aiAdvisorRoutes)
app.use('/api/restock', protect, restockRoutes)

// ERROR HANDLER
app.use(errorHandler)

export default app