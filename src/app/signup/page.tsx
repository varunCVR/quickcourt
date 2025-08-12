import SignupForm from '@/components/auth/SignupForm'

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-400 to-blue-500 items-center justify-center">
          <div className="text-white text-center">
            <div className="text-8xl mb-8">🏆</div>
            <h2 className="text-4xl font-bold mb-4">Join QUICKCOURT</h2>
            <p className="text-xl">Start booking your favorite sports venues</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}