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

    const reports = await prisma.report.findMany({
      include: {
        reporter: {
          select: {
            fullName: true,
            email: true
          }
        },
        facility: {
          select: {
            name: true
          }
        },
        reportedUser: {
          select: {
            fullName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Create sample reports if none exist
    if (reports.length === 0) {
      const sampleReports = await Promise.all([
        prisma.report.create({
          data: {
            reporterId: decoded.userId,
            reason: 'Inappropriate Behavior',
            description: 'User was being rude to facility staff',
            status: 'PENDING'
          },
          include: {
            reporter: {
              select: {
                fullName: true,
                email: true
              }
            }
          }
        }),
        prisma.report.create({
          data: {
            reporterId: decoded.userId,
            reason: 'Facility Issues', 
            description: 'Courts are not properly maintained',
            status: 'RESOLVED'
          },
          include: {
            reporter: {
              select: {
                fullName: true,
                email: true
              }
            }
          }
        })
      ])
      return NextResponse.json({ reports: sampleReports })
    }

    return NextResponse.json({ reports })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}