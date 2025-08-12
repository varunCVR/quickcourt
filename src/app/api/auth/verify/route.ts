import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, otpCode } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: 'User already verified' },
        { status: 400 }
      )
    }

    if (!user.otpCode || !user.otpExpiry) {
      return NextResponse.json(
        { error: 'No OTP found' },
        { status: 400 }
      )
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json(
        { error: 'OTP expired' },
        { status: 400 }
      )
    }

    if (user.otpCode !== otpCode) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpiry: null
      }
    })

    return NextResponse.json({
      message: 'Email verified successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}