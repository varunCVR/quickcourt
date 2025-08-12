'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VenueDetail({ params }: { params: { id: string } }) {
  const [venue, setVenue] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }
    fetchVenue()
  }, [])

  const fetchVenue = async () => {
    try {
      const res = await fetch(`/api/venues/${params.id}`)
      const data = await res.json()
      setVenue(data.facility)
    } catch (error) {
      console.error('Error fetching venue:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleBooking = (courtId: string) => {
    router.push(`/book/${courtId}?venue=${params.id}`)
  }

  if (loading) return <div>Loading...</div>
  if (!venue) return <div>Venue not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">QUICKCOURT</div>
          <div className="flex items-center space-x-6">
            <a href="/home" className="text-gray-600 hover:text-purple-600">Home</a>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <div className="text-white text-6xl">🏟️</div>
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>
            <p className="text-gray-600 mb-4">{venue.description}</p>
            <p className="text-gray-600 mb-6">📍 {venue.address}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Available Courts</h3>
                <div className="space-y-4">
                  {venue.courts?.map((court) => (
                    <div key={court.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{court.name}</h4>
                      <p className="text-gray-600">{court.sportType}</p>
                      <p className="text-green-600 font-bold">₹{court.pricePerHour}/hour</p>
                      <button 
                        onClick={() => handleBooking(court.id)}
                        className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities?.map((amenity, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 mt-8">Reviews</h3>
                <div className="space-y-4">
                  {venue.reviews?.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600">{review.user.fullName}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}