export type Priority = 'low' | 'medium' | 'high'
export type Status = 'pending' | 'in_progress' | 'completed'

export interface Category {
  id: string
  user_id: string
  name: string
  color: string
  created_at: string
}

export interface Task {
  id: string
  user_id: string
  category_id: string | null
  title: string
  description: string | null
  priority: Priority
  status: Status
  due_date: string | null
  sort_order: number
  created_at: string
  updated_at: string
  category?: Category
}

export interface DashboardStats {
  total: number
  pending: number
  completed: number
  high_priority: number
}

export interface TaskFilters {
  status?: Status | 'all'
  priority?: Priority | 'all'
  category_id?: string | 'all'
  search?: string
}
