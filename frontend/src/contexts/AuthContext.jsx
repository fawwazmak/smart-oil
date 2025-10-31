import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Get initial session (use async/await for clarity)
    ;(async () => {
      try {
        const { data } = await supabase.auth.getSession()
        console.debug('[AuthContext] initial getSession ->', data)
        if (!mounted) return
        setUser(data?.session?.user ?? null)
      } catch (err) {
        console.error('[AuthContext] getSession error', err)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    // Listen for auth changes and keep reference to subscription to unsubscribe later
    const { data: subscriptionData } = supabase.auth.onAuthStateChange((event, session) => {
      console.debug('[AuthContext] onAuthStateChange', event, session)
      if (!mounted) return
      setUser(session?.user ?? null)
    })

    const subscription = subscriptionData?.subscription || subscriptionData

    return () => {
      mounted = false
      try {
        subscription?.unsubscribe && subscription.unsubscribe()
      } catch (e) {
        // ignore unsubscribe errors
      }
    }
  }, [])

  const signUp = async ({ email, password }) => {
    // If you want email links to redirect back into the app, set VITE_SUPABASE_REDIRECT_URL in .env
    const redirectTo = import.meta.env.VITE_SUPABASE_REDIRECT_URL || (window.location.origin + '/auth/callback')
    console.debug('[AuthContext] signUp redirectTo=', redirectTo)
    const { data, error } = await supabase.auth.signUp({ email, password }, { emailRedirectTo: redirectTo })
    console.debug('[AuthContext] signUp result=', { data, error })
    // If signup returned a session, update user
    if (data?.session?.user) setUser(data.session.user)
    // Indicate whether confirmation is required (Supabase returns no session when email confirmation is required)
    const needsConfirmation = !!data?.user && !data?.session
    return { data, error, needsConfirmation }
  }

  const signIn = async ({ email, password }) => {
    console.debug('[AuthContext] signIn attempt for', email)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.debug('[AuthContext] signIn result=', { data, error })
    if (data?.session?.user) setUser(data.session.user)
    const requiresConfirmation = !!data?.user && !data?.session
    return { data, error, requiresConfirmation }
  }

  const signOut = async () => {
    console.debug('[AuthContext] signOut called')
    const { error } = await supabase.auth.signOut()
    console.debug('[AuthContext] signOut result=', { error })
    if (error) throw error
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
