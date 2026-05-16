import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

interface Product {
  _id: string
  name: string
  stock: number
}

export default function SalesForecast() {
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

  // LOW STOCK = HIGH SALES
  const hotProducts =
    products.filter(p => p.stock <= 5)

  return (
    <div className="space-y-6 text-white">

      <div>

        <h1 className="text-3xl font-bold">
          Sales Forecasting
        </h1>

        <p className="text-gray-400">
          AI sales activity analysis
        </p>

      </div>

      <div className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">

        <h2 className="text-xl font-semibold mb-4">
          Fast Selling Products
        </h2>

        <div className="space-y-3">

          {hotProducts.map(product => (

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

    </div>
  )
}

