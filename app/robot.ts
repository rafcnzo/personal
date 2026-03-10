import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Ganti dengan domain aslimu
  const baseUrl = 'https://rafcnzo.web.id'

  return {
    rules: {
      userAgent: '*',
      // Boleh mengindeks semua halaman publik
      allow: '/',
      // Larang Google mengindeks halaman dashboard/admin dan login
      disallow: ['/dashboard', '/login', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}