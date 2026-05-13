import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { getProducts } from '../services/productService'

interface Product {
  _id?: string
  name: string
  price: number
  category: string
  stock: number
  image: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const { addToCart } = useCart()

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await getProducts()
      setProducts(res.data || [])
    } catch (err) {
      console.log('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // ================= FILTERING =================
  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean)
    return ['all', ...Array.from(new Set(cats))]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        category === 'all' || p.category === category

      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  return (
    <div className="min-h-screen text-white bg-[#020617] p-6 space-y-6">

      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">SMT Tech Store</h1>
        <p className="text-gray-400">
          Shop laptops, accessories, gadgets & tech products
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3">

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 p-3 bg-[#0f172a] border border-gray-700 rounded-lg"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-3 bg-[#0f172a] border border-gray-700 rounded-lg"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-gray-400">Loading products...</div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-gray-400">
          No products found in this category.
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredProducts.map(product => (
          <div
            key={product._id}
            className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition"
          >

            {/* IMAGE */}
            <div className="h-44 bg-black">
              {product.image ? (
                <img
                  src={product.image}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">

              <h2 className="font-bold text-lg">
                {product.name}
              </h2>

              <p className="text-blue-400 font-semibold">
                GHS {product.price}
              </p>

              <div className="flex justify-between text-sm text-gray-400">
                <span>{product.category}</span>

                <span
                  className={
                    product.stock > 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* ADD TO CART */}
                <button
                disabled={product.stock <= 0}
               onClick={() => {
                            if (!product._id) {
                                console.error('Product ID is missing')
                                return
                            }
                            addToCart({
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                quantity: 1
                            })
                        }}
                        className={`px-4 py-2 rounded text-sm ${
                            product.stock <= 0
                                ? 'bg-gray-700 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                >
                {product.stock <= 0
                    ? 'Out of Stock'
                    : 'Add to Cart'}
                </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}