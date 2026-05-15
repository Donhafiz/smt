import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowLeft,
  CreditCard, Truck, Shield, Heart, ChevronRight,
  Zap, Store, Tag, Percent
} from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const delivery = total > 5000 ? 0 : 50
  const discount = promoApplied ? total * 0.1 : 0
  const finalTotal = total + delivery - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'smt10') {
      setPromoApplied(true)
    } else {
      alert('Invalid promo code')
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-400 mt-2">{items.length} items</p>
          </div>
          <Link to="/shop" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <ShoppingCart size={64} className="mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Start adding products!</p>
            <Link to="/shop" className="px-6 py-3 bg-cyan-500 rounded-xl font-semibold hover:bg-cyan-600 transition-all inline-block">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: any) => (
                <motion.div key={item.product?._id || item._id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="glass rounded-2xl p-4 flex gap-4">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.product?.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : <ShoppingCart size={24} className="text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product?.name || 'Product'}</h3>
                    <p className="text-xs text-gray-500">{item.product?.category}</p>
                    <p className="text-cyan-400 font-bold mt-2">GHS {(item.product?.price || 0).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.product?._id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.product?._id, Math.max(1, (item.quantity || 1) - 1))} className="p-1.5 rounded-md hover:bg-white/10"><Minus size={14} /></button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(item.product?._id, (item.quantity || 1) + 1)} className="p-1.5 rounded-md hover:bg-white/10"><Plus size={14} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 sticky top-28 space-y-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>GHS {total.toLocaleString()}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Delivery</span><span>{delivery === 0 ? <span className="text-green-400">FREE</span> : `GHS ${delivery}`}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-400"><span>Discount (10%)</span><span>-GHS {discount.toLocaleString()}</span></div>}
                </div>

                <div className="flex gap-2">
                  <input type="text" placeholder="Promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-400" />
                  <button onClick={handleApplyPromo} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30">Apply</button>
                </div>
                <p className="text-[10px] text-gray-600">Try code: SMT10 for 10% off</p>

                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span><span className="text-cyan-400">GHS {finalTotal.toLocaleString()}</span>
                </div>

                <Link to="/checkout" className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                  <CreditCard size={18} /> Proceed to Checkout
                </Link>

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2"><Truck size={12} className="text-green-400" /> Free delivery on orders over GHS 5,000</div>
                  <div className="flex items-center gap-2"><Shield size={12} className="text-green-400" /> Secure checkout with Paystack</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}