import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import logo from '/logo.png'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const SignInPage = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Use Supabase auth only
    const { data, error: supError, requiresConfirmation } = await signIn({ email, password })
    setLoading(false)
    
    if (supError) {
      setError(supError.message || 'Failed to sign in')
      return
    }
    if (requiresConfirmation) {
      setError('Please verify your email before signing in. Check your inbox for a confirmation email.')
      return
    }
    
    // Successful login
    window.dispatchEvent(new CustomEvent('app:toast', { detail: { message: 'Signed in successfully', type: 'success' } }))
    navigate('/')
  }

  const handleGoogleSignIn = () => {
    // Optionally implement OAuth via Supabase provider redirect
    window.location.href = `/auth/google` // placeholder; supabase provider flow should be used
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101624] text-white font-sans px-4">
      <div className="bg-[#151b29] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <img src={logo} alt="Logo" className="mb-4 mx-auto h-20" />
        <h1 className="text-3xl font-bold text-center mb-6 text-[#CBA244]">Smart Oil</h1>

        {/* Banner when redirected after signup */}
        {location?.state?.emailConfirmation && (
          <div className="mb-4 p-3 rounded bg-[#183e51] text-sm text-white">
            Signup successful. Please check your email and confirm your address before logging in.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 bg-[#191f2d] rounded-lg border border-[#2b313f] focus:outline-none focus:border-[#183e51] text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              required
              className="w-full px-3 py-2 bg-[#191f2d] rounded-lg border border-[#2b313f] focus:outline-none focus:border-[#183e51] text-white placeholder-gray-400"
            />
          </div>

          {error && <div className="text-red-400">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-3 rounded-lg bg-gradient-to-r from-[#183d50] to-[#183e51] font-semibold hover:opacity-90 transition cursor-pointer"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-700 w-1/4"></div>
          <span className="text-gray-400 text-sm mx-3">OR</span>
          <div className="border-t border-gray-700 w-1/4"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-[#191f2d] hover:bg-[#1c2233] border border-[#2b313f] text-white font-semibold p-3 rounded-lg mt-4 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>

      <p className="text-center text-gray-400 text-sm mt-6">
        Don’t have an account?{' '}
        <a href="/register" className="text-[#CBA244] hover:underline">
          Register
        </a>
      </p>
    </div>
  )
}

export default SignInPage