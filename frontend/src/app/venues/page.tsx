'use client'
import { useState } from 'react'

export default function Venues() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSports, setSelectedSports] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [budgetFriendly, setBudgetFriendly] = useState(false)

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSports([])
    setSelectedTypes([])
    setBudgetFriendly(false)
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
          <div className="space-x-4">
            <a href="/" className="text-gray-700 hover:text-purple-600">Login</a>
            <a href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800">Sports Venues in Ahmedabad: Discover and Book Nearby Venues</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 bg-white rounded-2xl shadow-lg p-6 h-fit">
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Search Venue</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by venue name..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Sports Filter */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">Filter by Sport</label>
                <div className="space-y-2">
                  {['Badminton', 'Football', 'Cricket', 'Tennis', 'Swimming'].map((sport) => (
                    <label key={sport} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedSports.includes(sport)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSports([...selectedSports, sport])
                          } else {
                            setSelectedSports(selectedSports.filter(s => s !== sport))
                          }
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                      />
                      <span className="ml-2 text-gray-700">{sport}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">Filter by Type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes('Indoor')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTypes([...selectedTypes, 'Indoor'])
                        } else {
                          setSelectedTypes(selectedTypes.filter(t => t !== 'Indoor'))
                        }
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                    />
                    <span className="ml-2 text-gray-700">🏠 Indoor</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes('Outdoor')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTypes([...selectedTypes, 'Outdoor'])
                        } else {
                          setSelectedTypes(selectedTypes.filter(t => t !== 'Outdoor'))
                        }
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                    />
                    <span className="ml-2 text-gray-700">🌳 Outdoor</span>
                  </label>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">Price Range</label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={budgetFriendly}
                    onChange={(e) => setBudgetFriendly(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                  />
                  <span className="ml-2 text-gray-700">💰 Budget Friendly</span>
                </label>
              </div>

              {/* Clear Filters */}
              <button 
                onClick={clearFilters}
                className="w-full bg-red-100 text-red-600 py-3 rounded-xl font-medium hover:bg-red-200 transition duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
          </button>

          {/* Main Content */}
          <div className="flex-1">
            {/* Venue Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <div className="text-white text-4xl">🏟️</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 mb-2">SBR Sports Complex {i + 1}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm ml-2">(124 reviews)</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Satellite, Ahmedabad</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">Badminton</span>
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Indoor</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">Top Rated</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Budget</span>
                    </div>
                    <a href="/venue" className="block w-full bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700 transition duration-200 text-center">
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    page === 1 ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Same filter content as desktop */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Search Venue</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by venue name..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button 
                onClick={clearFilters}
                className="w-full bg-red-100 text-red-600 py-3 rounded-xl font-medium hover:bg-red-200 transition duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-4">QUICKCOURT</div>
          <p className="text-gray-600">Your ultimate sports booking platform</p>
        </div>
      </footer>
    </div>
  )
}