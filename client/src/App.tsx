import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import MainLayout from './layouts/MainLayout'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import StaffPage from './pages/StaffPage'
import ContactPage from './pages/ContactPage'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

import PaymentSuccess from './pages/PaymentSuccess'

import VendorRegisterPage from './pages/VendorRegisterPage'
import VendorLoginPage from './pages/VendorLoginPage'

import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorWallet from './pages/vendor/VendorWallet'
import TransactionHistory from './pages/vendor/TransactionHistory'

import TrackOrderPage from './pages/TrackOrderPage'

import DriverDashboard from './pages/driver/DriverDashboard'

import CompanySignup from './pages/auth/CompanySignup'

import AdminRoutes from './routes/AdminRoutes'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* ========================= */}
        {/* PUBLIC WEBSITE */}
        {/* ========================= */}
        <Route path="/" element={<MainLayout />}>

          {/* HOME */}
          <Route index element={<HomePage />} />

          {/* PUBLIC PAGES */}
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* SHOP & CART */}
          <Route path="shop" element={<ShopPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          {/* AUTH */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* PAYMENTS */}
          <Route path="payment-success" element={<PaymentSuccess />} />

          {/* COMPANY ONBOARDING */}
          <Route path="company-signup" element={<CompanySignup />} />

          {/* VENDOR SYSTEM */}
          <Route path="vendor-register" element={<VendorRegisterPage />} />
          <Route path="vendor-login" element={<VendorLoginPage />} />

          <Route
            path="vendor-dashboard"
            element={
              <ProtectedRoute>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="vendor-wallet"
            element={
              <ProtectedRoute>
                <VendorWallet />
              </ProtectedRoute>
            }
          />

          <Route
            path="transaction-history"
            element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            }
          />

          {/* DELIVERY */}
          <Route
            path="driver-dashboard"
            element={
              <ProtectedRoute>
                <DriverDashboard />
              </ProtectedRoute>
            }
          />

          {/* ORDER TRACKING */}
          <Route path="track-order" element={<TrackOrderPage />} />

        </Route>

        {/* ========================= */}
        {/* ADMIN ERP SYSTEM */}
        {/* ========================= */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* 404 NOT FOUND */}
        {/* ========================= */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </AuthProvider>
  )
}

export default App