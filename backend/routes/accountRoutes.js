const express = require('express');
const router = express.Router();
const { signUp, signIn, getUserByAccessToken, supabase, isConfigured } = require('../services/supabaseClient')

// POST /api/account/register
router.post('/register', async (req, res) => {
  if (!isConfigured) {
    // use dummy auth
  }
  const { name, email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
  try {
    const { data, error } = await signUp(email, password, { data: { name } })
    if (error) return res.status(400).json({ error: error.message || error })
    // signUp returns user and maybe a session depending on settings
    // Normalize response for both Supabase and dummy
    const user = data?.user || data?.user || null
    const session = data?.session || null
    res.status(201).json({ user, session })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Registration failed' })
  }
})

// POST /api/account/login
router.post('/login', async (req, res) => {
  // allow dummy auth when not configured
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
  try {
    const { data, error } = await signIn(email, password)
    if (error) return res.status(401).json({ error: error.message || error })
    // data: { session, user }
    const user = data?.user || null
    const token = data?.session?.access_token || null
    const session = data?.session || null
    res.json({ user, token, session })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed' })
  }
})

// GET /api/account/me
router.get('/me', async (req, res) => {
  // supports dummy auth when isConfigured is false
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'No token provided' })
  const parts = authHeader.split(' ')
  if (parts.length !== 2) return res.status(401).json({ error: 'Token error' })
  const token = parts[1]
  try {
    const { data, error } = await getUserByAccessToken(token)
    if (error) return res.status(401).json({ error: error.message || error })
    // data may be returned directly for dummy; normalize
    const user = data?.user || data?.user || data || null
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch user' })
  }
})

module.exports = router
