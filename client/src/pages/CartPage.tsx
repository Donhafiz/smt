import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const { cart, removeFromCart, total } = useCart()
  const navigate = useNavigate()

  return (
    <div className="space-y-6 text-white">

      <h1 className="text-3xl font-bold">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-gray-400">Cart is empty</p>
      )}

      {cart.map(item => (
        <div
          key={item._id}
          className="bg-[#0f172a] p-4 rounded-xl flex justify-between"
        >
          <div>
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-gray-400">
              GHS {item.price} × {item.quantity}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-xl font-bold">
        Total: GHS {total}
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Proceed to Checkout
      </button>

    </div>
  )
}