"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  ChevronUp,
  Mail,
  Wrench,
  Users,
  Palette,
  MenuIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

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
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/app/login/actions"

const NAV_ITEMS = [
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
    <Sidebar collapsible="icon" {...props} className="bg-black">
      <SidebarHeader
        className="border-0 px-4 pb-6 pt-8 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:pt-6 group-data-[collapsible=icon]:px-0"
      >
        <div className="flex w-full items-center justify-center group-data-[collapsible=icon]:justify-center">
          <h2 className="text-xl font-bold tracking-tight text-white group-data-[collapsible=icon]:hidden">
            Menu
          </h2>
          <div className="hidden size-8 items-center justify-center rounded-lg bg-white/10 text-white group-data-[collapsible=icon]:flex">
            <MenuIcon className="size-5" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-visible border-0 px-0 py-0">
        <SidebarGroup className="border-0 px-0 py-2">
          <SidebarGroupLabel className="hidden" />
          <SidebarGroupContent className="px-0">
            <SidebarMenu className="gap-2 pl-4 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pl-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className="relative">
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={
                        isActive
                          ? "h-12 w-full rounded-l-full rounded-r-none bg-white font-semibold text-black shadow-none transition-none hover:bg-white hover:text-black group-data-[collapsible=icon]:!rounded-md relative z-10"
                          : "h-12 w-full rounded-lg font-medium text-white/70 transition-none hover:bg-white/10 hover:text-white group-data-[collapsible=icon]:!rounded-md"
                      }
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-4">
                        <item.icon
                          className={`size-5 shrink-0 ${isActive ? "text-black" : "text-white"}`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                    {isActive && (
                      <div
                        className="absolute -right-px top-0 bottom-0 z-0 w-5 pointer-events-none group-data-[collapsible=icon]:hidden"
                        aria-hidden
                      >
                        <div className="absolute -top-5 right-0 h-5 w-5 bg-white">
                          <div className="absolute inset-0 rounded-br-full bg-black" />
                        </div>
                        <div className="absolute -bottom-5 right-0 h-5 w-5 bg-white">
                          <div className="absolute inset-0 rounded-tr-full bg-black" />
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

      <SidebarFooter className="mx-3 mb-4 rounded-2xl border-0 bg-white/10 p-3 group-data-[collapsible=icon]:mx-2 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 rounded-xl text-white hover:bg-white/20 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-lg"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-sm font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold capitalize">{user?.name}</span>
                    <span className="truncate opacity-80">{user?.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56 rounded-lg">
                <DropdownMenuItem asChild>
                  <form action={signOut} className="w-full">
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer items-center gap-2 text-red-600"
                    >
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
    </Sidebar>
  )
}