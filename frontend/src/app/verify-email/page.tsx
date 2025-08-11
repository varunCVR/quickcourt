'use client'
import { useState, useRef } from 'react'

export default function VerifyEmail() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto-focus next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex">
        {/* Desktop Left Image - Hidden on Mobile */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-400 to-blue-500 items-center justify-center">
          <div className="text-white text-center">
            <div className="text-8xl mb-8">🔒</div>
            <h2 className="text-4xl font-bold mb-4">Secure Verification</h2>
            <p className="text-xl">Verify your email to complete registration</p>
          </div>
        </div>

        {/* Right Column - Verification Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-purple-600 mb-2">QUICKCOURT</h1>
              <div className="flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800">VERIFY YOUR EMAIL</h2>
              </div>
              <p className="text-green-600 text-sm">
                We've sent a code to your email: <span className="font-medium">user@example.com</span>
              </p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-4 text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex justify-center space-x-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition duration-200"
              >
                Verify & Continue
              </button>
            </form>

            <div className="text-center space-y-3 mt-6">
              <p className="text-gray-600 text-sm">
                Didn't receive the code?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Resend OTP
                </a>
              </p>
              
              <p>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Wrong email? Edit Email
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}