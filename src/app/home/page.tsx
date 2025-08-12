'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import VenueCard from '@/components/venue/VenueCard'

export default function Home() {
  const [venues, setVenues] = useState([])
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      router.push('/')
      return
    }
    
    if (userData) {
      setUser(JSON.parse(userData))
    }

    fetchVenues()
  }, [])

  const fetchVenues = async () => {
    try {
      const res = await fetch('/api/venues?limit=4')
      const data = await res.json()
      setVenues(data.facilities || [])
    } catch (error) {
      console.error('Error fetching venues:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">QUICKCOURT</div>
          <div className="flex items-center space-x-6">
            <a href="/home" className="text-purple-600 font-medium">Home</a>
            <a href="/venues" className="text-gray-600 hover:text-purple-600">Venues</a>
            <a href="/booking" className="text-gray-600 hover:text-purple-600">My Bookings</a>
            <a href="/profile" className="text-gray-600 hover:text-purple-600">Profile</a>
            <button 
              onClick={handleLogout}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome back, {user.fullName}!</h2>
          <p className="text-xl mb-8">Find and book your favorite sports venues</p>
          <a 
            href="/venues" 
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 inline-block"
          >
            Browse All Venues
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Popular Venues</h2>
          <a href="/venues" className="text-purple-600 font-medium hover:text-purple-700">See all venues</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      {/* Popular Sports Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Sports</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: 'Badminton', emoji: '🏸' },
            { name: 'Football', emoji: '⚽' },
            { name: 'Cricket', emoji: '🏏' },
            { name: 'Swimming', emoji: '🏊' },
            { name: 'Tennis', emoji: '🎾' },
            { name: 'Table Tennis', emoji: '🏓' }
          ].map((sport) => (
            <div key={sport.name} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow cursor-pointer">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-4xl">{sport.emoji}</span>
              </div>
              <p className="font-medium text-gray-800 text-lg">{sport.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Sports Venues</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Booking Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}