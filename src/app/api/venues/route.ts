import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const sportType = searchParams.get('sportType')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    const skip = (page - 1) * limit

    const where: any = {
      status: 'APPROVED',
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    if (sportType || minPrice || maxPrice) {
      where.courts = {
        some: {
          ...(sportType && { sportType }),
          ...(minPrice && { pricePerHour: { gte: parseFloat(minPrice) } }),
          ...(maxPrice && { pricePerHour: { lte: parseFloat(maxPrice) } })
        }
      }
    }

    const [facilities, total] = await Promise.all([
      prisma.facility.findMany({
        where,
        skip,
        take: limit,
        include: {
          courts: {
            select: {
              sportType: true,
              pricePerHour: true
            }
          },
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        }
      }),
      prisma.facility.count({ where })
    ])

    const facilitiesWithRating = facilities.map(facility => {
      const avgRating = facility.reviews.length > 0
        ? facility.reviews.reduce((sum, review) => sum + review.rating, 0) / facility.reviews.length
        : 0

      const minPrice = Math.min(...facility.courts.map(court => Number(court.pricePerHour)))
      const sportTypes = [...new Set(facility.courts.map(court => court.sportType))]

      return {
        id: facility.id,
        name: facility.name,
        location: facility.location,
        image: facility.image,
        photos: facility.photos,
        sportTypes,
        startingPrice: minPrice,
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: facility._count.reviews
      }
    })

    return NextResponse.json({
      facilities: facilitiesWithRating,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}