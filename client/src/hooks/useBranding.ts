import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useBranding() {
  const [branding, setBranding] = useState<any>(null)

  useEffect(() => {
    fetchBranding()
  }, [])

  const fetchBranding = async () => {
    try {
      const res = await axios.get('/api/tenant/me')
      setBranding(res.data?.branding)
    } catch (err) {
      console.log(err)
    }
  }

  return branding
}