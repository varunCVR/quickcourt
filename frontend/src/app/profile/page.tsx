'use client'
import { useState } from 'react'

export default function Profile() {
  const [activeSection, setActiveSection] = useState('bookings')
  const [bookingFilter, setBookingFilter] = useState('all')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const isBookingPast = (dateStr: string) => {
    const bookingDate = new Date(dateStr)
    const today = new Date()
    return bookingDate < today
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

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Profile Section */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">John Doe</h2>
              <p className="text-gray-600 text-sm mb-1">+91 98765 43210</p>
              <p className="text-gray-600 text-sm">john.doe@example.com</p>
            </div>
            
            <button
              onClick={() => setActiveSection('edit')}
              className="w-full bg-purple-600 text-white py-2 rounded-xl font-medium hover:bg-purple-700 transition duration-200 mb-6"
            >
              Edit Profile
            </button>

            {/* Navigation */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveSection('bookings')}
                className={`w-full py-2 rounded-xl font-medium transition duration-200 ${
                  activeSection === 'bookings' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Bookings
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
            {activeSection === 'edit' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h3>
                <form className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="file" accept="image/*" className="hidden" id="edit-profile-picture" />
                    <label htmlFor="edit-profile-picture" className="text-purple-600 hover:text-purple-700 text-sm font-medium cursor-pointer">
                      Change Profile Picture
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                    <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Old Password</label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? 'text' : 'password'}
                        placeholder="Enter old password"
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        {showOldPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <button type="button" className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition duration-200">
                      Reset
                    </button>
                    <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition duration-200">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeSection === 'bookings' && (
              <div>
                {/* Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setBookingFilter('all')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition duration-200 ${
                      bookingFilter === 'all' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    All Bookings
                  </button>
                  <button
                    onClick={() => setBookingFilter('cancelled')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition duration-200 ${
                      bookingFilter === 'cancelled' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { id: 1, court: 'Skyline Badminton Court', sport: 'Badminton', date: '2024-01-25', time: '10:00 AM - 12:00 PM', location: 'Satellite, Ahmedabad' },
                    { id: 2, court: 'Elite Sports Arena', sport: 'Basketball', date: '2024-01-15', time: '2:00 PM - 4:00 PM', location: 'Bopal, Ahmedabad' },
                    { id: 3, court: 'Prime Tennis Club', sport: 'Tennis', date: '2024-01-10', time: '6:00 PM - 8:00 PM', location: 'Vastrapur, Ahmedabad' }
                  ].map((booking) => {
                    const isPast = isBookingPast(booking.date)
                    const isCancelled = bookingFilter === 'cancelled'
                    
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-800 text-lg mb-3">
                            {booking.court} – {booking.sport}
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {booking.date} | {booking.time}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {booking.location}
                            </div>
                          </div>
                          <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                            isCancelled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {isCancelled ? 'Cancelled' : 'Confirmed'}
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          {!isCancelled && (
                            <button className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-xl font-medium hover:bg-red-200 transition duration-200">
                              Cancel Booking
                            </button>
                          )}
                          <button className={`${!isCancelled ? 'flex-1' : 'w-full'} bg-purple-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-purple-700 transition duration-200`}>
                            Write Review
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}