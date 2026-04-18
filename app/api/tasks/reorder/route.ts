import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { reorderSchema } from '@/lib/validations'

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const parsed = reorderSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const updates = parsed.data.ids.map((id, index) =>
    supabase.from('tasks').update({ sort_order: index }).eq('id', id).eq('user_id', user.id)
  )

  await Promise.all(updates)
  return NextResponse.json({ ok: true })
}
