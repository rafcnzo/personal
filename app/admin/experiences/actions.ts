'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function createExperience(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: (formData.get('title') as string) ?? '',
    company: (formData.get('company') as string) ?? '',
    start_date: (formData.get('start_date') as string) ?? '',
    end_date: (formData.get('end_date') as string) ?? '',
    description: (formData.get('description') as string) ?? '',
    type: (formData.get('type') as string) || 'Work',
  }

  const { error } = await supabase.from('experiences').insert(data)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/experiences')
}

export async function updateExperience(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const data = {
    title: formData.get('title') as string,
    company: formData.get('company') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string,
    description: formData.get('description') as string,
    type: formData.get('type') as string,
  }

  const { error } = await supabase.from('experiences').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/experiences')
}

export async function deleteExperience(id: number) {
  const supabase = await createClient()
  const { error } = await supabase.from('experiences').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/experiences')
}