import { createContext, useContext, useEffect, useState } from 'react'

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // LOAD FROM STORAGE
  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  // SAVE TO STORAGE
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exists = prev.find(p => p._id === item._id)

      if (exists) {
        return prev.map(p =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p._id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)!