import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function AuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()
  const [status, setStatus] = useState('Processing authentication...')
  const [info, setInfo] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    // Handle OAuth redirect from Supabase and provide visible feedback
    async function handle() {
      try {
        console.debug('[AuthCallback] handling callback, search=', location.search)
        setStatus('Completing sign-in with Supabase...')
        const result = await supabase.auth.getSessionFromUrl({ storeSession: true })
        console.debug('[AuthCallback] getSessionFromUrl result=', result)
        setInfo(result)
        const { error } = result
        if (error) {
          console.error('[AuthCallback] error from getSessionFromUrl', error)
          setErrorMessage(error.message || String(error))
          setStatus('There was an error completing sign-in')
          return
        }

        setStatus('Sign-in completed. Redirecting...')
        // Try to read a `redirectTo` param or fall back to root
        const params = new URLSearchParams(location.search)
        const redirectTo = params.get('redirectTo') || '/'

        // Allow a short delay so onAuthStateChange can fire and App can update
        setTimeout(() => navigate(redirectTo, { replace: true }), 400)
      } catch (err) {
        console.error('[AuthCallback] Failed to complete auth callback', err)
        setErrorMessage(err.message || String(err))
        setStatus('Failed to complete authentication')
      }
    }
    handle()
  }, [navigate, location])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101624] text-white px-4">
      <div className="bg-[#151b29] p-6 rounded-md max-w-lg w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Authentication callback</h2>
        <p className="text-sm text-gray-300 mb-4">{status}</p>
        {errorMessage && <p className="text-red-400 mb-3">{errorMessage}</p>}
        {info && (
          <details className="text-left text-xs bg-[#0f1720] p-3 rounded mb-3">
            <summary className="cursor-pointer">Debug info (expand)</summary>
            <pre className="whitespace-pre-wrap text-xs mt-2">{JSON.stringify(info, null, 2)}</pre>
          </details>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#183e51] rounded text-white"
          >
            Continue manually
          </button>
        </div>
      </div>
    </div>
  )
}
