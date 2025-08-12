'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe'

function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const clientSecret = searchParams.get('client_secret')
  const courtId = searchParams.get('court')
  const venueId = searchParams.get('venue')
  const date = searchParams.get('date')
  const time = searchParams.get('time')
  const duration = searchParams.get('duration')
  const amount = searchParams.get('amount')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    if (!stripe || !elements || !clientSecret) {
      setError('Payment system not ready')
      setLoading(false)
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setError('Card element not found')
      setLoading(false)
      return
    }

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement
      }
    })

    if (paymentError) {
      setError(paymentError.message || 'Payment failed')
    } else if (paymentIntent.status === 'succeeded') {
      // Create booking after successful payment
      const token = localStorage.getItem('token')
      try {
        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            courtId,
            facilityId: venueId,
            bookingDate: date,
            startTime: time,
            duration: parseInt(duration || '1'),
            paymentIntentId: paymentIntent.id
          })
        })

        if (res.ok) {
          router.push('/booking?success=true')
        } else {
          setError('Booking creation failed')
        }
      } catch (error) {
        setError('Booking creation failed')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Complete Payment</h1>
        
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Booking Details</h3>
          <p className="text-sm text-gray-600">Date: {date}</p>
          <p className="text-sm text-gray-600">Time: {time}</p>
          <p className="text-sm text-gray-600">Duration: {duration} hour(s)</p>
          <p className="text-lg font-bold text-purple-600 mt-2">Total: ₹{amount}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6 p-4 border rounded">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
              }}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!stripe || loading}
              className="flex-1 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay ₹${amount}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  const stripePromise = getStripe()

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}