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
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: FileText,
  },
  {
    title: "Skills",
    url: "/admin/skills",
    icon: Wrench,
  },
  {
    title: "Experiences",
    url: "/admin/experiences",
    icon: Users,
  },
  {
    title: "Inbox",
    url: "/admin/messages",
    icon: Mail,
  },
  {
    title: "Appearance",
    url: "/admin/appearances",
    icon: Palette,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AppSidebar({ user, ...props }: { user: any } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props} className="bg-gradient-to-b from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 border-0">
      {/* HEADER: Menu Title */}
      <SidebarHeader className="border-0 pb-6 pt-8">
        <div className="px-4 py-2">
          <h2 className="text-white font-bold text-xl tracking-tight">Menu</h2>
        </div>
      </SidebarHeader>

      {/* CONTENT: Menu Navigasi */}
      <SidebarContent className="border-0 px-0 py-0 flex-1">
        <SidebarGroup className="border-0 px-0 py-2">
          <SidebarGroupLabel className="hidden" />
          <SidebarGroupContent className="px-0">
            <SidebarMenu className="gap-1.5">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <div className="px-2">
                      <SidebarMenuButton
                        asChild
                        className={`h-11 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-white text-blue-600 font-semibold shadow-lg hover:bg-white hover:shadow-lg"
                            : "text-white/85 hover:text-white hover:bg-white/15 font-medium"
                        }`}
                        tooltip={item.title}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-4">
                          <item.icon className="size-5 flex-shrink-0" />
                          <span className="text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </div>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER: User Profile */}
      <SidebarFooter className="border-0 bg-white/10 backdrop-blur-sm mx-3 mb-4 rounded-2xl p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 text-white hover:bg-white/20 rounded-xl"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20 text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-semibold capitalize">{user.name}</span>
                    <span className="truncate opacity-80">{user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-56 rounded-lg"
              >
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
