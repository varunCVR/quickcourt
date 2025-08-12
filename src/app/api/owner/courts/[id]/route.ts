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
    const { name, sportType, pricePerHour, operatingHours } = await request.json()

    // Verify court ownership through facility
    const existingCourt = await prisma.court.findFirst({
      where: {
        id: params.id,
        facility: {
          ownerId: decoded.userId
        }
      }
    })

    if (!existingCourt) {
      return NextResponse.json({ error: 'Court not found or unauthorized' }, { status: 403 })
    }

    const court = await prisma.court.update({
      where: { id: params.id },
      data: {
        name,
        sportType,
        pricePerHour: parseFloat(pricePerHour),
        operatingHours: operatingHours || { open: '06:00', close: '22:00' }
      }
    })

    return NextResponse.json({ court })
  } catch (error) {
    console.error('Error updating court:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any

    // Verify court ownership through facility
    const existingCourt = await prisma.court.findFirst({
      where: {
        id: params.id,
        facility: {
          ownerId: decoded.userId
        }
      }
    })

    if (!existingCourt) {
      return NextResponse.json({ error: 'Court not found or unauthorized' }, { status: 403 })
    }

    await prisma.court.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Court deleted successfully' })
  } catch (error) {
    console.error('Error deleting court:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}