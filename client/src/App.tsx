import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

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

import TrainingPage from './pages/TrainingPage'
import ConsultancyPage from './pages/ConsultancyPage'
import SoftwarePage from './pages/SoftwarePage'

import PaymentSuccess from './pages/PaymentSuccess'

import VendorRegisterPage from './pages/VendorRegisterPage'
import VendorLoginPage from './pages/VendorLoginPage'

import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorWallet from './pages/vendor/VendorWallet'
import TransactionHistory from './pages/vendor/TransactionHistory'

import TrackOrderPage from './pages/TrackOrderPage'

import DriverDashboard from './pages/driver/DriverDashboard'

import CompanySignup from './pages/auth/CompanySignup'

import CareersPage from './pages/CareersPage'
import PressPage from './pages/PressPage'
import PartnersPage from './pages/PartnersPage'
import HelpCenterPage from './pages/HelpCenterPage'
import FAQPage from './pages/FAQPage'
import ShippingPage from './pages/ShippingPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiesPage from './pages/CookiesPage'
import RefundsPage from './pages/RefundsPage'

// Staff Portal
import StaffLoginPage from './pages/staff/StaffLoginPage'
import StaffDashboard from './pages/staff/StaffDashboard'
import StaffPortalLayout from './layouts/StaffPortalLayout'
import StaffProfilePage from './pages/staff/StaffProfilePage'
import StaffChangePasswordPage from './pages/staff/StaffChangePasswordPage'
import AdminRoutes from './routes/AdminRoutes'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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

            {/* SERVICES */}
            <Route path="training" element={<TrainingPage />} />
            <Route path="consultancy" element={<ConsultancyPage />} />
            <Route path="software" element={<SoftwarePage />} />

            {/* COMPANY */}
            <Route path="careers" element={<CareersPage />} />
            <Route path="press" element={<PressPage />} />
            <Route path="partners" element={<PartnersPage />} />

            {/* SUPPORT */}
            <Route path="help" element={<HelpCenterPage />} />
            <Route path="faqs" element={<FAQPage />} />
            <Route path="shipping" element={<ShippingPage />} />

            {/* LEGAL */}
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="cookies" element={<CookiesPage />} />
            <Route path="refunds" element={<RefundsPage />} />

            {/* SHOP & CART */}
            <Route path="shop" element={<ShopPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />

            {/* AUTH */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* STAFF AUTH */}
            <Route path="staff-login" element={<StaffLoginPage />} />

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
          {/* STAFF PORTAL */}
          {/* ========================= */}
          <Route path="/staff-portal" element={<StaffPortalLayout />}>
            <Route index element={<StaffDashboard />} />
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="profile" element={<StaffProfilePage />} />
            <Route path="change-password" element={<StaffChangePasswordPage />} />
            {/* Add more staff portal routes here */}
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
      </CartProvider>
    </AuthProvider>
  )
}

export default App