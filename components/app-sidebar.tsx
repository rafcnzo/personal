"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  GalleryVerticalEnd,
  User2,
  ChevronUp,
  Mail,
  Wrench,
  Users,
  Palette,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { signOut } from "@/app/login/actions"

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Projects", url: "/admin/projects", icon: FileText },
  { title: "Skills", url: "/admin/skills", icon: Wrench },
  { title: "Experiences", url: "/admin/experiences", icon: Users },
  { title: "Inbox", url: "/admin/messages", icon: Mail },
  { title: "Appearance", url: "/admin/appearances", icon: Palette },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

export function AppSidebar({ user, ...props }: { user: any } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    // 1. Ubah background sidebar jadi Hitam legam
    <Sidebar collapsible="icon" {...props} className="bg-black border-0">
      
      {/* HEADER */}
      <SidebarHeader className="border-0 pb-6 pt-8">
        <div className="px-4 py-2">
          <h2 className="text-white font-bold text-xl tracking-tight">Menu</h2>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      {/* overflow-visible penting agar efek lengkung tidak terpotong */}
      <SidebarContent className="border-0 px-0 py-0 flex-1 overflow-visible">
        <SidebarGroup className="border-0 px-0 py-2">
          <SidebarGroupLabel className="hidden" />
          <SidebarGroupContent className="px-0">
            
            {/* pl-4 memberi jarak di kiri, tapi menempel penuh di kanan */}
            <SidebarMenu className="gap-2 pl-4">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className="relative">
                    <SidebarMenuButton
                      asChild
                      className={`h-12 w-full rounded-l-full rounded-r-none transition-none ${
                        isActive
                          ? "bg-background text-foreground font-semibold shadow-none hover:bg-background hover:text-foreground"
                          : "text-white/70 hover:bg-white/10 hover:text-white font-medium"
                      }`}
                      tooltip={item.title}
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-4">
                        <item.icon className={`size-5 flex-shrink-0 ${isActive ? "text-foreground" : "text-white/70"}`} />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                    {/* === EFEK CURVED OUTSIDE === */}
                    {/* Hanya dirender pada menu yang sedang aktif */}
                    {isActive && (
                      <div className="absolute right-0 top-0 bottom-0 w-5 pointer-events-none">
                        {/* Lengkungan Atas */}
                        <div className="absolute -top-5 right-0 w-5 h-5 bg-background">
                          <div className="absolute inset-0 bg-black rounded-br-full" />
                        </div>
                        {/* Lengkungan Bawah */}
                        <div className="absolute -bottom-5 right-0 w-5 h-5 bg-background">
                          <div className="absolute inset-0 bg-black rounded-tr-full" />
                        </div>
                      </div>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-0 bg-white/10 backdrop-blur-sm mx-3 mb-4 rounded-2xl p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="h-12 text-white hover:bg-white/20 rounded-xl">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20 text-white font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-semibold capitalize">{user?.name}</span>
                    <span className="truncate opacity-80">{user?.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56 rounded-lg">
                <DropdownMenuItem asChild>
                  <form action={signOut} className="w-full">
                    <button type="submit" className="flex w-full items-center gap-2 text-red-600 cursor-pointer">
                      <LogOut className="size-4" />
                      <span>Log out</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}