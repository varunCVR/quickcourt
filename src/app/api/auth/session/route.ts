import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/middleware'

export async function GET(request: NextRequest) {
  try {
    const session = await validateSession(request)
    
    if (!session) {
      return NextResponse.json(
        { error: 'No valid session' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      session,
      user: {
        id: session.userId,
        role: session.role
      }
    })
  } catch (error) {
    console.error('Session validation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}