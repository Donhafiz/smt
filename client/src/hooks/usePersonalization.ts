import { useState, useEffect } from 'react'

interface UserProfile {
  interests: string[]
  viewedProducts: string[]
  viewedCourses: string[]
  visitCount: number
}

export function usePersonalization() {
  const [profile, setProfile] = useState<UserProfile>({
    interests: [],
    viewedProducts: [],
    viewedCourses: [],
    visitCount: 0
  })

  useEffect(() => {
    const stored = localStorage.getItem('userProfile')
    if (stored) {
      setProfile(JSON.parse(stored))
    }
    // Increment visit count
    const updated = { ...profile, visitCount: (profile.visitCount || 0) + 1 }
    localStorage.setItem('userProfile', JSON.stringify(updated))
    setProfile(updated)
  }, [])

  const trackInterest = (category: string) => {
    const updated = {
      ...profile,
      interests: [...new Set([...profile.interests, category])]
    }
    localStorage.setItem('userProfile', JSON.stringify(updated))
    setProfile(updated)
  }

  const getRecommendations = () => {
    if (profile.interests.includes('Web Development')) return 'Check out our Full Stack Web Development course!'
    if (profile.interests.includes('Cybersecurity')) return 'New Cybersecurity bootcamp starting soon!'
    if (profile.interests.includes('Laptops')) return 'MacBook Pro M3 now in stock!'
    return 'Explore our most popular courses and products!'
  }

  return { profile, trackInterest, getRecommendations }
}