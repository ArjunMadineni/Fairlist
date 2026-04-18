'use client'
import { useTasks } from '@/hooks/useTasks'
import TaskCard from '@/components/tasks/TaskCard'

export default function RecentTasks() {
  const { data: tasks = [], isLoading } = useTasks({ status: 'pending' })
  const recent = tasks.slice(0, 5)

  if (isLoading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ height: 64, borderRadius: 10, background: '#16161f', border: '1px solid #2e2e3e' }} />
      ))}
    </div>
  )

  if (!recent.length) return (
    <div style={{
      background: '#16161f', border: '1.5px solid #2e2e3e', borderRadius: 12,
      padding: '32px 24px', textAlign: 'center', color: '#555568',
    }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>🎉</div>
      <p style={{ fontSize: 14 }}>No pending tasks — you're all caught up!</p>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {recent.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  )
}