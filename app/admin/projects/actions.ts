'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
export async function createProject(formData: FormData) {
    const supabase = await createClient()
    
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const status = formData.get('status') as string
  
    await supabase.from('projects').insert({
      title,
      category,
      status,
    })
  
    revalidatePath('/admin/projects') // Refresh tabel otomatis
  }
  
  // 2. UPDATE
  export async function updateProject(formData: FormData) {
    const supabase = await createClient()
    
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const status = formData.get('status') as string
  
    await supabase
      .from('projects')
      .update({ title, category, status })
      .eq('id', id)
  
    revalidatePath('/admin/projects')
  }
  
  // 3. DELETE
  export async function deleteProject(id: number) {
    const supabase = await createClient()
  
    await supabase.from('projects').delete().eq('id', id)
  
    revalidatePath('/admin/projects')
  }