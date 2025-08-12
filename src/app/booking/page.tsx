'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      setBookings(data.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">QUICKCOURT</div>
          <div className="flex items-center space-x-6">
            <a href="/home" className="text-gray-600 hover:text-purple-600">Home</a>
            <a href="/venues" className="text-gray-600 hover:text-purple-600">Venues</a>
            <a href="/booking" className="text-purple-600 font-medium">My Bookings</a>
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
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="text-lg">Loading bookings...</div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600 mb-4">No bookings found</div>
            <a 
              href="/venues" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Browse Venues
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{booking.facility.name}</h3>
                    <p className="text-gray-600">{booking.court.name} - {booking.court.sportType}</p>
                    <p className="text-gray-600">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    <p className="text-gray-600">Time: {booking.startTime} - {booking.endTime}</p>
                    <p className="text-gray-600">Location: {booking.facility.location}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                      booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                    <p className="text-lg font-bold mt-2">₹{booking.totalPrice}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Booking ID: {booking.id.slice(-8).toUpperCase()}
                  </div>
                  <div className="space-x-2">
                    {booking.status === 'CONFIRMED' && new Date(booking.bookingDate) > new Date() && (
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  )
}