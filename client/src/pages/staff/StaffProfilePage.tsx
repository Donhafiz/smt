import { useState, useEffect, useRef } from 'react'
import api from '../../lib/axios'
import { motion } from 'framer-motion'
import { 
  Save, Camera, User, Upload, X, Check,
  Mail, Phone, MapPin, Briefcase, Calendar,
  GraduationCap, Star, Award, BookOpen,
  Heart, Shield, Edit3, Trash2, Plus,
  ChevronDown, ChevronUp, Building, Flag,
  AlertCircle, Sparkles
} from 'lucide-react'

interface Education {
  degree: string
  institution: string
  year: number
}

interface Profile {
  name: string
  email: string
  phone: string
  department: string
  role: string
  staffId: string
  photo: string
  bio: string
  designation: string
  employeeType: string
  joiningDate: string
  dateOfBirth: string
  gender: string
  address: {
    street: string
    city: string
    state: string
    country: string
  }
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  education: Education[]
  skills: string[]
}

export default function StaffProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('personal')
  const [uploading, setUploading] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('staffToken')
      const res = await api.get('/staff-portal/profile', { headers: { Authorization: `Bearer ${token}` } })
      setProfile(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('staffToken')
      await api.put('/staff-portal/profile', profile, { headers: { Authorization: `Bearer ${token}` } })
      setMessage('Profile updated successfully! ✨')
      setTimeout(() => setMessage(''), 4000)
    } catch (err) {
      setMessage('Failed to update. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image too large. Max 5MB allowed.')
      return
    }

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const photoUrl = event.target?.result as string
        setProfile((prev: any) => ({ ...prev, photo: photoUrl }))
        
        // Save immediately
        const token = localStorage.getItem('staffToken')
        await api.put('/staff-portal/profile', { photo: photoUrl }, { headers: { Authorization: `Bearer ${token}` } })
        setMessage('Photo updated! 📸')
        setTimeout(() => setMessage(''), 3000)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && profile) {
      setProfile({
        ...profile,
        skills: [...(profile.skills || []), newSkill.trim()]
      })
      setNewSkill('')
    }
  }

  const removeSkill = (index: number) => {
    if (profile) {
      setProfile({
        ...profile,
        skills: profile.skills.filter((_, i) => i !== index)
      })
    }
  }

  const addEducation = () => {
    if (profile) {
      setProfile({
        ...profile,
        education: [...(profile.education || []), { degree: '', institution: '', year: new Date().getFullYear() }]
      })
    }
  }

  const removeEducation = (index: number) => {
    if (profile) {
      setProfile({
        ...profile,
        education: profile.education.filter((_, i) => i !== index)
      })
    }
  }

  const updateEducation = (index: number, field: string, value: any) => {
    if (profile) {
      const updated = [...profile.education]
      updated[index] = { ...updated[index], [field]: value }
      setProfile({ ...profile, education: updated })
    }
  }

  const tabs = [
    { id: 'personal', label: 'Personal', icon: <User size={16} /> },
    { id: 'work', label: 'Work', icon: <Briefcase size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={16} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Star size={16} /> },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-4 border-cyan-500/30 border-t-cyan-400" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          My Profile
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          Save Changes
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-sm flex items-center gap-2 ${
            message.includes('success') || message.includes('Photo') || message.includes('updated')
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
          {message.includes('success') || message.includes('Photo') || message.includes('updated') 
            ? <Check size={16} /> : <AlertCircle size={16} />}
          {message}
        </motion.div>
      )}

      {/* Photo & Basic Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          {/* Photo Upload */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center overflow-hidden ring-4 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all">
              {profile?.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={44} className="text-white/80" />
              )}
            </div>
            
            {/* Upload button overlay */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            >
              <div className="text-center">
                <Camera size={24} className="text-white mx-auto mb-1" />
                <span className="text-white text-xs">Change Photo</span>
              </div>
            </button>

            {/* Uploading indicator */}
            {uploading && (
              <div className="absolute inset-0 rounded-2xl bg-black/80 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile?.name || 'Your Name'}</h2>
            <p className="text-cyan-400 font-medium">{profile?.staffId}</p>
            <p className="text-gray-400 text-sm">{profile?.role} • {profile?.department}</p>
            <div className="flex items-center gap-2 mt-2">
              <Sparkles size={14} className="text-yellow-400" />
              <span className="text-xs text-gray-500">Profile Strength: 75%</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-white/10 pb-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Personal Tab */}
        {activeTab === 'personal' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Full Name" value={profile?.name || ''} icon={<User size={16} />}
                onChange={val => setProfile({ ...profile!, name: val })} />
              <InputField label="Date of Birth" type="date" value={profile?.dateOfBirth?.split('T')[0] || ''} icon={<Calendar size={16} />}
                onChange={val => setProfile({ ...profile!, dateOfBirth: val })} />
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Gender</label>
                <select
                  value={profile?.gender || ''}
                  onChange={e => setProfile({ ...profile!, gender: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <InputField label="Designation" value={profile?.designation || ''} icon={<Award size={16} />}
                onChange={val => setProfile({ ...profile!, designation: val })} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Bio</label>
              <textarea
                value={profile?.bio || ''}
                onChange={e => setProfile({ ...profile!, bio: e.target.value })}
                rows={3}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </motion.div>
        )}

        {/* Work Tab */}
        {activeTab === 'work' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Role" value={profile?.role || ''} icon={<Briefcase size={16} />} disabled />
              <InputField label="Department" value={profile?.department || ''} icon={<Building size={16} />} disabled />
              <InputField label="Staff ID" value={profile?.staffId || ''} icon={<Award size={16} />} disabled />
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Employee Type</label>
                <select
                  value={profile?.employeeType || ''}
                  onChange={e => setProfile({ ...profile!, employeeType: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              <InputField label="Joining Date" type="date" value={profile?.joiningDate?.split('T')[0] || ''} icon={<Calendar size={16} />} disabled />
            </div>
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h4 className="font-semibold text-white">Personal Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Email" type="email" value={profile?.email || ''} icon={<Mail size={16} />}
                onChange={val => setProfile({ ...profile!, email: val })} />
              <InputField label="Phone" value={profile?.phone || ''} icon={<Phone size={16} />}
                onChange={val => setProfile({ ...profile!, phone: val })} />
            </div>

            <h4 className="font-semibold text-white pt-4">Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Street" value={profile?.address?.street || ''} icon={<MapPin size={16} />}
                onChange={val => setProfile({ ...profile!, address: { ...profile!.address, street: val } })} />
              <InputField label="City" value={profile?.address?.city || ''} icon={<Building size={16} />}
                onChange={val => setProfile({ ...profile!, address: { ...profile!.address, city: val } })} />
              <InputField label="State" value={profile?.address?.state || ''} icon={<Flag size={16} />}
                onChange={val => setProfile({ ...profile!, address: { ...profile!.address, state: val } })} />
              <InputField label="Country" value={profile?.address?.country || 'Ghana'} icon={<Globe size={16} />}
                onChange={val => setProfile({ ...profile!, address: { ...profile!.address, country: val } })} />
            </div>

            <h4 className="font-semibold text-white pt-4">Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Name" value={profile?.emergencyContact?.name || ''} icon={<User size={16} />}
                onChange={val => setProfile({ ...profile!, emergencyContact: { ...profile!.emergencyContact, name: val } })} />
              <InputField label="Relation" value={profile?.emergencyContact?.relation || ''} icon={<Heart size={16} />}
                onChange={val => setProfile({ ...profile!, emergencyContact: { ...profile!.emergencyContact, relation: val } })} />
              <InputField label="Phone" value={profile?.emergencyContact?.phone || ''} icon={<Phone size={16} />}
                onChange={val => setProfile({ ...profile!, emergencyContact: { ...profile!.emergencyContact, phone: val } })} />
            </div>
          </motion.div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {(profile?.education || []).map((edu, i) => (
              <div key={i} className="glass p-4 rounded-xl flex flex-col md:flex-row gap-3 items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                  <input
                    value={edu.degree}
                    onChange={e => updateEducation(i, 'degree', e.target.value)}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
                    placeholder="Degree (e.g., BSc Computer Science)"
                  />
                  <input
                    value={edu.institution}
                    onChange={e => updateEducation(i, 'institution', e.target.value)}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
                    placeholder="Institution"
                  />
                  <input
                    type="number"
                    value={edu.year}
                    onChange={e => updateEducation(i, 'year', parseInt(e.target.value))}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
                    placeholder="Year"
                  />
                </div>
                <button onClick={() => removeEducation(i)} className="p-2.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button onClick={addEducation}
              className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-gray-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-all flex items-center justify-center gap-2">
              <Plus size={16} /> Add Education
            </button>
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
                className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400"
                placeholder="Add a skill (e.g., React, Python, Leadership)"
              />
              <button onClick={addSkill}
                className="px-5 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition-all flex items-center gap-2">
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(profile?.skills || []).map((skill, i) => (
                <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-sm group">
                  {skill}
                  <button onClick={() => removeSkill(i)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={12} className="hover:text-red-400" />
                  </button>
                </span>
              ))}
              {(!profile?.skills || profile.skills.length === 0) && (
                <p className="text-gray-500 text-sm">No skills added yet. Add your technical and soft skills.</p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// Reusable Input Component
function InputField({ label, value, onChange, icon, type = 'text', disabled = false }: {
  label: string
  value: string
  onChange?: (val: string) => void
  icon: React.ReactNode
  type?: string
  disabled?: boolean
}) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1.5 block">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-500">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
            disabled
              ? 'bg-white/[0.02] border border-white/5 text-gray-500 cursor-not-allowed'
              : 'bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400'
          }`}
        />
      </div>
    </div>
  )
}

// Need Globe icon - define it inline
function Globe({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}