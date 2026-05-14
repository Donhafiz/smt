import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowLeft,
  CreditCard, Truck, Shield
} from 'lucide-react'
import { useCart } from '../context/CartContext'
// ... replace local cartItems with context items, use addItem/removeItem
// Mock cart items
const initialCart = [
  { id: 1, name: 'MacBook Pro M3', price: 12500, quantity: 1, image: '' },
  { id: 2, name: 'iPhone 15 Pro', price: 8500, quantity: 2, image: '' },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart)

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = subtotal > 0 ? 50 : 0
  const total = subtotal + delivery

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-400 mt-2">{cartItems.length} items in your cart</p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingCart size={64} className="mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some products to get started</p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-cyan-500 rounded-xl font-semibold hover:bg-cyan-600 transition-all inline-block"
            >
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4 items-center"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📱</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="text-cyan-400 font-bold mt-1">GHS {item.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right min-w-[80px]">
                    <p className="font-bold">GHS {(item.price * item.quantity).toLocaleString()}</p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 sticky top-28">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>GHS {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery</span>
                    <span>GHS {delivery.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-cyan-400">GHS {total.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <CreditCard size={18} />
                  Proceed to Checkout
                </Link>

                {/* Trust badges */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield size={14} className="text-green-400" />
                    Secure checkout
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Truck size={14} className="text-green-400" />
                    Free delivery on orders over GHS 5,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}