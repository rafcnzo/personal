'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Ambil data dari form HTML
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Proses Login ke Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Kalau gagal, balik ke login dengan pesan error
    return redirect(`/login?error=${encodeURIComponent(error.message || 'Gagal login, cek email/password')}`)
  }

  // Kalau sukses, refresh cache & lempar ke admin
  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function signOut() {
    const supabase = await createClient()
    
    // Hapus sesi user
    await supabase.auth.signOut()
    
    // Kembalikan ke halaman login
    return redirect('/login')
  }