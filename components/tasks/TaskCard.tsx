
'use client'
import { useState } from 'react'
import { useDeleteTask, useUpdateTask } from '@/hooks/useTasks'
import type { Task } from '@/types'
import TaskForm from './TaskForm'
import { format, isToday, isPast, parseISO } from 'date-fns'

const PRIORITY_COLORS: Record<string, string> = { low: '#6b7280', medium: '#f59e0b', high: '#ef4444' }
const STATUS_COLORS:   Record<string, string> = { pending: '#f59e0b', in_progress: '#3b82f6', completed: '#10b981' }
const STATUS_LABELS:   Record<string, string> = { pending: 'Pending', in_progress: 'In Progress', completed: 'Completed' }

interface Props { task: Task; dragHandleProps?: Record<string, unknown>; isDragging?: boolean }

export default function TaskCard({ task, dragHandleProps, isDragging }: Props) {
  const [editing, setEditing] = useState(false)
  const [hovered, setHovered] = useState(false)
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask()

  const isOverdue = task.due_date && !['completed'].includes(task.status) &&
    isPast(parseISO(task.due_date)) && !isToday(parseISO(task.due_date))

  async function toggleComplete() {
    await updateTask.mutateAsync({ id: task.id, data: { status: task.status === 'completed' ? 'pending' : 'completed' } })
  }

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#16161f',
          border: `1.5px solid ${isDragging ? '#7c6dfa' : hovered ? '#3e3e50' : '#2e2e3e'}`,
          borderRadius: 10, padding: '12px 14px',
          display: 'flex', alignItems: 'flex-start', gap: 10,
          opacity: isDragging ? 0.5 : 1,
          transition: 'border-color 0.15s',
          cursor: 'default',
        }}
      >
        <div {...(dragHandleProps || {})} style={{
          color: hovered ? '#555568' : '#2e2e3e', fontSize: 16,
          marginTop: 1, cursor: 'grab', flexShrink: 0, transition: 'color 0.15s',
        }}>
          ⠿
        </div>

        <button onClick={toggleComplete} style={{
          width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 2,
          border: `2px solid ${task.status === 'completed' ? '#10b981' : '#3e3e50'}`,
          background: task.status === 'completed' ? '#10b981' : 'transparent',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}>
          {task.status === 'completed' && (
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <p style={{
              fontSize: 14, fontWeight: 500, lineHeight: 1.4, margin: 0,
              color: task.status === 'completed' ? '#555568' : '#ffffff',
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
            }}>
              {task.title}
            </p>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
              marginTop: 5, background: PRIORITY_COLORS[task.priority],
            }} />
          </div>

          {task.description && (
            <p style={{ fontSize: 12, color: '#555568', margin: '4px 0 0', lineHeight: 1.5 }}>
              {task.description}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 500,
              background: STATUS_COLORS[task.status] + '20',
              color: STATUS_COLORS[task.status],
            }}>
              {STATUS_LABELS[task.status]}
            </span>

            {task.category && (
              <span style={{
                fontSize: 11, padding: '2px 8px', borderRadius: 20,
                background: (task.category.color || '#7c6dfa') + '20',
                color: task.category.color || '#7c6dfa',
              }}>
                {task.category.name}
              </span>
            )}

            {task.due_date && (
              <span style={{ fontSize: 11, color: isOverdue ? '#ef4444' : '#8888a0' }}>
                {isOverdue ? '⚠ ' : ''}
                {isToday(parseISO(task.due_date)) ? 'Today' : format(parseISO(task.due_date), 'MMM d')}
              </span>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex', gap: 4,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.15s',
          flexShrink: 0,
        }}>
          <button
            onClick={() => setEditing(true)}
            title="Edit"
            style={{
              width: 28, height: 28, borderRadius: 7, border: 'none',
              background: '#2e2e3e', color: '#8888a0', cursor: 'pointer', fontSize: 13,
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#7c6dfa'; e.currentTarget.style.background = '#7c6dfa20' }}
            onMouseOut={e => { e.currentTarget.style.color = '#8888a0'; e.currentTarget.style.background = '#2e2e3e' }}
          >
            ✎
          </button>
          <button
            onClick={() => { if (confirm('Delete this task?')) deleteTask.mutate(task.id) }}
            title="Delete"
            style={{
              width: 28, height: 28, borderRadius: 7, border: 'none',
              background: '#2e2e3e', color: '#8888a0', cursor: 'pointer', fontSize: 13,
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = '#ef444420' }}
            onMouseOut={e => { e.currentTarget.style.color = '#8888a0'; e.currentTarget.style.background = '#2e2e3e' }}
          >
            ✕
          </button>
        </div>
      </div>

      {editing && <TaskForm task={task} onClose={() => setEditing(false)} />}
    </>
  )
}