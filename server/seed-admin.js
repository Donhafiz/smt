import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected')

    // Check if admin already exists
    const existingAdmin = await mongoose.connection.db
      .collection('users')
      .findOne({ email: 'admin@smt.com' })

    if (existingAdmin) {
      console.log('⚠️  Admin already exists, updating password...')
      
      const hashedPassword = await bcrypt.hash('Admin123!', 10)
      
      await mongoose.connection.db.collection('users').updateOne(
        { email: 'admin@smt.com' },
        { 
          $set: { 
            password: hashedPassword,
            role: 'admin',
            isActive: true
          } 
        }
      )
      
      console.log('✅ Admin password updated')
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash('Admin123!', 10)
      
      await mongoose.connection.db.collection('users').insertOne({
        name: 'Super Admin',
        email: 'admin@smt.com',
        password: hashedPassword,
        role: 'admin',
        tenantId: 'default-tenant',
        profileImage: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      console.log('✅ Admin created')
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 Email:    admin@smt.com')
    console.log('🔑 Password: Admin123!')
    console.log('👤 Role:     admin')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

seedAdmin()