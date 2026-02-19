'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

// 1. Tandai pesan sudah dibaca
export async function markAsRead(id: number) {
  const supabase = await createClient()
  
  await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', id)

  revalidatePath('/admin/messages')
}

// 2. Hapus pesan
export async function deleteMessage(id: number) {
  const supabase = await createClient()

  await supabase
    .from('messages')
    .delete()
    .eq('id', id)

  revalidatePath('/admin/messages')
}