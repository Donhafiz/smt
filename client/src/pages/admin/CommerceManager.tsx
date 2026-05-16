import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useTranslation } from 'react-i18next'
import {   getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../services/productService'

interface Product {
  _id?: string
  name: string
  price: number
  category: string
  stock: number
  image: string
}

export default function CommerceManager() {
  const { t } = useTranslation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')

  const { addToCart } = useCart()

  const [form, setForm] = useState<Product>({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    image: ''
  })

  const [editingId, setEditingId] = useState<string | null>(null)

  // ================= FETCH PRODUCTS =================
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await getProducts()
      setProducts(res.data || [])
    } catch (err: any) {
      console.error(err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ================= SUBMIT (CREATE / UPDATE) =================
  const handleSubmit = async () => {
    if (!form.name.trim()) return setError('Product name is required')
    if (form.price <= 0) return setError('Price must be greater than 0')

    try {
      setSaving(true)
      setError(null)

      if (editingId) {
        await updateProduct(editingId, form)
      } else {
        await createProduct(form)
      }

      setForm({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        image: ''
      })

      setEditingId(null)
      await fetchData()
    } catch (err) {
      console.error(err)
      setError('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  // ================= EDIT =================
  const handleEdit = (p: Product) => {
    setForm(p)
    setEditingId(p._id || null)
  }

  // ================= DELETE =================
  const handleDelete = async (id?: string) => {
    if (!id) return

    try {
      await deleteProduct(id)
      fetchData()
    } catch (err) {
      console.error(err)
      setError('Failed to delete product')
    }
  }

  // ================= FILTER =================
  const filtered = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">SMT Commerce System</h1>
        <p className="text-gray-400">
          Manage products, inventory, and store operations
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-600/20 border border-red-500 text-red-300 p-3 rounded">
          {error}
        </div>
      )}

      {/* SEARCH */}
      <input
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-3 bg-[#0f172a] border border-gray-700 rounded-lg"
      />

      {/* FORM */}
      <div className="bg-[#0f172a] p-5 rounded-xl space-y-3 border border-gray-800">

        <h2 className="font-semibold text-lg">
          {editingId ? 'Edit Product' : 'Create Product'}
        </h2>

        <div className="grid md:grid-cols-2 gap-3">

          <input
            placeholder="Product Name"
            className="p-2 bg-black border border-gray-700 rounded"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Price (GHS)"
            type="number"
            className="p-2 bg-black border border-gray-700 rounded"
            value={form.price}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
          />

          <input
            placeholder="Category"
            className="p-2 bg-black border border-gray-700 rounded"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />

          <input
            placeholder="Stock"
            type="number"
            className="p-2 bg-black border border-gray-700 rounded"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
          />

        </div>

        <input
          placeholder="Image URL"
          className="w-full p-2 bg-black border border-gray-700 rounded"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {saving
            ? 'Processing...'
            : editingId
              ? 'Update Product'
              : 'Create Product'}
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-gray-400">Loading products...</div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="text-gray-400">No products found.</div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-5">

        {filtered.map(p => (
          <div
            key={p._id}
            className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition"
          >

            {p.image && (
              <img
                src={p.image}
                className="h-40 w-full object-cover"
                alt={p.name}
              />
            )}

            <div className="p-4 space-y-2">

              <h2 className="font-bold text-lg">{p.name}</h2>

              <p className="text-blue-400 font-semibold">
                GHS {p.price}
              </p>

              <div className="flex justify-between text-sm text-gray-400">
                <span>{p.category}</span>
                <span className={p.stock > 5 ? 'text-green-400' : 'text-red-400'}>
                  Stock: {p.stock}
                </span>
              </div>

              <div className="flex gap-2 pt-3 flex-wrap">

                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 px-3 py-1 text-sm rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 px-3 py-1 text-sm rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    if (!p._id) return
                    addToCart({
                      _id: p._id,
                      name: p.name,
                      price: p.price,
                      quantity: 1
                    })
                  }}
                  className="bg-green-600 px-3 py-1 text-sm rounded"
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}


