import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional().nullable(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'in_progress', 'completed']),
  due_date: z.string().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
})

export const reorderSchema = z.object({
  ids: z.array(z.string().uuid()),
})

export const categorySchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
})

export type TaskInput = z.infer<typeof taskSchema>
export type CategoryInput = z.infer<typeof categorySchema>
