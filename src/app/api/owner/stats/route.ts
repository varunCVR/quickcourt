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
    
    const [bookings, activeCourts, totalEarnings] = await Promise.all([
      prisma.booking.count({
        where: {
          facility: {
            ownerId: decoded.userId
          }
        }
      }),
      prisma.court.count({
        where: {
          facility: {
            ownerId: decoded.userId
          },
          isActive: true
        }
      }),
      prisma.booking.aggregate({
        where: {
          facility: {
            ownerId: decoded.userId
          },
          status: 'CONFIRMED'
        },
        _sum: {
          totalPrice: true
        }
      })
    ])

    const earnings = totalEarnings._sum.totalPrice || 0

    return NextResponse.json({ bookings, activeCourts, earnings: Number(earnings) })
  } catch (error) {
    console.error('Error fetching owner stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}