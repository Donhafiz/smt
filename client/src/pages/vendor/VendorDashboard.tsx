import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../lib/axios'
import { 
  Store, Package, ShoppingCart, DollarSign, TrendingUp,
  Users, LogOut, Plus, Edit2, Trash2, Save, X,
  Image, Star, Truck, Shield, BarChart3, ArrowUp,
  ArrowDown, Clock, CheckCircle2, AlertCircle,
  Search, Filter, Grid3X3, List, Eye, Upload
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

interface Order {
  _id: string
  customerName: string
  total: number
  status: string
  createdAt: string
  items: any[]
}

interface VendorStats {
  products: number
  orders: number
  revenue: number
  customers: number
  pendingOrders: number
  completedOrders: number
}

const emptyProduct = {
  name: '', category: 'Phones', price: '', stock: '',
  description: '', image: ''
}

export default function VendorDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const vendor = JSON.parse(localStorage.getItem('vendorUser') || localStorage.getItem('vendor') || '{}')
  
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  
  // Product Form
  const [showProductForm, setShowProductForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState(emptyProduct)
  const [saving, setSaving] = useState(false)
  
  // Stats
  const [stats, setStats] = useState<VendorStats>({
    products: 0, orders: 0, revenue: 0,
    customers: 0, pendingOrders: 0, completedOrders: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('vendorToken')
      const headers = { Authorization: `Bearer ${token}` }
      
      const [prodRes, orderRes] = await Promise.allSettled([
        api.get('/products', { headers }),
        api.get('/orders', { headers })
      ])

      const prods = prodRes.status === 'fulfilled' ? prodRes.value.data : []
      const ords = orderRes.status === 'fulfilled' ? orderRes.value.data : []

      setProducts(Array.isArray(prods) ? prods : [])
      setOrders(Array.isArray(ords) ? ords : [])

      const revenue = Array.isArray(ords) ? ords.reduce((sum, o) => sum + (o.total || 0), 0) : 0
      const customers = Array.isArray(ords) ? new Set(ords.map(o => o.customerEmail)).size : 0

      setStats({
        products: Array.isArray(prods) ? prods.length : 0,
        orders: Array.isArray(ords) ? ords.length : 0,
        revenue,
        customers,
        pendingOrders: Array.isArray(ords) ? ords.filter(o => o.status === 'pending').length : 0,
        completedOrders: Array.isArray(ords) ? ords.filter(o => o.status === 'completed').length : 0
      })
    } catch (err) {
      console.error('Vendor fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const token = localStorage.getItem('vendorToken')
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock)
      }
      
      if (editProduct) {
        await api.put(`/products/${editProduct._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await api.post('/products', payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      
      setShowProductForm(false)
      setEditProduct(null)
      setProductForm(emptyProduct)
      fetchData()
    } catch (err) {
      console.error('Save error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setProductForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      description: product.description || '',
      image: product.image || ''
    })
    setShowProductForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    try {
      const token = localStorage.getItem('vendorToken')
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('vendorToken')
    localStorage.removeItem('vendorUser')
    localStorage.removeItem('vendor')
    navigate('/vendor-login')
  }

  const statCards = [
    { label: 'Products', value: stats.products, icon: <Package size={24} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Orders', value: stats.orders, icon: <ShoppingCart size={24} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Revenue', value: `GHS ${stats.revenue.toLocaleString()}`, icon: <DollarSign size={24} />, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Customers', value: stats.customers, icon: <Users size={24} />, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Pending', value: stats.pendingOrders, icon: <Clock size={24} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Completed', value: stats.completedOrders, icon: <CheckCircle2 size={24} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-4 border-orange-500/30 border-t-orange-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <div className="glass border-b border-white/10 sticky top-0 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Store size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{vendor?.businessName || vendor?.storeName || 'My Store'}</h1>
              <p className="text-sm text-gray-400">{vendor?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/vendor-wallet" className="px-4 py-2 glass rounded-xl text-sm hover:bg-white/10 transition-all flex items-center gap-2">
              <DollarSign size={16} /> Wallet
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 border border-red-500/30 text-red-400 rounded-xl text-sm hover:bg-red-500/10 transition-all flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 pb-2 flex gap-1">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
            { id: 'products', label: 'Products', icon: <Package size={16} /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingCart size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">{card.label}</span>
                    <div className={`p-2 rounded-lg ${card.bg}`}>
                      <span className={card.color}>{card.icon}</span>
                    </div>
                  </div>
                  <h2 className={`text-xl font-bold ${card.color}`}>{card.value}</h2>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock size={20} className="text-orange-400" /> Recent Orders
              </h3>
              {orders.slice(0, 5).length === 0 ? (
                <p className="text-gray-500 text-sm">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <div key={order._id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{order.customerName || 'Customer'}</p>
                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 font-bold">GHS {order.total?.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">My Products ({products.length})</h2>
              <button
                onClick={() => { setShowProductForm(true); setEditProduct(null); setProductForm(emptyProduct) }}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-semibold text-sm hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 glass rounded-2xl">
                <Package size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-500 mb-4">No products yet</p>
                <button
                  onClick={() => { setShowProductForm(true); setEditProduct(null); setProductForm(emptyProduct) }}
                  className="px-6 py-3 bg-orange-500 rounded-xl font-semibold"
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                  <motion.div key={product._id} whileHover={{ y: -5 }}
                    className="glass rounded-2xl overflow-hidden group">
                    <div className="h-40 bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={32} className="text-gray-600" />
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-orange-400">{product.category}</span>
                      <h3 className="font-semibold text-sm mt-1 truncate">{product.name}</h3>
                      <p className="text-orange-400 font-bold mt-2">GHS {product.price?.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{product.stock} in stock</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => handleEdit(product)}
                          className="flex-1 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all text-xs flex items-center justify-center gap-1">
                          <Edit2 size={12} /> Edit
                        </button>
                        <button onClick={() => handleDelete(product._id)}
                          className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-xs flex items-center justify-center gap-1">
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <>
            <h2 className="text-xl font-bold">Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <div className="text-center py-20 glass rounded-2xl">
                <ShoppingCart size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-500">No orders yet</p>
              </div>
            ) : (
              <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-left text-gray-400">
                        <th className="p-4">Customer</th>
                        <th className="p-4">Items</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="p-4">{order.customerName || 'N/A'}</td>
                          <td className="p-4">{order.items?.length || 0}</td>
                          <td className="p-4 text-orange-400 font-bold">GHS {order.total?.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                            }`}>{order.status}</span>
                          </td>
                          <td className="p-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showProductForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProductForm(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setShowProductForm(false)} className="p-2 rounded-lg hover:bg-white/10"><X size={20} /></button>
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <input placeholder="Product Name" value={productForm.name}
                  onChange={e => setProductForm({...productForm, name: e.target.value})} required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400">
                    <option value="Phones">Phones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Smart Devices">Smart Devices</option>
                    <option value="Cables & Chargers">Cables & Chargers</option>
                  </select>
                  <input type="number" placeholder="Price (GHS)" value={productForm.price}
                    onChange={e => setProductForm({...productForm, price: e.target.value})} required
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" />
                </div>
                <input type="number" placeholder="Stock" value={productForm.stock}
                  onChange={e => setProductForm({...productForm, stock: e.target.value})} required
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" />
                <textarea placeholder="Description" value={productForm.description}
                  onChange={e => setProductForm({...productForm, description: e.target.value})} rows={3}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400 resize-none" />
                <input placeholder="Image URL" value={productForm.image}
                  onChange={e => setProductForm({...productForm, image: e.target.value})}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-400" />
                <div className="flex gap-3">
                  <button type="submit" disabled={saving}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-semibold flex items-center justify-center gap-2">
                    {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                    {editProduct ? 'Update' : 'Add Product'}
                  </button>
                  <button type="button" onClick={() => setShowProductForm(false)}
                    className="px-6 py-3 border border-white/20 rounded-xl">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
