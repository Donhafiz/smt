import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import Product from './src/models/Product.js'
import Course from './src/models/Course.js'

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('✅ MongoDB connected')

  // Seed Products
  await Product.deleteMany({})
  await Product.insertMany([
    { name: 'MacBook Pro M3', category: 'Laptops', price: 12500, stock: 15, description: 'Apple MacBook Pro with M3 chip', tenantId: 'default-tenant' },
    { name: 'iPhone 15 Pro', category: 'Phones', price: 8500, stock: 23, description: 'Apple iPhone 15 Pro 256GB', tenantId: 'default-tenant' },
    { name: 'Sony WH-1000XM5', category: 'Accessories', price: 2200, stock: 40, description: 'Premium noise-canceling headphones', tenantId: 'default-tenant' },
    { name: 'Samsung Galaxy Watch 6', category: 'Smart Devices', price: 1800, stock: 18, description: 'Smart watch with health tracking', tenantId: 'default-tenant' },
    { name: 'Dell XPS 15', category: 'Laptops', price: 9800, stock: 10, description: 'Dell XPS 15 laptop', tenantId: 'default-tenant' },
  ])
  console.log('✅ Products seeded')

  // Seed Courses
  await Course.deleteMany({})
  await Course.insertMany([
    { title: 'Web Development Bootcamp', category: 'Web Development', price: 1500, duration: '12 weeks', level: 'Beginner', instructor: 'Mr. Hafiz', description: 'Learn HTML, CSS, JavaScript, and React from scratch.', tenantId: 'default-tenant' },
    { title: 'Mobile App Development', category: 'Mobile', price: 2000, duration: '10 weeks', level: 'Intermediate', instructor: 'Ms. Ama', description: 'Build iOS and Android apps with Flutter.', tenantId: 'default-tenant' },
    { title: 'Cybersecurity Essentials', category: 'Cybersecurity', price: 2500, duration: '8 weeks', level: 'Intermediate', instructor: 'Mr. Kwame', description: 'Learn network security, ethical hacking, and defense strategies.', tenantId: 'default-tenant' },
    { title: 'Data Analysis with Python', category: 'Data Analysis', price: 1800, duration: '10 weeks', level: 'Beginner', instructor: 'Ms. Efua', description: 'Master data analysis using Python, Pandas, and visualization tools.', tenantId: 'default-tenant' },
  ])
  console.log('✅ Courses seeded')

  console.log('🎉 Seed complete!')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed error:', err)
  process.exit(1)
})