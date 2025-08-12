import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const court = await prisma.court.findUnique({
      where: { id: params.id },
      include: {
        facility: {
          select: {
            name: true,
            location: true
          }
        }
      }
    })

    if (!court) {
      return NextResponse.json(
        { error: 'Court not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ court })
  } catch (error) {
    console.error('Error fetching court:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}