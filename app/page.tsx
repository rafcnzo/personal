import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { ExternalLink, Github, Mail, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. METADATA & OPEN GRAPH
// Ini yang bikin web kamu punya thumbnail rapi saat di-share di WA/LinkedIn/Twitter
export const metadata: Metadata = {
  title: "Afriza - Fullstack Developer",
  description: "Seorang Fullstack Developer yang fokus membangun aplikasi web yang bersih, cepat, dan fungsional menggunakan Laravel & Next.js.",
  openGraph: {
    title: "Afriza - Fullstack Developer",
    description: "Portfolio Afriza, Fullstack Developer spesialis Laravel & Next.js.",
    url: "https://domainkamu.com", // JANGAN LUPA: Ganti dengan domain aslimu
    siteName: "Afriza Portfolio",
    images: [
      {
        url: "/og-image.jpg", // JANGAN LUPA: Taruh file gambar bernama og-image.jpg di dalam folder public/
        width: 1200,
        height: 630,
        alt: "Afriza Portfolio Thumbnail",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afriza - Fullstack Developer",
    description: "Portfolio web modern menggunakan Next.js dan Supabase.",
    images: ["/og-image.jpg"],
  },
};

export default async function Home() {
  const supabase = await createClient();
  
  // Ambil 3 project terbaru untuk ditampilkan di landing page
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "Completed")
    .order("created_at", { ascending: false })
    .limit(3);

  // 2. STRUCTURED DATA (JSON-LD)
  // Ini "KTP" digital agar Google langsung paham siapa kamu tanpa harus menebak teks
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Afriza",
    jobTitle: "Fullstack Developer",
    description: "Seorang Fullstack Developer yang fokus membangun aplikasi web yang bersih, cepat, dan fungsional menggunakan Laravel & Next.js.",
    url: "https://domainkamu.com", // Ganti dengan domain aslimu
    sameAs: [
      "https://github.com/rafcnzo", // Link Github kamu
      // "https://linkedin.com/in/usernamekamu" // Bisa di-uncomment jika ada LinkedIn
    ]
  };

  return (
    // 3. SEMANTIC HTML: Mengganti <div> terluar menjadi <main>
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* Inject script JSON-LD ke dalam DOM secara aman */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium">Available for new projects</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
            Building digital <br /> 
            <span className="text-zinc-500">experiences & products.</span>
          </h1>
          
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Halo, saya <span className="text-black dark:text-white font-medium">Afriza</span>. 
            Seorang Fullstack Developer yang fokus membangun aplikasi web yang bersih, cepat, dan fungsional menggunakan Laravel & Next.js.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Button asChild className="rounded-full px-8">
              <Link href="/admin">Daftar Project</Link>
            </Button>
            <div className="flex items-center gap-3 ml-2">
              <a href="https://github.com/rafcnzo" target="_blank" rel="noopener noreferrer" aria-label="Github Profile" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
                <Github className="size-5" />
              </a>
              <a href="mailto:emailkamu@gmail.com" aria-label="Send Email" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
                <Mail className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            <p className="text-zinc-500 text-sm mt-1">Beberapa karya terbaik yang pernah saya buat.</p>
          </div>
          <Link href="/projects" className="text-sm font-medium hover:underline">Lihat Semua →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project) => (
            <div key={project.id} className="group flex flex-col gap-4">
              <div className="aspect-[16/10] relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                {project.image_path ? (
                  // 4. CORE WEB VITALS: Ganti <img> standar pakai Next/Image dengan properti 'fill'
                  <Image 
                    src={JSON.parse(project.image_path)[0]} 
                    alt={project.title || "Project preview"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-400">
                    <Terminal className="size-10" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  {project.url_link && (
                    <a href={project.url_link} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded">
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2">{project.category}</p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(project.stack) && project.stack.slice(0, 3).map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-[10px] font-medium rounded border border-zinc-200 dark:border-zinc-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto px-6 py-20 text-center border-t border-zinc-100 dark:border-zinc-900">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Afriza Portofolio. Built with Next.js & Supabase.
        </p>
      </footer>
    </main>
  );
}