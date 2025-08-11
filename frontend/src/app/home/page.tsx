export default function Home() {
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">Ahmedabad</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Find Players & Venues Nearby</h1>
            <p className="text-xl text-gray-600 mb-8">Seamlessly explore sports venues and play with sports enthusiasts just like you!</p>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="relative">
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Search city or location..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🏸</div>
              <p className="text-xl">Sports Activity Banner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Book Venues Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Book Venues</h2>
          <a href="/venues" className="text-purple-600 font-medium hover:text-purple-700">See all venues</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((venue) => (
            <div key={venue} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-4xl">🏟️</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">SBR Badminton</h3>
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
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">Badminton</span>
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Outdoor</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">Top Rated</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Budget</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex space-x-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  page === 1 ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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