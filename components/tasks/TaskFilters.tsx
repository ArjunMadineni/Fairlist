'use client'
import { useCategories } from '@/hooks/useCategories'
import type { TaskFilters } from '@/types'

interface Props { filters: TaskFilters; onChange: (f: TaskFilters) => void }

const selectStyle: React.CSSProperties = {
  padding: '8px 12px', borderRadius: 8, fontSize: 13,
  background: '#1e1e28', color: '#c0c0d8',
  border: '1.5px solid #2e2e3e', cursor: 'pointer', outline: 'none',
}

export default function TaskFiltersBar({ filters, onChange }: Props) {
  const { data: categories = [] } = useCategories()
  const set = (k: keyof TaskFilters, v: string) => onChange({ ...filters, [k]: v })

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
      <input
        type="search" placeholder="Search tasks…"
        value={filters.search || ''}
        onChange={e => set('search', e.target.value)}
        style={{ ...selectStyle, minWidth: 180, color: '#ffffff' }}
      />
      <select value={filters.status || 'all'} onChange={e => set('status', e.target.value)} style={selectStyle}>
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select value={filters.priority || 'all'} onChange={e => set('priority', e.target.value)} style={selectStyle}>
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select value={filters.category_id || 'all'} onChange={e => set('category_id', e.target.value)} style={selectStyle}>
        <option value="all">All categories</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      {(filters.status || filters.priority || filters.category_id || filters.search) && (
        <button onClick={() => onChange({})} style={{
          ...selectStyle, color: '#f87171', borderColor: '#f8717140',
          background: '#ef444415', cursor: 'pointer',
        }}>Clear filters</button>
      )}
    </div>
  )
}