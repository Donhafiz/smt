import { createContext, useContext, useState, ReactNode } from 'react'
import api from '../lib/axios'

interface CartItem {
  product: any
  quantity: number
}

const CartContext = createContext<any>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: any) => {
    setItems(prev => {
      const existing = prev.find(i => i.product._id === product._id)
      if (existing) return prev.map(i => i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.product._id !== productId))
  }

  const updateQuantity = (productId: string, qty: number) => {
    setItems(prev => prev.map(i => i.product._id === productId ? { ...i, quantity: Math.max(1, qty) } : i))
  }

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)