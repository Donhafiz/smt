import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../lib/axios'
import { useCart } from '../context/CartContext'
import { 
  Search, ShoppingCart, Heart, Star,
  Smartphone, Laptop, Headphones, Watch, Cable
} from 'lucide-react'

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [wishlist, setWishlist] = useState<string[]>([])
  const { addItem, items } = useCart()

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
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
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
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
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <section className="pt-28 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Tech Marketplace
              </h1>
              <p className="text-gray-400 mt-2">Premium gadgets & accessories</p>
            </div>

            <Link
              to="/cart"
              className="relative px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/30 transition-all flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Cart
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full text-xs flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all group"
                >
                  <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center relative">
                    <span className="text-4xl">
                      {product.category === 'Phones' ? '📱' :
                       product.category === 'Laptops' ? '💻' :
                       product.category === 'Accessories' ? '🎧' :
                       product.category === 'Smart Devices' ? '⌚' : '🔌'}
                    </span>
                    
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all"
                    >
                      <Heart
                        size={16}
                        className={wishlist.includes(product._id) ? 'text-red-400 fill-red-400' : 'text-white'}
                      />
                    </button>
                  </div>

                  <div className="p-4">
                    <span className="text-xs text-cyan-400">{product.category}</span>
                    <h3 className="font-semibold mt-1 group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-bold text-cyan-400">
                        GHS {product.price?.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">{product.stock} in stock</span>
                    </div>

                    <button
                      onClick={() => addItem(product)}
                      className="w-full mt-3 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 py-20">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>No products found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}