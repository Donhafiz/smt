import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, Truck, 
  Shield, Heart, ChevronRight, Zap, Store, Tag, Percent,
  Sparkles, Gift, Clock, Star, Package, RefreshCw, BadgeCheck
} from 'lucide-react'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity, total } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [savedItems, setSavedItems] = useState<any[]>([])
  const [showSaved, setShowSaved] = useState(false)

  const delivery = total > 5000 ? 0 : 50
  const discount = promoApplied ? total * 0.1 : 0
  const finalTotal = total + delivery - discount
  const savings = discount + (total > 5000 ? 50 : 0)

  // 🔒 Require login to access cart
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'smt10') { setPromoApplied(true) }
    else if (promoCode.toLowerCase() === 'freeship') { alert('Free shipping already applied on orders over GHS 5,000!') }
    else { alert('Invalid promo code. Try: SMT10') }
  }

  const handleSaveForLater = (item: any) => {
    setSavedItems(prev => [...prev, item])
    removeItem(item.product?._id)
  }

  const handleMoveToCart = (item: any) => {
    setSavedItems(prev => prev.filter(i => i.product?._id !== item.product?._id))
    updateQuantity(item.product?._id, 1)
  }

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-gray-600" />
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Discover amazing tech products!</p>
          <Link to="/shop" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-lg hover:scale-105 transition-all inline-block shadow-2xl shadow-cyan-500/20">
            Browse Products
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-400 mt-2">{items.length} items • Free shipping over GHS 5,000</p>
          </div>
          <Link to="/shop" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>

        {total < 5000 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-4 mb-6 flex items-center gap-4">
            <Truck size={20} className="text-cyan-400" />
            <div className="flex-1">
              <p className="text-sm">Add <span className="text-cyan-400 font-bold">GHS {(5000 - total).toLocaleString()}</span> more for <span className="text-green-400 font-bold">FREE shipping</span>!</p>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(total / 5000) * 100}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item: any) => (
                <motion.div key={item.product?._id || Math.random()} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }}
                  className="glass rounded-2xl p-4 flex gap-4 group hover:border-white/10 transition-all">
                  <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                    {item.product?.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <ShoppingCart size={24} className="text-gray-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{item.product?.name || 'Product'}</h3>
                        <p className="text-xs text-gray-500">{item.product?.category}</p>
                        <span className="text-lg font-bold text-cyan-400">GHS {(item.product?.price || 0).toLocaleString()}</span>
                      </div>
                      <button onClick={() => removeItem(item.product?._id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                        <button onClick={() => updateQuantity(item.product?._id, Math.max(1, (item.quantity || 1) - 1))}
                          className="p-1.5 rounded-md hover:bg-white/10 transition-all"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.product?._id, (item.quantity || 1) + 1)}
                          className="p-1.5 rounded-md hover:bg-white/10 transition-all"><Plus size={14} /></button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="font-bold text-cyan-400">GHS {((item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                      </div>
                    </div>

                    <button onClick={() => handleSaveForLater(item)}
                      className="mt-2 text-xs text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1">
                      <Heart size={12} /> Save for later
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {savedItems.length > 0 && (
              <div className="pt-4">
                <button onClick={() => setShowSaved(!showSaved)}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
                  <Heart size={14} /> {savedItems.length} items saved for later
                </button>
                <AnimatePresence>
                  {showSaved && savedItems.map((item: any) => (
                    <motion.div key={item.product?._id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      className="glass rounded-xl p-3 mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                          {item.product?.image ? <img src={item.product.image} className="w-full h-full object-cover rounded-lg" /> : <Package size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.product?.name}</p>
                          <p className="text-xs text-gray-500">GHS {item.product?.price?.toLocaleString()}</p>
                        </div>
                      </div>
                      <button onClick={() => handleMoveToCart(item)}
                        className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs hover:bg-cyan-500/30">Move to Cart</button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-28 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400"><span>Subtotal ({items.length} items)</span><span>GHS {total.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-400"><span>Delivery</span><span>{delivery === 0 ? <span className="text-green-400">FREE</span> : `GHS ${delivery}`}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-400"><span>Discount (10%)</span><span>-GHS {discount.toLocaleString()}</span></div>}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-3 text-gray-500" />
                  <input type="text" placeholder="Promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-400" />
                </div>
                <button onClick={handleApplyPromo} className="px-4 py-2.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 font-medium">Apply</button>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span><span className="text-cyan-400">GHS {finalTotal.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-cyan-500/20">
                <CreditCard size={20} /> Proceed to Checkout
              </Link>

              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2"><Shield size={12} className="text-green-400" /> Secure checkout with Paystack</div>
                <div className="flex items-center gap-2"><RefreshCw size={12} className="text-green-400" /> 7-day easy returns</div>
                <div className="flex items-center gap-2"><BadgeCheck size={12} className="text-green-400" /> Authentic products guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}