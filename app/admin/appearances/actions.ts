'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function updateAppearance(formData: FormData) {
  try {
    const supabase = await createClient()
    
    const title = formData.get('title') as string
    const theme_color = formData.get('theme_color') as string

    const updateData: any = {
      title,
      theme_color,
    }

    // Cek apakah ada file favicon (icon) yang diupload
    const faviconFile = formData.get('favicon_file') as File | null
    
    if (faviconFile && faviconFile.size > 0) {
      // Pastikan nama unik
      const fileName = `favicon-${Date.now()}-${faviconFile.name}`

      // Upload ke bucket yang sama dengan CV
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portofolio_files')
        .upload(fileName, faviconFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(`Gagal upload icon: ${uploadError.message}`)
      }

      // Ambil public URL
      const { data: publicUrlData } = supabase.storage
        .from('portofolio_files')
        .getPublicUrl(uploadData.path)

      updateData.favicon_url = publicUrlData.publicUrl
    }

    // Update tabel site_settings id = 1
    const { error } = await supabase
      .from('site_settings')
      .update(updateData)
      .eq('id', 1)

    if (error) throw error

    revalidatePath('/admin/appearance')
    revalidatePath('/')
    
    return { success: true, message: "Pengaturan tampilan berhasil disimpan!" }

  } catch (error: any) {
    return { success: false, message: error.message || "Terjadi kesalahan saat menyimpan." }
  }
}