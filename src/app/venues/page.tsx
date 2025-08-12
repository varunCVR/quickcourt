'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import VenueCard from '@/components/venue/VenueCard'

export default function Venues() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    sportType: '',
    minPrice: '',
    maxPrice: ''
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }
    fetchVenues()
  }, [])

  const fetchVenues = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.sportType) params.append('sportType', filters.sportType)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      
      const res = await fetch(`/api/venues?${params}`)
      const data = await res.json()
      setVenues(data.facilities || [])
    } catch (error) {
      console.error('Error fetching venues:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchVenues()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSports([])
    setSelectedTypes([])
    setBudgetFriendly(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">QUICKCOURT</div>
          <div className="flex items-center space-x-6">
            <a href="/home" className="text-gray-600 hover:text-purple-600">Home</a>
            <a href="/venues" className="text-purple-600 font-medium">Venues</a>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Sports Venues</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Search venues..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select 
              value={filters.sportType}
              onChange={(e) => setFilters({...filters, sportType: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Sports</option>
              <option value="BADMINTON">Badminton</option>
              <option value="TENNIS">Tennis</option>
              <option value="FOOTBALL">Football</option>
              <option value="BASKETBALL">Basketball</option>
              <option value="CRICKET">Cricket</option>
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-lg">Loading venues...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}

        {!loading && venues.length === 0 && (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">No venues found matching your criteria.</div>
          </div>
        )}
      </div>




    </div>
  )
}