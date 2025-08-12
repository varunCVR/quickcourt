import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token) as any
    if (!decoded || decoded.role !== 'FACILITY_OWNER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { name, description, address, location, photos, amenities } = await request.json()

    const facility = await prisma.facility.create({
      data: {
        name,
        description,
        address,
        location,
        photos: photos || [],
        amenities: amenities || [],
        ownerId: decoded.userId
      }
    })

    return NextResponse.json({
      message: 'Facility created successfully',
      facility
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token) as any
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    let facilities

    if (decoded.role === 'ADMIN') {
      facilities = await prisma.facility.findMany({
        include: {
          owner: {
            select: {
              fullName: true,
              email: true
            }
          },
          _count: {
            select: {
              courts: true,
              bookings: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else if (decoded.role === 'FACILITY_OWNER') {
      facilities = await prisma.facility.findMany({
        where: { ownerId: decoded.userId },
        include: {
          courts: true,
          _count: {
            select: {
              bookings: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ facilities })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}