'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function BookCourt({ params }: { params: { courtId: string } }) {
  const [court, setCourt] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const venueId = searchParams.get('venue')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }
    fetchCourt()
  }, [])

  const fetchCourt = async () => {
    try {
      const res = await fetch(`/api/courts/${params.courtId}`)
      const data = await res.json()
      setCourt(data.court)
    } catch (error) {
      console.error('Error fetching court:', error)
    }
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time')
      return
    }

    const today = new Date().toISOString().split('T')[0]
    if (selectedDate < today) {
      alert('Cannot book for past dates')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      
      // Create payment intent
      const paymentRes = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: totalPrice,
          courtId: params.courtId,
          facilityId: venueId,
          bookingDate: selectedDate,
          startTime: selectedTime,
          duration
        })
      })

      if (paymentRes.ok) {
        const { clientSecret } = await paymentRes.json()
        // Redirect to payment page with client secret
        router.push(`/payment?client_secret=${clientSecret}&court=${params.courtId}&venue=${venueId}&date=${selectedDate}&time=${selectedTime}&duration=${duration}&amount=${totalPrice}`)
      } else {
        alert('Payment setup failed')
      }
    } catch (error) {
      alert('Payment setup failed')
    } finally {
      setLoading(false)
    }
  }

  if (!court) return <div>Loading...</div>

  const totalPrice = court.pricePerHour * duration

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Book {court.name}</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select time</option>
              <option value="06:00">6:00 AM</option>
              <option value="07:00">7:00 AM</option>
              <option value="08:00">8:00 AM</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (Hours)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value={1}>1 Hour</option>
              <option value={2}>2 Hours</option>
              <option value={3}>3 Hours</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span>Total Price:</span>
              <span className="text-2xl font-bold text-purple-600">₹{totalPrice}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => router.back()}
              className="flex-1 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleBooking}
              disabled={loading}
              className="flex-1 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}