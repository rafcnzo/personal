'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function createSkill(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const percentage = parseInt(formData.get('percentage') as string)

  await supabase.from('skills').insert({ name, category, percentage })
  revalidatePath('/admin/skills')
  revalidatePath('/')
}

export async function updateSkill(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const percentage = parseInt(formData.get('percentage') as string)

  await supabase.from('skills').update({ name, category, percentage }).eq('id', id)
  revalidatePath('/admin/skills')
  revalidatePath('/')
}

export async function deleteSkill(id: number) {
  const supabase = await createClient()
  await supabase.from('skills').delete().eq('id', id)
  revalidatePath('/admin/skills')
  revalidatePath('/')
}