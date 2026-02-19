'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function updateBiodata(formData: FormData) {
  try {
    const supabase = await createClient()
    
    // 1. Ambil data teks biasa
    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const description = formData.get('description') as string
    const email = formData.get('email') as string
    const github_url = formData.get('github_url') as string
    const linkedin_url = formData.get('linkedin_url') as string
    const telepon = formData.get('telepon') as string // <-- Kolom baru

    // Siapkan object data untuk di-update
    const updateData: any = {
      name,
      role,
      description,
      email,
      github_url,
      linkedin_url,
      telepon,
    }

    // 2. Cek apakah ada file CV yang diupload
    const cvFile = formData.get('cv_file') as File | null

    if (cvFile && cvFile.size > 0) {
      // Bikin nama file unik biar gak bentrok kalau upload ulang
      const fileName = `cv-${Date.now()}-${cvFile.name}`

      // Upload ke Supabase Storage (bucket: 'portofolio_files')
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portofolio_files')
        .upload(fileName, cvFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(`Gagal upload CV: ${uploadError.message}`)
      }

      // Ambil URL Public dari file yang baru diupload
      const { data: publicUrlData } = supabase.storage
        .from('portofolio_files')
        .getPublicUrl(uploadData.path)

      // Masukkan URL tersebut ke dalam object updateData
      updateData.cv_path = publicUrlData.publicUrl
    }

    // 3. Update ke tabel database
    const { error } = await supabase
      .from('biodata')
      .update(updateData)
      .eq('id', 1)

    if (error) throw error

    revalidatePath('/admin/settings')
    revalidatePath('/')

    // Kembalikan status sukses ke client
    return { success: true, message: "Biodata berhasil diperbarui!" }
  } catch (error: any) {
    // Kembalikan status error ke client
    return { success: false, message: error.message || "Terjadi kesalahan." }
  }
}