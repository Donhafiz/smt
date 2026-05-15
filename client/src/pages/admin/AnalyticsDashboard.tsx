import { Bar, Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement,
  Title, Tooltip, Legend, Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler)

// Add these charts to your AnalyticsDashboard component:
const revenueChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue (GHS)',
    data: [12000, 19000, 15000, 25000, 22000, 30000],
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: '#06b6d4',
    borderWidth: 2,
    fill: true,
    tension: 0.4
  }]
}

const orderChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Orders',
    data: [12, 19, 15, 25, 22, 30, 18],
    backgroundColor: 'rgba(139, 92, 246, 0.6)',
    borderRadius: 8
  }]
}