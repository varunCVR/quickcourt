import { prisma } from './prisma'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

export interface SessionData {
  userId: string
  role: string
  token: string
  expiresAt: Date
}

export class SessionManager {
  private static readonly SESSION_KEY = 'quickcourt_session'
  private static readonly TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000 // 7 days

  // Create session in database and browser
  static async createSession(userId: string, role: string): Promise<SessionData> {
    const sessionId = randomUUID()
    const timestamp = Date.now()
    
    const token = jwt.sign(
      { userId, role, sessionId, timestamp },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const expiresAt = new Date(Date.now() + this.TOKEN_EXPIRY)

    // Store in database
    await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt
      }
    })

    const sessionData: SessionData = {
      userId,
      role,
      token,
      expiresAt
    }

    return sessionData
  }

  // Validate session from database
  static async validateSession(token: string): Promise<SessionData | null> {
    try {
      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true }
      })

      if (!session || session.expiresAt < new Date()) {
        if (session) {
          await this.deleteSession(token)
        }
        return null
      }

      return {
        userId: session.userId,
        role: session.user.role,
        token: session.token,
        expiresAt: session.expiresAt
      }
    } catch {
      return null
    }
  }

  // Delete session from database
  static async deleteSession(token: string): Promise<void> {
    await prisma.session.deleteMany({
      where: { token }
    })
  }

  // Clean expired sessions
  static async cleanExpiredSessions(): Promise<void> {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    })
  }

  // Browser storage methods
  static saveToStorage(sessionData: SessionData): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData))
    }
  }

  static getFromStorage(): SessionData | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.SESSION_KEY)
      return data ? JSON.parse(data) : null
    }
    return null
  }

  static removeFromStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  // Combined session management
  static async logout(token: string): Promise<void> {
    await this.deleteSession(token)
    this.removeFromStorage()
  }
}