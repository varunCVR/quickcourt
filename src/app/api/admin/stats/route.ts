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

    const [users, facilityOwners, facilities, bookings, activeCourts] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'FACILITY_OWNER' } }),
      prisma.facility.count(),
      prisma.booking.count(),
      prisma.court.count({ where: { isActive: true } })
    ])

    return NextResponse.json({ users, facilityOwners, facilities, bookings, activeCourts })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}