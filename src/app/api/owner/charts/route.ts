import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    
    // Mock chart data for demo
    const trends = [
      { day: 'Mon', count: 3 },
      { day: 'Tue', count: 7 },
      { day: 'Wed', count: 5 },
      { day: 'Thu', count: 9 },
      { day: 'Fri', count: 12 },
      { day: 'Sat', count: 15 },
      { day: 'Sun', count: 11 }
    ]

    const earnings = [
      { month: 'Jan', amount: 15000 },
      { month: 'Feb', amount: 18000 },
      { month: 'Mar', amount: 22000 },
      { month: 'Apr', amount: 19000 }
    ]

    const peakHours = [
      { time: '6:00 AM', bookings: 5 },
      { time: '8:00 AM', bookings: 12 },
      { time: '10:00 AM', bookings: 8 },
      { time: '6:00 PM', bookings: 18 },
      { time: '8:00 PM', bookings: 15 },
      { time: '10:00 PM', bookings: 7 }
    ]

    return NextResponse.json({ trends, earnings, peakHours })
  } catch (error) {
    console.error('Error fetching owner chart data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}