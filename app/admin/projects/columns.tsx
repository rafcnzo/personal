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
      
      // Logika warna badge kita pindah ke sini
      let colorClass = "bg-gray-100 text-gray-700 border-gray-200"
      if (status === "Completed") colorClass = "bg-green-100 text-green-700 border-green-200"
      if (status === "In Progress") colorClass = "bg-blue-100 text-blue-700 border-blue-200"

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
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