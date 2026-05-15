import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const updateImages = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('✅ Connected')

  const images = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80',
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    'https://images.unsplash.com/photo-1696434303191-2bd15866cc3b?w=600&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
    'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&q=80',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
    'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=600&q=80',
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80',
  ]

  const allProducts = await mongoose.connection.db.collection('products').find({}).toArray()
  
  for (let i = 0; i < allProducts.length; i++) {
    await mongoose.connection.db.collection('products').updateOne(
      { _id: allProducts[i]._id },
      { $set: { image: images[i] || '' } }
    )
  }

  console.log('✅ All', allProducts.length, 'products now have images!')
  process.exit(0)
}

updateImages().catch(err => {
  console.error(err.message)
  process.exit(1)
})