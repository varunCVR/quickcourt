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
      where: {
        facility: {
          ownerId: decoded.userId
        }
      },
      include: {
        user: {
          select: {
            fullName: true,
            email: true
          }
        },
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
    console.error('Error fetching owner bookings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}