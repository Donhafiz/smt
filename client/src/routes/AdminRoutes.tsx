import { Routes, Route } from 'react-router-dom'
import ERPLayout from '../layouts/ERPLayout'
import ProtectedRoute from '../components/ProtectedRoute'

import Dashboard from '../pages/admin/Dashboard'
import AnalyticsDashboard from '../pages/admin/AnalyticsDashboard'
import OrderManager from '../pages/admin/OrderManager'
import StaffManager from '../pages/admin/StaffManager'
import ServicesManager from '../pages/admin/ServicesManager'
import Billing from '../pages/admin/Billing'
import RevenuePrediction from '../pages/admin/RevenuePrediction'
import SalesForecast from '../pages/admin/SalesForecast'
import AIRecommendations from '../pages/admin/AIRecommendations'
import CustomerAnalytics from '../pages/admin/CustomerAnalytics'
import AIAnalyst from '../pages/admin/AIAnalyst'
import SuperAdminDashboard from '../pages/superadmin/SuperAdminDashboard'
import OrderTracking from '../pages/OrderTracking'
import InventoryForecast from '../pages/admin/InventoryForecast'
import ProductsAdmin from '../pages/admin/ProductsAdmin'
import SoftwarePage from '../pages/SoftwarePage'
import CoursesAdmin from '../pages/admin/CoursesAdmin'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <ERPLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="orders" element={<OrderManager />} />
        <Route path="staff" element={<StaffManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="billing" element={<Billing />} />
        <Route path="tracking" element={<OrderTracking />} />
        <Route path="inventory" element={<InventoryForecast />} />
        <Route path="revenue" element={<RevenuePrediction />} />
        <Route path="sales" element={<SalesForecast />} />
        <Route path="recommendations" element={<AIRecommendations />} />
        <Route path="customers" element={<CustomerAnalytics />} />
        <Route path="analyst" element={<AIAnalyst />} />
        <Route path="superadmin" element={<SuperAdminDashboard />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="courses" element={<CoursesAdmin />} />
        <Route path="software" element={<SoftwarePage />} />
      </Route>
    </Routes>
  )
}