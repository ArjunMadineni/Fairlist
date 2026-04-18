'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { href: '/tasks',     label: 'All Tasks',  icon: '◈' },
]

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'You'
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <aside style={{
      width: 220, minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: '#111118', borderRight: '1px solid #2e2e3e', flexShrink: 0,
    }}>
      <div style={{
        padding: '20px 18px 16px', borderBottom: '1px solid #2e2e3e',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9, background: '#7c6dfa',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>T</div>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>TaskFlow</span>
      </div>

      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {nav.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 9, marginBottom: 3,
              background: active ? '#7c6dfa' : 'transparent',
              color: active ? '#ffffff' : '#8888a0',
              fontWeight: active ? 600 : 400, fontSize: 14,
              textDecoration: 'none',
            }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '12px 10px', borderTop: '1px solid #2e2e3e' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 9,
          background: '#18181f', marginBottom: 6,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: '#7c6dfa',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: '#ffffff',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {name}
            </div>
            <div style={{
              fontSize: 11, color: '#555568',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {user.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '8px 12px', borderRadius: 8,
            background: 'transparent', border: '1px solid #2e2e3e',
            color: '#8888a0', fontSize: 13, cursor: 'pointer', textAlign: 'left',
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}