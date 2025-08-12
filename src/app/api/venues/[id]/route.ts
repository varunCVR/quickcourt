import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const facility = await prisma.facility.findUnique({
      where: { id: params.id },
      include: {
        courts: true,
        reviews: {
          include: {
            user: {
              select: {
                fullName: true
              }
            }
          }
        },
        owner: {
          select: {
            fullName: true,
            email: true
          }
        }
      }
    })

    if (!facility) {
      return NextResponse.json(
        { error: 'Facility not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ facility })
  } catch (error) {
    console.error('Error fetching facility:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}