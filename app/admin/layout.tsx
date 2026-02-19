import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { createClient } from "@/utils/supabase/server" // 1. Import Supabase
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 2. Ambil User saat ini di Server
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // (Opsional) Double check keamanan, kalau gak ada user, tendang keluar
  if (!user) {
    redirect("/login")
  }

  // 3. Siapkan data user yang rapi untuk dikirim ke Sidebar
  const userData = {
    name: user.email?.split("@")[0] || "Admin", // Ambil nama dari depan email
    email: user.email || "No Email",
    avatar: "", // Kosongkan, nanti kita pakai inisial huruf
  }

  return (
    <SidebarProvider>
      {/* 4. LEMPAR DATA USER KE SIDEBAR SEBAGAI PROP */}
      <AppSidebar user={userData} />
      
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-border/50 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin" className="transition-colors hover:text-foreground">Admin</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-foreground">Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-6 pt-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
