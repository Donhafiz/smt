import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const resetPassword = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('✅ MongoDB connected')

  const hashedPassword = await bcrypt.hash('staff123', 10)
  
  const result = await mongoose.connection.db.collection('staffs').updateOne(
    { staffId: 'SMT-260004' },
    { $set: { password: hashedPassword } }
  )

  console.log('✅ Password reset to: staff123')
  console.log('Updated:', result.modifiedCount, 'staff member(s)')
  
  process.exit(0)
}

resetPassword().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})