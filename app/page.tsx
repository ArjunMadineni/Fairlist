import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) redirect('/dashboard')

  const features = [
    { icon: '', title: 'Smart Task Management', desc: 'Create, organize and prioritize tasks with ease using our intuitive interface.' },
    { icon: '', title: 'Priority Levels', desc: 'Set low, medium, or high priority to always know what matters most.' },
    { icon: '', title: 'Drag & Drop Reorder', desc: 'Rearrange your tasks effortlessly with smooth drag and drop ordering.' },
    { icon: '', title: 'Categories & Filters', desc: 'Group tasks by category and filter by status, priority or search term.' },
    { icon: '', title: 'Real-time Sync', desc: 'Your tasks stay in sync across all your devices powered by Supabase.' },
    { icon: '', title: 'Secure & Private', desc: 'Row-level security ensures only you can see and manage your data.' },
      ]

  return (
        <main style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: 'Syne, sans-serif' }}>
          {/* Header / Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid #2e2e3e' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                      <div style={{ width: 32, height: 32, borderRadius: 9, background: '#7c6dfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#fff' }}>F</div>div>
                                      <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>FairList</span>
                          </div>
                          <div style={{ display: 'flex', gap: 12 }}>
                                      <Link href="/login" style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #7c6dfa', color: '#7c6dfa', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Log in</Link>Link>
                                      <Link href="/signup" style={{ padding: '8px 18px', borderRadius: 8, background: '#7c6dfa', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Sign up free</Link>Link>
                          </div>
                </nav>

          {/* Hero Section */}
                <section style={{ textAlign: 'center', padding: '80px 40px 60px', maxWidth: 800, margin: '0 auto' }}>
                          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 20, background: 'rgba(124,109,250,0.15)', border: '1px solid rgba(124,109,250,0.3)', color: '#7c6dfa', fontSize: 13, marginBottom: 24 }}>Task management, reimagined</div>div>
                          <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, background: 'linear-gradient(135deg, #fff 60%, #7c6dfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your tasks,{' '}<br />always in sync.</h1>h1>
                          <p style={{ fontSize: 18, color: '#8888a0', lineHeight: 1.7, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>FairList is a fair and flexible personal task manager. Prioritize, categorize, and drag-and-drop your way to getting things done — all in one beautifully dark interface.</p>p>
                          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                                      <Link href="/signup" style={{ padding: '14px 32px', borderRadius: 10, background: '#7c6dfa', color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 700 }}>Get started for free</Link>Link>
                                      <Link href="/login" style={{ padding: '14px 32px', borderRadius: 10, background: 'transparent', border: '1.5px solid #2e2e3e', color: '#c0c0d0', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>Sign in</Link>Link>
                          </div>
                </section>

          {/* Features Section */}
                <section style={{ padding: '60px 40px', maxWidth: 1100, margin: '0 auto' }}>
                          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 48, color: '#fff' }}>Everything you need to stay organized</h2>h2>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                            {features.map((f, i) => (
                      <div key={i} style={{ background: '#111118', border: '1px solid #2e2e3e', borderRadius: 14, padding: '28px 24px' }}>
                                      <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                                      <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{f.title}</h3>
                                      <p style={{ fontSize: 14, color: '#8888a0', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                      </div>
                    ))}
                          </div>
                </section>

          {/* CTA Section */}
                <section style={{ textAlign: 'center', padding: '60px 40px 80px', borderTop: '1px solid #2e2e3e' }}>
                          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, color: '#fff' }}>Ready to get organized?</h2>
                          <p style={{ fontSize: 16, color: '#8888a0', marginBottom: 32 }}>Join FairList today. It{"'"}s free.</p>
                          <Link href="/signup" style={{ padding: '16px 40px', borderRadius: 12, background: '#7c6dfa', color: '#fff', textDecoration: 'none', fontSize: 17, fontWeight: 700, display: 'inline-block' }}>Create your account</Link>Link>
                          <p style={{ fontSize: 13, color: '#555570', marginTop: 16 }}>Already have an account?{' '}<Link href="/login" style={{ color: '#7c6dfa', textDecoration: 'none' }}>Sign in</Link>Link></p>p>
                </section>
        </main>
      )
}
