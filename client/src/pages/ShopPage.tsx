import { useState, useEffect } from 'react'
import api from '../lib/axios'
// ... keep UI structure

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data)).catch(console.error).finally(() => setLoading(false))
  }, [])

  // ... rest of filter/search logic using products state
}