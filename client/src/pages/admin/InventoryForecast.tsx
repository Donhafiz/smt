import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

interface Product {
  _id: string
  name: string
  stock: number
  sold?: number
}

export default function InventoryForecast() {
  const { t } = useTranslation()

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {

    try {

      const res = await axios.get('/api/products')
      setProducts(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  const lowStock = products.filter(p => p.stock <= 5)

  const healthyStock = products.filter(p => p.stock > 5)

  return (
    <div className="space-y-6 text-white">

      <div>
        <h1 className="text-3xl font-bold">
          Inventory Intelligence
        </h1>

        <p className="text-gray-400">
          ERP inventory forecasting and stock analysis
        </p>
      </div>

      {/* LOW STOCK */}
      <div className="bg-[#0f172a] p-5 rounded-xl border border-red-800">

        <h2 className="text-red-400 font-semibold mb-4">
          Low Stock Alerts
        </h2>

        <div className="space-y-2">

          {lowStock.map(product => (
            <div
              key={product._id}
              className="flex justify-between bg-black/30 p-3 rounded"
            >

              <span>{product.name}</span>

              <span className="text-red-400">
                {product.stock} left
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* HEALTHY STOCK */}
      <div className="bg-[#0f172a] p-5 rounded-xl border border-green-900">

        <h2 className="text-green-400 font-semibold mb-4">
          Healthy Inventory
        </h2>

        <div className="space-y-2">

          {healthyStock.map(product => (
            <div
              key={product._id}
              className="flex justify-between bg-black/30 p-3 rounded"
            >

              <span>{product.name}</span>

              <span className="text-green-400">
                {product.stock} in stock
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

