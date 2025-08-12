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

    const facilities = await prisma.facility.findMany({
      include: {
        owner: {
          select: {
            fullName: true,
            email: true
          }
        },
        _count: {
          select: { courts: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ facilities })
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}