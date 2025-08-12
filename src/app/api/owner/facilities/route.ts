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
    
    const facilities = await prisma.facility.findMany({
      where: { ownerId: decoded.userId },
      include: {
        courts: true,
        _count: {
          select: { bookings: true }
        }
      }
    })

    return NextResponse.json({ facilities })
  } catch (error) {
    console.error('Error fetching facilities:', error)
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
    const { name, description, address, location, image } = await request.json()

    const facility = await prisma.facility.create({
      data: {
        name,
        description,
        address,
        location,
        image,
        ownerId: decoded.userId,
        photos: [],
        amenities: []
      }
    })

    return NextResponse.json({ facility })
  } catch (error) {
    console.error('Error creating facility:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}