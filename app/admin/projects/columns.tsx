"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProjectSheet } from "@/components/admin/project-sheet"
import { DeleteButton } from "@/components/admin/delete-button"
import { ExternalLink } from "lucide-react"

function parseImagePaths(value: string | null | undefined): string[] {
  if (!value || value.trim() === "") return []
  try {
    const parsed = JSON.parse(value) as unknown
    return Array.isArray(parsed) ? parsed.filter((u): u is string => typeof u === "string") : []
  } catch {
    return []
  }
}

// Perbaikan Tipe Data agar sinkron dengan ProjectSheet
export type Project = {
  id: number
  created_at: string
  title?: string // Ubah dari string | null ke optional string
  category?: string
  status?: string
  image_path?: string
  url_link?: string
  stack?: any 
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "title",
    header: "Judul Project",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title") || "No Title"}</div>,
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => <div>{row.getValue("category") || "—"}</div>,
  },
  {
    accessorKey: "image_path",
    header: "Gambar",
    cell: ({ row }) => {
      const urls = parseImagePaths(row.getValue("image_path") as string | null)
      if (urls.length === 0) return <span className="text-muted-foreground text-sm">—</span>
      return (
        <div className="flex -space-x-2">
          {urls.slice(0, 3).map((url, i) => (
            <div
              key={i}
              className="relative size-9 rounded-md border-2 border-background overflow-hidden bg-muted shrink-0"
            >
              <img src={url} alt="" className="size-full object-cover" />
            </div>
          ))}
          {urls.length > 3 && (
            <span className="flex size-9 items-center justify-center rounded-md bg-muted text-xs font-medium border-2 border-background">
              +{urls.length - 3}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "url_link",
    header: "Link",
    cell: ({ row }) => {
      const url = row.getValue("url_link") as string | undefined
      if (!url) return <span className="text-muted-foreground text-sm">—</span>
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          View <ExternalLink className="size-3" />
        </a>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string) || "Draft"

      let colorClass = "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
      if (status === "Completed") colorClass = "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border border-green-200 dark:border-green-800"
      if (status === "In Progress") colorClass = "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
      if (status === "Draft") colorClass = "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800"

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "stack",
    header: "Stack",
    cell: ({ row }) => {
      const stack = row.getValue("stack")
      if (!stack) return <span className="text-muted-foreground text-sm">—</span>
      
      let stackArr: string[] = []
      
      if (Array.isArray(stack)) {
        stackArr = stack
      } else if (typeof stack === "object" && stack !== null) {
        // Gunakan type assertion record untuk menghindari error "Property does not exist on type object"
        const s = stack as Record<string, any>
        const potentialArray = s.tech || s.stack || s.data
        if (Array.isArray(potentialArray)) {
          stackArr = potentialArray
        }
      }

      if (stackArr.length === 0) return <span className="text-muted-foreground text-sm">—</span>
      
      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {stackArr.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300 rounded text-[10px] border border-slate-200 dark:border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const project = row.original

      return (
        <div className="flex justify-end gap-2">
          <ProjectSheet project={project} />
          <DeleteButton id={project.id} />
        </div>
      )
    },
  },
]