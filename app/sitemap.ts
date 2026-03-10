import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ganti dengan domain aslimu yang sudah nyambung di Cloudflare
  const baseUrl = 'https://rafcnzo.web.id'
  
  const supabase = await createClient()

  // Ambil data project untuk URL dinamis (kalau misal nanti kamu punya halaman detail project)
  const { data: projects } = await supabase
    .from('projects')
    .select('id, created_at')
    .eq('status', 'Completed')

  // 1. Daftarkan halaman utama statis
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1, // Prioritas tertinggi untuk halaman depan (nama kamu)
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // 2. Daftarkan halaman dinamis dari database (opsional)
  const dynamicRoutes: MetadataRoute.Sitemap = projects?.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.created_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  })) ?? []

  // Gabungkan semuanya
  return [...staticRoutes, ...dynamicRoutes]
}