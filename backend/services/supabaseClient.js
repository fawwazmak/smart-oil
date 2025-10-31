const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || ''

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

if (!isConfigured) {
  console.warn('Supabase keys not set (SUPABASE_URL, SUPABASE_ANON_KEY). Using dummy auth for local testing.')
}

let supabase = null
if (isConfigured) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

// Simple dummy auth store for local testing when Supabase isn't configured
const dummyUsers = []

async function signUp(email, password, options = {}) {
  if (!isConfigured) {
    const existing = dummyUsers.find(u => u.email === email.toLowerCase())
    if (existing) return { error: { message: 'User already exists' } }
    const user = { id: dummyUsers.length + 1, email: email.toLowerCase(), metadata: options.data || {} }
    dummyUsers.push({ ...user, password })
    return { data: { user, session: { access_token: `dummy-token-${user.id}` } } }
  }
  return supabase.auth.signUp({ email, password }, options)
}

async function signIn(email, password) {
  if (!isConfigured) {
    const user = dummyUsers.find(u => u.email === email.toLowerCase() && u.password === password)
    if (!user) return { error: { message: 'Invalid credentials' } }
    return { data: { user: { id: user.id, email: user.email, metadata: user.metadata }, session: { access_token: `dummy-token-${user.id}` } } }
  }
  return supabase.auth.signInWithPassword({ email, password })
}

async function getUserByAccessToken(token) {
  if (!isConfigured) {
    // dummy token format: dummy-token-<id>
    if (!token || !token.startsWith('dummy-token-')) return { error: { message: 'Invalid token' } }
    const id = parseInt(token.split('dummy-token-')[1], 10)
    const user = dummyUsers.find(u => u.id === id)
    if (!user) return { error: { message: 'User not found' } }
    return { data: { user: { id: user.id, email: user.email, metadata: user.metadata } } }
  }
  try {
    const { data, error } = await supabase.auth.getUser(token)
    return { data, error }
  } catch (err) {
    return { error: err }
  }
}

module.exports = { supabase, signUp, signIn, getUserByAccessToken, isConfigured }
