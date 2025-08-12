import { NextRequest, NextResponse } from 'next/server'
import { SessionManager } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('session_token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')

    if (token) {
      await SessionManager.logout(token)
    }

    const response = NextResponse.json({ message: 'Logged out successfully' })
    
    // Clear cookie
    response.cookies.set('session_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}