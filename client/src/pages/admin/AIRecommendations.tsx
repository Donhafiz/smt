import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

interface Product {
  _id: string
  name: string
  stock: number
  category: string
}

export default function AIRecommendations() {
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

  const recommendations =
    products.filter(p => p.stock > 10)

  return (
    <div className="space-y-6 text-white">

      <div>

        <h1 className="text-3xl font-bold">
          AI Recommendations
        </h1>

        <p className="text-gray-400">
          Smart ERP recommendations engine
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        {recommendations.map(product => (

          <div
            key={product._id}
            className="bg-[#0f172a] p-5 rounded-xl border border-gray-800"
          >

            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p className="text-gray-400 mt-2">
              High inventory available
            </p>

            <p className="text-green-400 mt-3">
              Recommended for promotion
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

