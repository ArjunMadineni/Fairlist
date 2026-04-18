import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StatsBar from '@/components/dashboard/StatsBar'
import RecentTasks from '@/components/dashboard/RecentTasks'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there'

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
          Good day, {name} 👋
        </h1>
        <p style={{ color: '#8888a0', fontSize: 14 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555568', marginBottom: 12 }}>Overview</div>
      <StatsBar />

      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555568', margin: '28px 0 12px' }}>Recent pending tasks</div>
      <RecentTasks />
    </div>
  )
}