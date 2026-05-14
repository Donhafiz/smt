import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const staffSchema = new mongoose.Schema({
  // Core fields (compatible with old data)
  name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, sparse: true },
  phone: { type: String, default: '' },
  role: { type: String, default: 'Staff' },
  department: { type: String, default: 'General' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  photo: { type: String, default: '' },
  
  // Staff ID System
  staffId: { type: String, unique: true, sparse: true },
  idCardNumber: { type: String },
  idCardGenerated: { type: Boolean, default: false },
  
  // Account
  password: { type: String },
  isActive: { type: Boolean, default: true },
  canLogin: { type: Boolean, default: false },
  lastLogin: { type: Date },
  
  // Work
  designation: { type: String },
  employeeType: { type: String, default: 'Full-time' },
  joiningDate: { type: Date, default: Date.now },
  dateOfBirth: { type: Date },
  gender: { type: String },
  bio: { type: String, default: '' },
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    country: { type: String, default: 'Ghana' }
  },
  
  // Emergency
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  
  // Education
  education: [{ degree: String, institution: String, year: Number }],
  skills: [String],
  
  // Attendance
  attendance: [{
    date: Date,
    status: String,
    checkIn: Date,
    checkOut: Date
  }],
  
  // System
  tenantId: { type: String, default: 'default-tenant' }
}, { timestamps: true })

// Generate staff ID before saving
staffSchema.pre('save', async function(next) {
  if (!this.staffId) {
    const count = await mongoose.model('Staff').countDocuments()
    const year = new Date().getFullYear().toString().slice(-2)
    this.staffId = `SMT-${year}${String(count + 1).padStart(4, '0')}`
  }
  if (!this.idCardNumber) {
    this.idCardNumber = `SMT-ID-${this.staffId}`
  }
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

staffSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Use existing model or create new one
const Staff = mongoose.models.Staff || mongoose.model('Staff', staffSchema)

export default Staff