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
    <Sidebar 
      collapsible="icon" 
      {...props} 
      className="bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 dark:from-blue-700 dark:via-blue-600 dark:to-blue-500 border-0 [&>aside]:rounded-r-[2rem] overflow-hidden"
    >
      {/* HEADER: Menu Title */}
      <SidebarHeader className="border-0 pb-8 pt-8 px-6">
        <h2 className="text-white font-bold text-2xl tracking-tight">Menu</h2>
      </SidebarHeader>

      {/* CONTENT: Menu Navigasi */}
      <SidebarContent className="border-0 px-0 py-0 flex-1 flex flex-col">
        <SidebarGroup className="border-0 px-0 py-3 flex-1">
          <SidebarGroupLabel className="hidden" />
          <SidebarGroupContent className="px-0 flex-1">
            <SidebarMenu className="gap-2 px-4 flex flex-col">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className="flex">
                    <SidebarMenuButton
                      asChild
                      className={`w-full h-11 rounded-full px-4 transition-all duration-300 ease-out font-medium text-sm flex items-center gap-3 ${
                        isActive
                          ? "bg-white text-blue-600 font-semibold shadow-md hover:shadow-lg scale-[1.02]"
                          : "text-white/80 hover:text-white hover:bg-white/20"
                      }`}
                      tooltip={item.title}
                    >
                      <Link href={item.url} className="flex items-center gap-3 w-full">
                        <item.icon className="size-5 flex-shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER: User Profile */}
      <SidebarFooter className="border-0 px-4 pb-6 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 px-3 text-white hover:bg-white/15 rounded-full transition-all duration-200 data-[state=open]:bg-white/20"
                >
                  <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-white/20 text-white font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="grid flex-1 text-left text-xs leading-tight ml-2">
                    <span className="truncate font-semibold capitalize">{user.name}</span>
                    <span className="truncate opacity-75 text-xs">{user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4 transition-transform duration-200" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-56 rounded-2xl mb-2"
              >
                <DropdownMenuItem asChild>
                  <form action={signOut} className="w-full">
                    <button type="submit" className="flex w-full items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer font-medium">
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