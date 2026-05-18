import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const staffSchema = new mongoose.Schema({
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
  
  staffId: { type: String, unique: true, sparse: true },
  idCardNumber: { type: String },
  idCardGenerated: { type: Boolean, default: false },
  
  password: { type: String },
  isActive: { type: Boolean, default: true },
  canLogin: { type: Boolean, default: false },
  lastLogin: { type: Date },
  
  designation: { type: String },
  employeeType: { type: String, default: 'Full-time' },
  joiningDate: { type: Date, default: Date.now },
  dateOfBirth: { type: Date },
  gender: { type: String },
  bio: { type: String, default: '' },
  
  address: { street: String, city: String, state: String, country: { type: String, default: 'Ghana' } },
  emergencyContact: { name: String, relation: String, phone: String },
  
  education: [{ degree: String, institution: String, year: Number }],
  skills: [String],
  
  attendance: [{ date: Date, status: String, checkIn: Date, checkOut: Date }],
  
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
  
  // ✅ Hash password if modified
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  
  next()
})

staffSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const Staff = mongoose.models.Staff || mongoose.model('Staff', staffSchema)

export default Staff