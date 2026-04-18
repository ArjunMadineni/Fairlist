'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#0a0a0f' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: '#7c6dfa', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: 'Syne, sans-serif' }}>T</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, color: '#ffffff', margin: '0 0 6px' }}>Reset password</h1>
          <p style={{ color: '#8888a0', fontSize: 14, margin: 0 }}>We'll send you a reset link</p>
        </div>

        <div style={{ background: '#16161f', border: '1.5px solid #2e2e3e', borderRadius: 16, padding: '32px 28px' }}>
          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
              <p style={{ color: '#c0c0d8', fontSize: 15, marginBottom: 8 }}>Check your email for a reset link.</p>
              <p style={{ color: '#8888a0', fontSize: 13, marginBottom: 24 }}>It may take a minute to arrive.</p>
              <Link href="/login" style={{ color: '#7c6dfa', fontSize: 14, textDecoration: 'none' }}>← Back to login</Link>
            </div>
          ) : (
            <form onSubmit={handleReset}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', color: '#c0c0d8', fontSize: 13, fontWeight: 500, marginBottom: 7 }}>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: '#0e0e18', border: '1.5px solid #2e2e3e', color: '#ffffff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#7c6dfa'}
                  onBlur={e => e.target.style.borderColor = '#2e2e3e'}
                />
              </div>

              {error && (
                <div style={{ background: '#ef444418', border: '1px solid #ef444440', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#f87171', fontSize: 13 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: loading ? '#5a4ec0' : '#7c6dfa', color: '#ffffff', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginBottom: 20 }}
                onMouseOver={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#9485fb' }}
                onMouseOut={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#7c6dfa' }}
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <Link href="/login" style={{ color: '#8888a0', fontSize: 13, textDecoration: 'none' }}>← Back to login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}