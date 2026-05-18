import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  Search, ShoppingCart, Heart, Star, X, Plus, Minus,
  Smartphone, Laptop, Headphones, Watch, Cable, ChevronRight,
  Filter, Check, Truck, Shield, RefreshCw, Zap
} from 'lucide-react'

interface Product {
  _id: string
  name: string
  category: string
  price: number
  stock: number
  description: string
  image: string
}

export default function ShopPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addItem, items } = useCart()

  useEffect(() => {
    fetch('https://smt-backend-amad.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', 'Phones', 'Laptops', 'Accessories', 'Smart Devices', 'Cables & Chargers']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId])
  }

  // ✅ Fixed: Require login before adding to cart
  const handleAddToCart = (product: Product) => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    addItem({ ...product, quantity })
    setSelectedProduct(null)
    setQuantity(1)
  }

  const categoryIcons: Record<string, any> = {
    Phones: <Smartphone size={18} />,
    Laptops: <Laptop size={18} />,
    Accessories: <Headphones size={18} />,
    'Smart Devices': <Watch size={18} />,
    'Cables & Chargers': <Cable size={18} />,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-4 border-cyan-500/30 border-t-cyan-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <section className="pt-28 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Tech Marketplace
              </h1>
              <p className="text-gray-400 mt-2">{products.length} products available</p>
            </div>
            <Link to="/cart" className="relative px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/30 transition-all flex items-center gap-2">
              <ShoppingCart size={20} />
              Cart
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full text-xs flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 glass rounded-2xl p-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="text" placeholder="Search products..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all ${
                    selectedCategory === cat ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                  }`}>
                  {categoryIcons[cat]} {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>No products found</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div key={product._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -5 }}
                    className="glass rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all group cursor-pointer"
                    onClick={() => { setSelectedProduct(product); setQuantity(1) }}>
                    <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <span className="text-4xl">🛍️</span>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id) }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all">
                        <Heart size={16} className={wishlist.includes(product._id) ? 'text-red-400 fill-red-400' : 'text-white'} />
                      </button>
                      {product.stock <= 5 && product.stock > 0 && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-red-500/80 rounded-full text-xs">Low Stock</span>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-cyan-400">{product.category}</span>
                      <h3 className="font-semibold mt-1 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-bold text-cyan-400">GHS {product.price?.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{product.stock} left</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }}
                        className="w-full mt-3 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                        <ShoppingCart size={16} /> Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10">
                <X size={20} />
              </button>
              
              <div className="h-56 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 overflow-hidden group perspective-1000">
                <motion.div
                  whileHover={{ rotateY: 15, rotateX: -5, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {selectedProduct.image ? (
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-3/4 h-3/4 object-contain" />
                  ) : (
                    <span className="text-6xl">🛍️</span>
                  )}
                </motion.div>
              </div>
              <span className="text-xs text-cyan-400">{selectedProduct.category}</span>
              <h2 className="text-2xl font-bold mt-1">{selectedProduct.name}</h2>
              <p className="text-3xl font-black text-cyan-400 mt-2">GHS {selectedProduct.price?.toLocaleString()}</p>
              <p className="text-gray-400 text-sm mt-3">{selectedProduct.description || 'Premium quality product from Star Media Tech.'}</p>
              
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <Check size={14} className="text-green-400" /> In Stock: {selectedProduct.stock} units
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-lg hover:bg-white/10"><Minus size={16} /></button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(selectedProduct.stock, q + 1))} className="p-2 rounded-lg hover:bg-white/10"><Plus size={16} /></button>
                </div>
                <button onClick={() => handleAddToCart(selectedProduct)}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> Add to Cart — GHS {((selectedProduct.price || 0) * quantity).toLocaleString()}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 text-center text-xs text-gray-500">
                <div className="glass rounded-xl p-3"><Truck size={16} className="mx-auto mb-1 text-cyan-400" /> Free Delivery</div>
                <div className="glass rounded-xl p-3"><Shield size={16} className="mx-auto mb-1 text-cyan-400" /> Warranty</div>
                <div className="glass rounded-xl p-3"><RefreshCw size={16} className="mx-auto mb-1 text-cyan-400" /> 7-Day Return</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}