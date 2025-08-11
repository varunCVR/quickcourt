'use client'
import { useState } from 'react'

export default function VenueDetails() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null)

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
          <div className="space-x-4">
            <a href="/" className="text-gray-700 hover:text-purple-600">Login</a>
            <a href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Sign Up</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Venue Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">SBR Badminton</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
          <a href="/booking" className="mt-4 md:mt-0 bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition duration-200 inline-block text-center">
            Book This Venue
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Image Slider */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-white text-6xl">🏟️</div>
              <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Venue Info Sidebar */}
          <div className="space-y-6">
            {/* Operating Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-gray-800">Operating Hours</h3>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>Mon - Fri: 6:00 AM - 10:00 PM</p>
                <p>Sat - Sun: 5:00 AM - 11:00 PM</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-gray-800">Address</h3>
              </div>
              <p className="text-gray-600 mb-4">123 Sports Complex, Satellite Road, Ahmedabad, Gujarat 380015</p>
              <div className="bg-gray-200 rounded-xl h-32 flex items-center justify-center">
                <span className="text-gray-500">Map Placeholder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sports Available */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sports Available</h2>
          <div className="flex flex-wrap gap-4 relative">
            {['Badminton', 'Table Tennis', 'Box Cricket'].map((sport) => (
              <div key={sport} className="relative">
                <button
                  onClick={() => setSelectedSport(selectedSport === sport ? null : sport)}
                  className="bg-white px-6 py-3 rounded-xl shadow-lg font-medium text-gray-800 hover:bg-purple-600 hover:text-white hover:shadow-xl transition-all duration-200"
                >
                  {sport}
                </button>
                {selectedSport === sport && (
                  <div className="absolute top-full mt-2 bg-white rounded-xl shadow-xl p-6 w-80 z-10">
                    <h4 className="font-bold text-gray-800 mb-4">Pricing for {sport}</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700">Weekday</p>
                        <p className="text-gray-600">6:00 AM - 6:00 PM: ₹200/hour</p>
                        <p className="text-gray-600">6:00 PM - 10:00 PM: ₹300/hour</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Weekend</p>
                        <p className="text-gray-600">All day: ₹350/hour</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Holidays</p>
                        <p className="text-gray-600">All day: ₹400/hour</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Parking', icon: '🚗' },
              { name: 'Restroom', icon: '🚻' },
              { name: 'Air Conditioning', icon: '❄️' },
              { name: 'Seating', icon: '🪑' },
              { name: 'Refreshments', icon: '🥤' },
              { name: 'CCTV', icon: '📹' }
            ].map((amenity) => (
              <div key={amenity.name} className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="text-2xl mb-2">{amenity.icon}</div>
                <p className="text-gray-700 font-medium">{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Venue */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Venue</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <ul className="space-y-2 text-gray-700">
              <li>• Premium badminton facility with 6 courts</li>
              <li>• Professional lighting and ventilation system</li>
              <li>• Equipment rental available on-site</li>
              <li>• Coaching services available</li>
              <li>• Easy parking and accessibility</li>
            </ul>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Player Reviews & Ratings</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800">John Doe</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">2 days ago</span>
                </div>
                <p className="text-gray-700">Great facility with excellent courts and good lighting. Staff is very helpful and the booking process is smooth.</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="#" className="text-purple-600 font-medium hover:text-purple-700">Load more reviews</a>
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