import { useState, useEffect } from 'react'
import api from '../../lib/axios'
import { Package, Plus, Edit2, Trash2, X } from 'lucide-react'

export default function ProductsAdmin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const [form, setForm] = useState({
    name: '', category: 'Phones', price: '', stock: '', description: '', image: ''
  })

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products')
      setProducts(res.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchProducts() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editItem) {
        await api.put(`/products/${editItem._id}`, form)
      } else {
        await api.post('/products', form)
      }
      setShowForm(false)
      setEditItem(null)
      setForm({ name: '', category: 'Phones', price: '', stock: '', description: '', image: '' })
      fetchProducts()
    } catch (err) { console.error(err) }
  }

  const handleEdit = (product) => {
    setEditItem(product)
    setForm({ ...product })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete?')) {
      await api.delete(`/products/${id}`)
      fetchProducts()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Products</h2>
        <button onClick={() => { setShowForm(true); setEditItem(null); setForm({ name: '', category: 'Phones', price: '', stock: '', description: '', image: '' }) }}
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="name" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white" required />
            <select name="category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white">
              <option value="Phones">Phones</option><option value="Laptops">Laptops</option><option value="Accessories">Accessories</option>
              <option value="Smart Devices">Smart Devices</option><option value="Cables & Chargers">Cables & Chargers</option>
            </select>
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white" required />
            <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white" required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white col-span-2" />
            <input name="image" placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="bg-white/5 border border-white/10 rounded p-2 text-white col-span-2" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg">{editItem ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-white/20 px-6 py-2 rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-gray-400 text-sm">{p.category} | GHS {p.price}</p>
            <p className="text-xs text-gray-500">Stock: {p.stock}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleEdit(p)} className="text-cyan-400 hover:text-cyan-300"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}