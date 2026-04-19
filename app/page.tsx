import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid #2e2e3e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: '#7c6dfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#fff' }}>F</div>
          <span style={{ fontSize: 20, fontWeight: 700 }}>FairList</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/login" style={{ padding: '8px 18px', border: '1px solid #2e2e3e', borderRadius: 8, color: '#fff', textDecoration: 'none', fontSize: 14 }}>Login</Link>
          <Link href="/signup" style={{ padding: '8px 18px', background: '#7c6dfa', borderRadius: 8, color: '#fff', textDecoration: 'none', fontSize: 14 }}>Sign up</Link>
        </div>
      </nav>

      <section style={{ textAlign: 'center', padding: '80px 40px 60px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 20, border: '1px solid #7c6dfa', color: '#7c6dfa', fontSize: 13, marginBottom: 24 }}>Task management, reimagined</div>
        <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>Stay organized with <span style={{ color: '#7c6dfa' }}>FairList</span></h1>
        <p style={{ fontSize: 18, color: '#8888a0', lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>A powerful task manager that helps you prioritize, collaborate, and get things done. Built for individuals and teams who mean business.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ padding: '14px 32px', borderRadius: 10, background: '#7c6dfa', color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 700 }}>Get started free</Link>
          <Link href="/login" style={{ padding: '14px 32px', borderRadius: 10, border: '1px solid #2e2e3e', color: '#aaa', textDecoration: 'none', fontSize: 16 }}>Sign in</Link>
        </div>
      </section>

      <section style={{ padding: '60px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 40 }}>Everything you need to stay productive</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            { title: 'Smart Task Management', desc: 'Create, organize and prioritize tasks with ease. Set priorities and track progress.' },
            { title: 'Priority Levels', desc: 'Set low, medium, or high priority to always know what needs your attention first.' },
            { title: 'Drag & Drop Reorder', desc: 'Rearrange your tasks effortlessly with smooth drag and drop functionality.' },
            { title: 'Categories & Filters', desc: 'Group tasks by category and filter by status to find what you need fast.' },
            { title: 'Real-time Sync', desc: 'Your tasks stay in sync across all your devices, always up to date.' },
            { title: 'Secure & Private', desc: 'Row-level security ensures only you can see and manage your own tasks.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#111118', border: '1px solid #2e2e3e', borderRadius: 12, padding: '28px 24px' }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#8888a0', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '60px 40px 80px', borderTop: '1px solid #2e2e3e' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, color: '#fff' }}>Ready to get organized?</h2>
        <p style={{ fontSize: 16, color: '#8888a0', marginBottom: 32 }}>Join FairList today. It&apos;s free.</p>
        <Link href="/signup" style={{ padding: '16px 40px', borderRadius: 12, background: '#7c6dfa', color: '#fff', textDecoration: 'none', fontSize: 17, fontWeight: 700, display: 'inline-block' }}>Create your account</Link>
        <p style={{ fontSize: 13, color: '#555570', marginTop: 16 }}>Already have an account?{' '}<Link href="/login" style={{ color: '#7c6dfa', textDecoration: 'none' }}>Sign in</Link></p>
      </section>
    </main>
  )
}
