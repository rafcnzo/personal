"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProjectSheet } from "@/components/admin/project-sheet"
import { DeleteButton } from "@/components/admin/delete-button"

// Definisi tipe data sesuai Supabase kamu
export type Project = {
  id: number
  title: string
  category: string
  status: string
  created_at: string
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "index",
    header: "No",
    // Cara bikin nomor urut (index + 1)
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "title",
    header: "Judul Project",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category",
    header: "Kategori",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      
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
    id: "actions",
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row }) => {
      const project = row.original // Ini cara ambil data object project
 
      return (
        <div className="flex justify-end gap-2">
           {/* Tombol UPDATE */}
           <ProjectSheet project={project} />
           
           {/* Tombol DELETE */}
           <DeleteButton id={project.id} />
        </div>
      )
    },
  },
]
