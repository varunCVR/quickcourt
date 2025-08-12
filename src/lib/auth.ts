import jwt from 'jsonwebtoken'

// Note: bcrypt operations should be done server-side only
export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = require('bcryptjs')
  return await bcrypt.hash(password, 12)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const bcrypt = require('bcryptjs')
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error) {
    return null
  }
}

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}