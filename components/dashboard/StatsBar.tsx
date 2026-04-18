'use client'
import { useTasks } from '@/hooks/useTasks'
import type { Task } from '@/types'

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      background: '#16161f', border: '1.5px solid #2e2e3e',
      borderRadius: 12, padding: '16px 18px',
    }}>
      <div style={{ fontSize: 28, fontWeight: 700, color, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: '#8888a0' }}>{label}</div>
    </div>
  )
}

export default function StatsBar() {
  const { data: tasks = [] } = useTasks()
  const stats = {
    total:     tasks.length,
    pending:   tasks.filter((t: Task) => t.status === 'pending').length,
    completed: tasks.filter((t: Task) => t.status === 'completed').length,
    high:      tasks.filter((t: Task) => t.priority === 'high').length,
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
      <StatCard label="Total tasks"   value={stats.total}     color="#ffffff" />
      <StatCard label="Pending"       value={stats.pending}   color="#f59e0b" />
      <StatCard label="Completed"     value={stats.completed} color="#10b981" />
      <StatCard label="High priority" value={stats.high}      color="#ef4444" />
    </div>
  )
}