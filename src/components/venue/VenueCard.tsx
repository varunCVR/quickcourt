'use client'

interface VenueCardProps {
  venue: {
    id: string
    name: string
    location: string
    image?: string
    photos?: string[]
    sportTypes: string[]
    startingPrice: number
    rating: number
    reviewCount: number
  }
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        {venue.image || venue.photos?.[0] ? (
          <img 
            src={venue.image || venue.photos?.[0]} 
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-semibold">
          ₹{venue.startingPrice}/hr
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{venue.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{venue.location}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {venue.sportTypes.map((sport) => (
            <span 
              key={sport}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {sport}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-600 ml-1">
              {venue.rating} ({venue.reviewCount} reviews)
            </span>
          </div>
          
          <a 
            href={`/venue/${venue.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  )
}