import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { taskSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')
  const category_id = searchParams.get('category_id')
  const search = searchParams.get('search')

  let query = supabase
    .from('tasks')
    .select('*, category:categories(id,name,color)')
    .eq('user_id', user.id)
    .order('sort_order', { ascending: true })

  if (status && status !== 'all') query = query.eq('status', status)
  if (priority && priority !== 'all') query = query.eq('priority', priority)
  if (category_id && category_id !== 'all') query = query.eq('category_id', category_id)
  if (search) query = query.ilike('title', `%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = taskSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  // Get max sort_order
  const { data: maxTask } = await supabase
    .from('tasks')
    .select('sort_order')
    .eq('user_id', user.id)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single()

  const sort_order = maxTask ? maxTask.sort_order + 1 : 0

  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...parsed.data, user_id: user.id, sort_order })
    .select('*, category:categories(id,name,color)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
