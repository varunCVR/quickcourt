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
    
    const bookings = await prisma.booking.findMany({
      where: { userId: decoded.userId },
      include: {
        facility: {
          select: {
            name: true,
            location: true
          }
        },
        court: {
          select: {
            name: true,
            sportType: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    const { courtId, facilityId, bookingDate, startTime, duration } = await request.json()

    const court = await prisma.court.findUnique({
      where: { id: courtId }
    })

    if (!court) {
      return NextResponse.json({ error: 'Court not found' }, { status: 404 })
    }

    const endHour = parseInt(startTime.split(':')[0]) + duration
    const endTime = `${endHour.toString().padStart(2, '0')}:00`
    const totalPrice = parseFloat(court.pricePerHour.toString()) * duration

    // Create TimeSlot first
    const timeSlot = await prisma.timeSlot.create({
      data: {
        courtId,
        date: new Date(bookingDate),
        startTime,
        endTime,
        isAvailable: false
      }
    })

    // Then create Booking
    const booking = await prisma.booking.create({
      data: {
        userId: decoded.userId,
        facilityId,
        courtId,
        timeSlotId: timeSlot.id,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
        totalPrice
      }
    })

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}