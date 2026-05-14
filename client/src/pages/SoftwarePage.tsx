// client/src/pages/SoftwarePage.tsx
import { useState, useEffect } from 'react'
import api from '../lib/axios'
import { useCart } from '../context/CartContext'
import { ShoppingCart } from 'lucide-react'

export default function SoftwarePage() {
  const [software, setSoftware] = useState([])
  const { addItem } = useCart()

  useEffect(() => {
    api.get('/products?category=Software').then(res => setSoftware(res.data)).catch(console.error)
  }, [])

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto pb-20">
      <h1 className="text-5xl font-black text-center mb-12">Our Software Products</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {software.map(prod => (
          <div key={prod._id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold">{prod.name}</h3>
            <p className="text-gray-400 text-sm mt-2">{prod.description}</p>
            <p className="text-2xl font-bold text-cyan-400 mt-4">GHS {prod.price}</p>
            <button onClick={() => addItem(prod)} className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg flex items-center justify-center gap-2">
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}