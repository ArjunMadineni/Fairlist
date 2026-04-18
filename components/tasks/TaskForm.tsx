'use client'
import { useState } from 'react'
import { useCreateTask, useUpdateTask } from '@/hooks/useTasks'
import { useCategories } from '@/hooks/useCategories'
import type { Task } from '@/types'

interface Props { task?: Task; onClose: () => void }

export default function TaskForm({ task, onClose }: Props) {
  const { data: categories = [] } = useCategories()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()

  const [form, setForm] = useState({
    title:       task?.title       ?? '',
    description: task?.description ?? '',
    priority:    task?.priority    ?? 'medium',
    status:      task?.status      ?? 'pending',
    due_date:    task?.due_date    ?? '',
    category_id: task?.category_id ?? '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      title:       form.title,
      description: form.description || null,
      priority:    form.priority as Task['priority'],
      status:      form.status   as Task['status'],
      due_date:    form.due_date || null,
      category_id: form.category_id || null,
    }
    if (task) await updateTask.mutateAsync({ id: task.id, data: payload })
    else await createTask.mutateAsync(payload)
    onClose()
  }

  const loading = createTask.isPending || updateTask.isPending

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 9,
    background: '#0e0e18', border: '1.5px solid #2e2e3e',
    color: '#ffffff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, background: 'rgba(0,0,0,0.7)',
      }}
    >
      <div style={{
        background: '#16161f', border: '1.5px solid #2e2e3e',
        borderRadius: 16, padding: '24px 24px', width: '100%', maxWidth: 440,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#ffffff', margin: 0 }}>
            {task ? 'Edit task' : 'New task'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8888a0', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', color: '#c0c0d8', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Title *</label>
            <input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="What needs to be done?" required
              onFocus={e => (e.target.style.borderColor = '#7c6dfa')}
              onBlur={e => (e.target.style.borderColor = '#2e2e3e')} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', color: '#c0c0d8', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Description</label>
            <textarea style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }}
              value={form.description ?? ''} onChange={e => set('description', e.target.value)}
              placeholder="Optional details…"
              onFocus={e => (e.target.style.borderColor = '#7c6dfa')}
              onBlur={e => (e.target.style.borderColor = '#2e2e3e')} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', color: '#c0c0d8', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Priority</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.priority} onChange={e => set('priority', e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#c0c0d8', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Status</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#c0c0d8', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Due date</label>
              <input type="date" style={{ ...inputStyle, cursor: 'pointer' }} value={form.due_date ?? ''}
                onChange={e => set('due_date', e.target.value)}
                onFocus={e => (e.target.style.borderColor = '#7c6dfa')}
                onBlur={e => (e.target.style.borderColor = '#2e2e3e')} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#c0c0d8', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Category</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.category_id ?? ''} onChange={e => set('category_id', e.target.value)}>
                <option value="">None</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: '11px', borderRadius: 9,
              background: '#1e1e28', border: '1.5px solid #2e2e3e',
              color: '#8888a0', fontSize: 14, cursor: 'pointer',
            }}>Cancel</button>
            <button type="submit" disabled={loading} style={{
              flex: 1, padding: '11px', borderRadius: 9, border: 'none',
              background: loading ? '#5a4ec0' : '#7c6dfa',
              color: '#ffffff', fontSize: 14, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
              onMouseOver={e => { if (!loading) e.currentTarget.style.background = '#9485fb' }}
              onMouseOut={e => { if (!loading) e.currentTarget.style.background = '#7c6dfa' }}
            >
              {loading ? 'Saving…' : task ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}