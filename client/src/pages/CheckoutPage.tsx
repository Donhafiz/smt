import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import api from '../lib/axios'
import { 
  CreditCard, Truck, Shield, Check, ArrowLeft, MapPin, Phone, Mail, 
  User, Home, Building, Smartphone, Lock, ChevronRight, Star, Clock,
  Package, Gift, BadgeCheck, Sparkles, AlertCircle
} from 'lucide-react'

declare global {
  interface Window {
    PaystackPop: any
  }
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', region: '', deliveryMethod: 'standard',
    paymentMethod: 'momo', deliveryNote: ''
  })

  const delivery = form.deliveryMethod === 'express' ? 100 : total > 5000 ? 0 : 50
  const finalTotal = total + delivery

  // ✅ Validate shipping form
  const validateShipping = () => {
    const newErrors: Record<string, string> = {}
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!form.email.includes('@') || !form.email.includes('.')) newErrors.email = 'Enter a valid email'
    if (!form.phone.trim()) newErrors.phone = 'Phone is required'
    else if (form.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Enter a valid phone number'
    if (!form.address.trim()) newErrors.address = 'Address is required'
    if (!form.city.trim()) newErrors.city = 'City is required'
    if (!form.region.trim()) newErrors.region = 'Region is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ✅ REAL PAYSTACK PAYMENT
  const handlePaystackPayment = () => {
    if (!validateShipping()) {
      setStep(1)
      return
    }

    const handler = window.PaystackPop.setup({
      key: 'pk_live_f494a9f7aa60622b8212549908a6f8dd8ab691c8',
      email: form.email,
      amount: finalTotal * 100,
      currency: 'GHS',
      ref: 'SMT-' + Date.now(),
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'customer_name', value: `${form.firstName} ${form.lastName}` },
          { display_name: 'Phone', variable_name: 'phone', value: form.phone },
          { display_name: 'Address', variable_name: 'address', value: `${form.address}, ${form.city}, ${form.region}` }
        ]
      },
      callback: async function(response: any) {
        try {
          await api.post('/paystack/verify', { reference: response.reference })
          await api.post('/orders', {
            customerName: `${form.firstName} ${form.lastName}`,
            customerEmail: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            region: form.region,
            items: items.map((i: any) => ({ productId: i.product?._id, name: i.product?.name, price: i.product?.price, quantity: i.quantity })),
            total: finalTotal,
            deliveryMethod: form.deliveryMethod,
            paymentReference: response.reference,
            paymentMethod: form.paymentMethod,
            status: 'completed'
          })
          clearCart()
          navigate('/payment-success')
        } catch (err) {
          alert('Payment verification failed. Contact support.')
          setLoading(false)
        }
      },
      onClose: function() {
        setLoading(false)
      }
    })
    handler.openIframe()
  }

  // ✅ MOBILE MONEY PAYMENT
  const handleMobileMoneyPayment = async () => {
    if (!validateShipping()) {
      setStep(1)
      return
    }
    try {
      const res = await api.post('/paystack/initialize', {
        email: form.email,
        amount: finalTotal,
        phone: form.phone,
        paymentMethod: 'momo',
        metadata: {
          customerName: `${form.firstName} ${form.lastName}`,
          items: items.map((i: any) => ({ name: i.product?.name, quantity: i.quantity }))
        }
      })
      if (res.data?.data?.authorization_url) {
        window.location.href = res.data.data.authorization_url
      }
    } catch (err) {
      alert('Payment initialization failed. Please try again.')
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (form.paymentMethod === 'card' || form.paymentMethod === 'bank') {
      handlePaystackPayment()
    } else if (form.paymentMethod === 'momo') {
      handleMobileMoneyPayment()
    }
  }

  const inputClass = (field: string) =>
    `p-3.5 bg-white/5 border rounded-xl text-white focus:outline-none focus:border-cyan-400 w-full transition-all ${
      errors[field] ? 'border-red-500/50 focus:border-red-400' : 'border-white/10'
    }`

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-center">
          <Package size={64} className="mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-white">Cart is empty</h2>
          <button onClick={() => navigate('/shop')} className="mt-4 px-6 py-3 bg-cyan-500 rounded-xl">Go Shopping</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: 'Shipping', icon: <Truck size={16} /> },
            { num: 2, label: 'Payment', icon: <CreditCard size={16} /> },
            { num: 3, label: 'Confirm', icon: <Check size={16} /> },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div animate={step >= s.num ? { scale: [1, 1.1, 1] } : {}}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s.num ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white/10 text-gray-500'
                }`}>
                {step > s.num ? <Check size={16} /> : s.icon}
              </motion.div>
              <span className={`text-sm hidden sm:block ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>{s.label}</span>
              {i < 2 && <div className={`w-12 h-0.5 ${step > s.num ? 'bg-cyan-500' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 1: SHIPPING */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-3xl p-8 space-y-5">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Truck size={20} className="text-cyan-400" /> Shipping Details
                    <span className="text-xs text-red-400 ml-auto">* All fields required</span>
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">First Name *</label>
                      <input placeholder="First Name" value={form.firstName} onChange={e => { setForm({...form, firstName: e.target.value}); setErrors({...errors, firstName: ''}) }} className={inputClass('firstName')} />
                      {errors.firstName && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Last Name *</label>
                      <input placeholder="Last Name" value={form.lastName} onChange={e => { setForm({...form, lastName: e.target.value}); setErrors({...errors, lastName: ''}) }} className={inputClass('lastName')} />
                      {errors.lastName && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Email Address *</label>
                      <input placeholder="Email" type="email" value={form.email} onChange={e => { setForm({...form, email: e.target.value}); setErrors({...errors, email: ''}) }} className={inputClass('email')} />
                      {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Phone Number *</label>
                      <input placeholder="Phone" type="tel" value={form.phone} onChange={e => { setForm({...form, phone: e.target.value}); setErrors({...errors, phone: ''}) }} className={inputClass('phone')} />
                      {errors.phone && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Delivery Address *</label>
                    <input placeholder="Street address, landmark" value={form.address} onChange={e => { setForm({...form, address: e.target.value}); setErrors({...errors, address: ''}) }} className={inputClass('address')} />
                    {errors.address && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">City *</label>
                      <input placeholder="City" value={form.city} onChange={e => { setForm({...form, city: e.target.value}); setErrors({...errors, city: ''}) }} className={inputClass('city')} />
                      {errors.city && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.city}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Region/State *</label>
                      <input placeholder="Region" value={form.region} onChange={e => { setForm({...form, region: e.target.value}); setErrors({...errors, region: ''}) }} className={inputClass('region')} />
                      {errors.region && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.region}</p>}
                    </div>
                  </div>

                  {/* Delivery Method */}
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Delivery Method *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'standard', label: 'Standard', time: '3-5 days', price: delivery === 0 ? 'FREE' : `GHS ${delivery}` },
                        { id: 'express', label: 'Express', time: '1-2 days', price: 'GHS 100' }
                      ].map(method => (
                        <div key={method.id} onClick={() => setForm({...form, deliveryMethod: method.id})}
                          className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
                            form.deliveryMethod === method.id ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 hover:border-white/20'
                          }`}>
                          <div className="flex items-center gap-2 mb-1"><Truck size={16} className="text-cyan-400" /><span className="font-semibold text-sm">{method.label}</span></div>
                          <p className="text-xs text-gray-500">{method.time}</p>
                          <p className="text-sm text-cyan-400 font-bold mt-1">{method.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => {
                    if (validateShipping()) setStep(2)
                  }} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20">
                    Continue to Payment <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: PAYMENT */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-3xl p-8 space-y-5">
                  <h2 className="text-xl font-bold flex items-center gap-2"><CreditCard size={20} className="text-purple-400" /> Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'momo', label: 'Mobile Money', icon: <Smartphone size={20} />, desc: 'MTN, Vodafone, AirtelTigo', gradient: 'from-yellow-500 to-orange-600' },
                      { id: 'card', label: 'Bank Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard', gradient: 'from-blue-500 to-purple-600' },
                      { id: 'bank', label: 'Bank Transfer', icon: <Building size={20} />, desc: 'Direct bank deposit', gradient: 'from-green-500 to-emerald-600' },
                    ].map(method => (
                      <div key={method.id} onClick={() => setForm({...form, paymentMethod: method.id})}
                        className={`p-4 rounded-xl cursor-pointer border-2 transition-all flex items-center gap-4 ${
                          form.paymentMethod === method.id ? 'border-purple-400 bg-purple-500/10' : 'border-white/10 hover:border-white/20'
                        }`}>
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${method.gradient} text-white`}>{method.icon}</div>
                        <div className="flex-1"><p className="font-semibold text-sm">{method.label}</p><p className="text-xs text-gray-500">{method.desc}</p></div>
                        {form.paymentMethod === method.id && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center"><Check size={14} className="text-white" /></motion.div>}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 border border-white/20 rounded-xl font-semibold">Back</button>
                    <button onClick={() => { if (validateShipping()) setStep(3) }} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold">Review Order</button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CONFIRM */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-3xl p-8 space-y-5">
                  <h2 className="text-xl font-bold flex items-center gap-2"><Check size={20} className="text-green-400" /> Confirm Order</h2>
                  <div className="space-y-3 text-sm">
                    {[
                      ['Name', `${form.firstName} ${form.lastName}`],
                      ['Email', form.email],
                      ['Phone', form.phone],
                      ['Address', `${form.address}, ${form.city}, ${form.region}`],
                      ['Delivery', form.deliveryMethod],
                      ['Payment', form.paymentMethod],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-gray-500">{label}</span><span>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 py-3 border border-white/20 rounded-xl font-semibold">Back</button>
                    <button onClick={handleSubmit} disabled={loading}
                      className="flex-1 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-green-500/20">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Lock size={18} />}
                      {loading ? 'Processing...' : `Pay GHS ${finalTotal.toLocaleString()}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-28 space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2"><Package size={18} className="text-cyan-400" /> Order Summary</h2>
              {items.map((item: any) => (
                <div key={item.product?._id} className="flex justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-gray-400 truncate flex-1">{item.product?.name} <span className="text-cyan-400">x{item.quantity}</span></span>
                  <span className="font-medium ml-2">GHS {((item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                </div>
              ))}
              <div className="space-y-1 text-sm pt-2">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>GHS {total.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-400"><span>Delivery</span><span>{delivery === 0 ? <span className="text-green-400">FREE</span> : `GHS ${delivery}`}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10"><span>Total</span><span className="text-cyan-400">GHS {finalTotal.toLocaleString()}</span></div>
              </div>
              <div className="space-y-2 text-[11px] text-gray-500">
                <div className="flex items-center gap-2"><Shield size={11} className="text-green-400" /> Secure Paystack payment</div>
                <div className="flex items-center gap-2"><BadgeCheck size={11} className="text-green-400" /> 100% authentic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}