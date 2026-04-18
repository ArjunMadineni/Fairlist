'use client'
import { useState } from 'react'
import TaskList from '@/components/tasks/TaskList'
import TaskFiltersBar from '@/components/tasks/TaskFilters'
import TaskForm from '@/components/tasks/TaskForm'
import type { TaskFilters } from '@/types'

export default function TasksPage() {
  const [filters, setFilters] = useState<TaskFilters>({})
  const [showForm, setShowForm] = useState(false)

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#ffffff', margin: 0 }}>All Tasks</h1>
          <p style={{ color: '#8888a0', fontSize: 12, marginTop: 4 }}>Drag cards to reorder</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 10, border: 'none',
            background: '#7c6dfa', color: '#ffffff',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#9485fb')}
          onMouseOut={e => (e.currentTarget.style.background = '#7c6dfa')}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
          New task
        </button>
      </div>

      <TaskFiltersBar filters={filters} onChange={setFilters} />
      <TaskList filters={filters} />

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  )
}