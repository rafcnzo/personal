'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

const BUCKET = 'portofolio_files'

function parseImagePaths(value: string | null): string[] {
  if (!value || value.trim() === '') return []
  try {
    const parsed = JSON.parse(value) as unknown
    return Array.isArray(parsed) ? parsed.filter((u): u is string => typeof u === 'string') : []
  } catch {
    return []
  }
}

async function uploadProjectImages(supabase: Awaited<ReturnType<typeof createClient>>, files: File[]): Promise<string[]> {
  const urls: string[] = []
  for (const file of files) {
    if (!file.size) continue
    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    if (error) throw new Error(`Gagal upload ${file.name}: ${error.message}`)
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
    urls.push(urlData.publicUrl)
  }
  return urls
}

export async function createProject(formData: FormData) {
  try {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const status = formData.get('status') as string
    const url_link = formData.get('url_link') as string // Tambahan: URL Link

    // Menangani Multiple Stack
    // Jika frontend mengirim stack[] atau banyak input bernama 'stack'
    const stackRaw = formData.getAll('stack') as string[]
    // Jika frontend mengirim JSON string (misal dari state react)
    const stack = stackRaw.length === 1 && stackRaw[0].startsWith('[') 
      ? JSON.parse(stackRaw[0]) 
      : stackRaw

    const files = (formData.getAll('images') as File[]).filter(f => f && f.size > 0)
    const uploadedUrls = await uploadProjectImages(supabase, files)
    const image_path = uploadedUrls.length ? JSON.stringify(uploadedUrls) : null

    const { error } = await supabase.from('projects').insert({
      title,
      category,
      status,
      url_link, // Simpan URL Link
      stack,    // Simpan JSONB Array
      image_path,
    })

    if (error) throw new Error(error.message)
    revalidatePath('/admin/projects')
  } catch (e) {
    throw e
  }
}

export async function updateProject(formData: FormData) {
  try {
    const supabase = await createClient()

    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const status = formData.get('status') as string
    const url_link = formData.get('url_link') as string // Tambahan: URL Link

    // Menangani Multiple Stack
    const stackRaw = formData.getAll('stack') as string[]
    const stack = stackRaw.length === 1 && stackRaw[0].startsWith('[') 
      ? JSON.parse(stackRaw[0]) 
      : stackRaw

    const existingJson = formData.get('existing_images') as string | null
    const keepUrls = parseImagePaths(existingJson || null)
    const newFiles = (formData.getAll('images') as File[]).filter(f => f && f.size > 0)
    const newUrls = await uploadProjectImages(supabase, newFiles)
    const allUrls = [...keepUrls, ...newUrls]
    const image_path = allUrls.length ? JSON.stringify(allUrls) : null

    const { error } = await supabase
      .from('projects')
      .update({ 
        title, 
        category, 
        status, 
        url_link, // Update URL Link
        stack,    // Update JSONB Array
        image_path 
      })
      .eq('id', id)

    if (error) throw new Error(error.message)
    revalidatePath('/admin/projects')
  } catch (e) {
    throw e
  }
}

export async function deleteProject(id: number) {
  try {
    const supabase = await createClient()
    
    // Ambil data project dulu untuk menghapus gambar di storage (opsional tapi disarankan)
    const { data: project } = await supabase
      .from('projects')
      .select('image_path')
      .eq('id', id)
      .single()

    if (project?.image_path) {
      const paths = parseImagePaths(project.image_path)
      // Logika hapus file dari storage bisa ditambahkan di sini
    }

    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw new Error(error.message)

    revalidatePath('/admin/projects')
  } catch (e) {
    throw e
  }
}