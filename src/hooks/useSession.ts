'use client'

import { useState, useEffect } from 'react'
import { SessionManager, SessionData } from '@/lib/session'

export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionData = SessionManager.getFromStorage()
    setSession(sessionData)
    setLoading(false)
  }, [])

  const login = (sessionData: SessionData) => {
    SessionManager.saveToStorage(sessionData)
    setSession(sessionData)
  }

  const logout = async () => {
    if (session?.token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.token}`
          }
        })
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
    
    SessionManager.removeFromStorage()
    setSession(null)
  }

  const isAuthenticated = !!session
  const user = session ? {
    id: session.userId,
    role: session.role
  } : null

  return {
    session,
    user,
    isAuthenticated,
    loading,
    login,
    logout
  }
}