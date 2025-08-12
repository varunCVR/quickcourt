import { NextRequest } from 'next/server'
import { SessionManager } from './session'

export async function validateSession(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value || 
               request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return null
  }

  return await SessionManager.validateSession(token)
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    const session = await validateSession(request)
    
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return handler(request, session)
  }
}

export function requireRole(roles: string[]) {
  return (handler: Function) => {
    return async (request: NextRequest) => {
      const session = await validateSession(request)
      
      if (!session || !roles.includes(session.role)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      return handler(request, session)
    }
  }
}