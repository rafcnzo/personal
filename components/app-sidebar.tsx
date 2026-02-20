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
      className="bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 dark:from-blue-700 dark:via-blue-600 dark:to-blue-500 border-0"
    >
      {/* HEADER */}
      <SidebarHeader className="border-0 pb-6 pt-8 px-6 group-data-[collapsible=icon]:px-2 transition-all duration-300">
        <h2 className="text-white font-bold text-2xl tracking-tight group-data-[collapsible=icon]:text-center group-data-[collapsible=icon]:text-base transition-all duration-300">Menu</h2>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="border-0 px-0 py-2 flex-1 transition-all duration-300">
        <SidebarGroup className="border-0 px-0 py-2 transition-all duration-300">
          <SidebarGroupLabel className="hidden" />
          <SidebarGroupContent className="px-0 transition-all duration-300">
            <SidebarMenu className="gap-2 px-3 transition-all duration-300">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className="transition-all duration-300">
                    <SidebarMenuButton
                      asChild
                      className={`rounded-full transition-all duration-300 h-10 px-4 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:justify-center ${
                        isActive
                          ? "bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl"
                          : "text-white/85 hover:text-white hover:bg-white/20"
                      }`}
                      tooltip={item.title}
                    >
                      <Link href={item.url} className="flex items-center gap-3 w-full justify-start group-data-[collapsible=icon]:justify-center">
                        <item.icon className="size-5 flex-shrink-0" />
                        <span className="text-sm group-data-[collapsible=icon]:hidden transition-all duration-300">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-0 px-3 pb-6 pt-4 transition-all duration-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-10 px-3 text-white hover:bg-white/15 rounded-full transition-all duration-300 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:justify-center"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/25 text-white font-bold text-xs flex-shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="grid flex-1 text-left text-xs leading-tight ml-2 group-data-[collapsible=icon]:hidden transition-all duration-300">
                    <span className="truncate font-semibold capitalize">{user.name}</span>
                    <span className="truncate opacity-75">{user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4 group-data-[collapsible=icon]:hidden transition-all duration-300" />
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