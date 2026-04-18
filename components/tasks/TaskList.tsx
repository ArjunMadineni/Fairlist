'use client'
import { useState } from 'react'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTasks, useReorderTasks } from '@/hooks/useTasks'
import type { Task, TaskFilters } from '@/types'
import TaskCard from './TaskCard'

function SortableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard task={task} dragHandleProps={{ ...attributes, ...listeners }} isDragging={isDragging} />
    </div>
  )
}

interface Props { filters: TaskFilters }

export default function TaskList({ filters }: Props) {
  const { data: tasks = [], isLoading } = useTasks(filters)
  const reorder = useReorderTasks()
  const [localTasks, setLocalTasks] = useState<Task[]>([])
  const displayTasks = localTasks.length ? localTasks : tasks

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = displayTasks.findIndex(t => t.id === active.id)
    const newIndex = displayTasks.findIndex(t => t.id === over.id)
    const reordered = arrayMove(displayTasks, oldIndex, newIndex)
    setLocalTasks(reordered)
    reorder.mutate(reordered.map(t => t.id))
  }

  if (isLoading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ height: 72, borderRadius: 10, background: '#16161f', border: '1.5px solid #2e2e3e' }} />
      ))}
    </div>
  )

  if (!displayTasks.length) return (
    <div style={{
      textAlign: 'center', padding: '48px 24px',
      background: '#16161f', border: '1.5px solid #2e2e3e',
      borderRadius: 12, color: '#555568',
    }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>◈</div>
      <p style={{ fontSize: 14, marginBottom: 4 }}>No tasks found</p>
      <p style={{ fontSize: 12 }}>Click "+ New task" above to add one</p>
    </div>
  )

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={displayTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {displayTasks.map(task => <SortableTaskCard key={task.id} task={task} />)}
        </div>
      </SortableContext>
    </DndContext>
  )
}