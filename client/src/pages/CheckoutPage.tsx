import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { 
  CreditCard, Truck, Shield, Check, ArrowLeft, 
  MapPin, Phone, Mail, User, Home, Building,
  Smartphone, Lock, ChevronRight
} from 'lucide-react'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, total } = useCart()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', region: '', deliveryMethod: 'standard',
    paymentMethod: 'momo'
  })

  const delivery = total > 5000 ? 0 : 50
  const finalTotal = total + delivery

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      navigate('/payment-success')
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold">Cart is empty</h2>
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
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-white/10 text-gray-500'
              }`}>
                {step > s ? <Check size={16} /> : s}
              </div>
              <span className={`text-sm ${step >= s ? 'text-white' : 'text-gray-500'}`}>
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Confirm'}
              </span>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-cyan-500' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><MapPin size={20} className="text-cyan-400" /> Shipping Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="First Name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                  <input placeholder="Last Name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                  <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                  <input placeholder="Phone" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <input placeholder="Delivery Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                  <input placeholder="Region" value={form.region} onChange={e => setForm({...form, region: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Delivery Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'standard', label: 'Standard', time: '3-5 days', price: delivery === 0 ? 'FREE' : `GHS ${delivery}` },
                      { id: 'express', label: 'Express', time: '1-2 days', price: 'GHS 100' }
                    ].map(method => (
                      <div key={method.id} onClick={() => setForm({...form, deliveryMethod: method.id})}
                        className={`p-3 rounded-xl cursor-pointer border-2 transition-all ${
                          form.deliveryMethod === method.id ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 hover:border-white/20'
                        }`}>
                        <p className="font-semibold">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.time}</p>
                        <p className="text-sm text-cyan-400 mt-1">{method.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><CreditCard size={20} className="text-cyan-400" /> Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: 'momo', label: 'Mobile Money', icon: <Smartphone size={20} />, desc: 'MTN, Vodafone, AirtelTigo' },
                    { id: 'card', label: 'Bank Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard' },
                    { id: 'bank', label: 'Bank Transfer', icon: <Building size={20} />, desc: 'Direct bank deposit' }
                  ].map(method => (
                    <div key={method.id} onClick={() => setForm({...form, paymentMethod: method.id})}
                      className={`p-4 rounded-xl cursor-pointer border-2 transition-all flex items-center gap-4 ${
                        form.paymentMethod === method.id ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 hover:border-white/20'
                      }`}>
                      <div className="text-cyan-400">{method.icon}</div>
                      <div>
                        <p className="font-semibold">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                      {form.paymentMethod === method.id && <Check size={20} className="ml-auto text-cyan-400" />}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-white/20 rounded-xl font-semibold">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">Review Order</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><Check size={20} className="text-green-400" /> Confirm Order</h2>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Name:</span> {form.firstName} {form.lastName}</p>
                  <p><span className="text-gray-500">Phone:</span> {form.phone}</p>
                  <p><span className="text-gray-500">Address:</span> {form.address}, {form.city}, {form.region}</p>
                  <p><span className="text-gray-500">Delivery:</span> {form.deliveryMethod}</p>
                  <p><span className="text-gray-500">Payment:</span> {form.paymentMethod}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 border border-white/20 rounded-xl font-semibold">Back</button>
                  <button onClick={handleSubmit} disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold flex items-center justify-center gap-2">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Lock size={18} />}
                    {loading ? 'Processing...' : `Pay GHS ${finalTotal.toLocaleString()}`}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-28 space-y-4">
              <h2 className="text-lg font-bold">Order Summary</h2>
              {items.map((item: any) => (
                <div key={item.product?._id} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.product?.name} x{item.quantity}</span>
                  <span>GHS {((item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-3 space-y-1 text-sm">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>GHS {total.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-400"><span>Delivery</span><span>{delivery === 0 ? 'FREE' : `GHS ${delivery}`}</span></div>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-cyan-400">GHS {finalTotal.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}