import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from '../../client/src/context/AuthContext'
import { CartProvider } from './context/CartContext'
import { registerSW } from 'virtual:pwa-register'
import { requestNotificationPermission } from './utils/pushNotifications'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)
registerSW(
  {
    immediate: true
  }
)
requestNotificationPermission()