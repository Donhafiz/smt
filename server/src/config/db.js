import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`)
    // Don't crash the server — let it run without DB for now
    console.log('⚠️  Server running without database')
  }
}

export default connectDB