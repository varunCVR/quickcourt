import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    const { name, description, address, location, image } = await request.json()

    // Verify facility ownership
    const existingFacility = await prisma.facility.findFirst({
      where: {
        id: params.id,
        ownerId: decoded.userId
      }
    })

    if (!existingFacility) {
      return NextResponse.json({ error: 'Facility not found or unauthorized' }, { status: 403 })
    }

    const facility = await prisma.facility.update({
      where: { id: params.id },
      data: {
        name,
        description,
        address,
        location,
        image
      }
    })

    return NextResponse.json({ facility })
  } catch (error) {
    console.error('Error updating facility:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}