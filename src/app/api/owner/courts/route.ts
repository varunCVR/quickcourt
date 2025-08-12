import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    const { name, sportType, pricePerHour, facilityId, operatingHours } = await request.json()

    // Verify facility ownership
    const facility = await prisma.facility.findFirst({
      where: {
        id: facilityId,
        ownerId: decoded.userId
      }
    })

    if (!facility) {
      return NextResponse.json({ error: 'Facility not found or unauthorized' }, { status: 403 })
    }

    const court = await prisma.court.create({
      data: {
        name,
        sportType,
        pricePerHour: parseFloat(pricePerHour),
        facilityId,
        operatingHours: operatingHours || { open: '06:00', close: '22:00' }
      }
    })

    return NextResponse.json({ court })
  } catch (error) {
    console.error('Error creating court:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}