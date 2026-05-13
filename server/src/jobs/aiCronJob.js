import cron from 'node-cron'
import Tenant from '../models/Tenant.js'
import { runAutonomousAI } from '../services/autonomousAI.js'

export const startAICronJob = () => {

  cron.schedule('*/10 * * * *', async () => {
    try {

      console.log('🧠 Running AI business cycle...')

      // Get all tenants (multi-tenant SaaS execution)
      const tenants = await Tenant.find()

      for (const tenant of tenants) {

        await runAutonomousAI(tenant._id)

      }

      console.log('✅ AI cycle completed')

    } catch (err) {
      console.error('❌ AI cron error:', err.message)
    }

  })

}