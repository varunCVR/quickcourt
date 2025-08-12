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
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Mock chart data for demo
    const bookings = [
      { day: 'Mon', count: 5 },
      { day: 'Tue', count: 8 },
      { day: 'Wed', count: 12 },
      { day: 'Thu', count: 7 },
      { day: 'Fri', count: 15 },
      { day: 'Sat', count: 20 },
      { day: 'Sun', count: 18 }
    ]

    const sports = [
      { name: 'Badminton', count: 45 },
      { name: 'Tennis', count: 32 },
      { name: 'Football', count: 28 },
      { name: 'Basketball', count: 15 },
      { name: 'Cricket', count: 12 }
    ]

    return NextResponse.json({ bookings, sports })
  } catch (error) {
    console.error('Error fetching chart data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}