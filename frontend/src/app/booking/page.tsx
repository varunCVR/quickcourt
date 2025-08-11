'use client'
import { useState, useEffect } from 'react'

export default function VenueBooking() {
  const [sport, setSport] = useState('badminton')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState(1)
  const [court, setCourt] = useState('table1')
  
  // Check if user is logged in (simplified check)
  useEffect(() => {
    const isLoggedIn = false // This would normally check actual auth state
    if (!isLoggedIn) {
      window.location.href = '/'
    }
  }, [])
  
  const calculatePrice = () => {
    const basePrice = 300
    return basePrice * duration
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">QUICKCOURT</div>
          <div className="flex items-center text-gray-700 font-bold">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book
          </div>
          <div className="text-gray-700 font-medium">John Doe</div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Court Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Venue Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl h-64 flex items-center justify-center mb-6">
              <div className="text-white text-5xl">🏟️</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">SBR Badminton</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Satellite, Ahmedabad</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">(124 reviews)</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Details</h3>
            
            <form className="space-y-6">
              {/* Sport Selector */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Sport</label>
                <select 
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="badminton">🏸 Badminton</option>
                  <option value="table-tennis">🏓 Table Tennis</option>
                  <option value="cricket">🏏 Box Cricket</option>
                </select>
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Start Time</label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select time</option>
                  <option value="06:00">6:00 AM</option>
                  <option value="07:00">7:00 AM</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Duration (Hours)</label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setDuration(Math.max(1, duration - 1))}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xl font-medium text-gray-800 w-8 text-center">{duration}</span>
                  <button
                    type="button"
                    onClick={() => setDuration(duration + 1)}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Court Selector */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Court</label>
                <select
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="table1">Table 1</option>
                  <option value="table2">Table 2</option>
                  <option value="table3">Table 3</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Price Calculation & Action Button */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800">Total Amount</h3>
              <p className="text-gray-600">Duration: {duration} hour{duration > 1 ? 's' : ''} × ₹300/hour</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600 mb-4">₹{calculatePrice()}</div>
              <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-green-700 transition duration-200">
                Continue to Payment – ₹{calculatePrice()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-4">QUICKCOURT</div>
          <p className="text-gray-600">Your ultimate sports booking platform</p>
        </div>
      </footer>
    </div>
  )
}