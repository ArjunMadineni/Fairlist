'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#0a0a0f',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: '#7c6dfa', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: '#fff',
            fontFamily: 'Syne, sans-serif',
          }}>T</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, color: '#ffffff', margin: '0 0 6px' }}>
            TaskFlow
          </h1>
          <p style={{ color: '#8888a0', fontSize: 14, margin: 0 }}>Sign in to your workspace</p>
        </div>

        <div style={{
          background: '#16161f',
          border: '1.5px solid #2e2e3e',
          borderRadius: 16,
          padding: '32px 28px',
        }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', color: '#c0c0d8', fontSize: 13, fontWeight: 500, marginBottom: 7 }}>
                Email address
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@example.com"
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: 10,
                  background: '#0e0e18', border: '1.5px solid #2e2e3e',
                  color: '#ffffff', fontSize: 14, outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = '#7c6dfa')}
                onBlur={e => (e.target.style.borderColor = '#2e2e3e')}
              />
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: 'block', color: '#c0c0d8', fontSize: 13, fontWeight: 500, marginBottom: 7 }}>
                Password
              </label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: 10,
                  background: '#0e0e18', border: '1.5px solid #2e2e3e',
                  color: '#ffffff', fontSize: 14, outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = '#7c6dfa')}
                onBlur={e => (e.target.style.borderColor = '#2e2e3e')}
              />
            </div>

            {error && (
              <div style={{
                background: '#ef444418', border: '1px solid #ef444440',
                borderRadius: 8, padding: '10px 14px', marginBottom: 16,
                color: '#f87171', fontSize: 13,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '12px',
                borderRadius: 10, border: 'none',
                background: loading ? '#5a4ec0' : '#7c6dfa',
                color: '#ffffff', fontSize: 15, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => { if (!loading) (e.currentTarget.style.background = '#9485fb') }}
              onMouseOut={e => { if (!loading) (e.currentTarget.style.background = '#7c6dfa') }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div style={{ borderTop: '1px solid #2e2e3e', margin: '24px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/forgot-password" style={{ color: '#8888a0', fontSize: 13, textDecoration: 'none' }}>
              Forgot password?
            </Link>
            <Link href="/signup" style={{
              color: '#ffffff', fontSize: 13, fontWeight: 600,
              textDecoration: 'none', background: '#2e2e3e',
              padding: '7px 14px', borderRadius: 8,
              border: '1px solid #3e3e50',
            }}>
              Create account →
            </Link>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#444458', fontSize: 12, marginTop: 20 }}>
          Your tasks, always in sync.
        </p>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic'