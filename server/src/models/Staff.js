import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const staffSchema = new mongoose.Schema({
  // Unique Staff ID
  staffId: { 
    type: String, 
    unique: true 
  },
  
  // Personal Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  
  // Profile
  photo: { type: String, default: '' },
  bio: { type: String, default: '' },
  
  // Work Info
  role: { type: String, required: true },
  department: { type: String },
  designation: { type: String },
  employeeType: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Contract', 'Intern'],
    default: 'Full-time'
  },
  joiningDate: { type: Date, default: Date.now },
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    country: { type: String, default: 'Ghana' }
  },
  
  // Emergency Contact
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  
  // Education & Skills
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  skills: [String],
  
  // Account
  password: { type: String },
  isActive: { type: Boolean, default: true },
  canLogin: { type: Boolean, default: false },
  
  // ID Card
  idCardGenerated: { type: Boolean, default: false },
  idCardNumber: { type: String },
  
  // Attendance & Performance
  attendance: [{
    date: Date,
    status: { type: String, enum: ['Present', 'Absent', 'Late', 'Half-day'] },
    checkIn: Date,
    checkOut: Date
  }],
  
  // System
  tenantId: { type: String, default: 'default-tenant' },
  lastLogin: { type: Date }
}, { timestamps: true })

// Generate unique staff ID before saving
staffSchema.pre('save', async function(next) {
  if (!this.staffId) {
    const count = await mongoose.model('Staff').countDocuments()
    const year = new Date().getFullYear().toString().slice(-2)
    this.staffId = `SMT-${year}${String(count + 1).padStart(4, '0')}`
  }
  if (!this.idCardNumber) {
    this.idCardNumber = `SMT-ID-${this.staffId}`
  }
  next()
})

// Hash password before saving
staffSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

// Compare password method
staffSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('Staff', staffSchema)