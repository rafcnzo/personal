'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createProject, updateProject } from "@/app/admin/projects/actions"
import { SubmitButton } from "@/components/submit-button"
import { Plus, Pencil } from "lucide-react"
import { toast } from "sonner"

// Tipe data project
type Project = {
  id?: number
  title?: string
  category?: string
  status?: string
}

export function ProjectSheet({ project }: { project?: Project }) {
  const [open, setOpen] = useState(false) // Untuk kontrol buka/tutup drawer
  const isEdit = !!project // Cek apakah ini mode edit

  // Wrapper untuk handle submit biar bisa kasih notifikasi & tutup drawer
  async function handleSubmit(formData: FormData) {
    if (isEdit) {
      await updateProject(formData)
      toast.success("Project berhasil diupdate!")
    } else {
      await createProject(formData)
      toast.success("Project berhasil dibuat!")
    }
    setOpen(false) // Tutup drawer otomatis
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* Tombol Pemicu: Kalau Edit icon Pensil, Kalau Baru tombol Tambah */}
        {isEdit ? (
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Project
          </Button>
        )}
      </SheetTrigger>
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Project" : "Project Baru"}</SheetTitle>
          <SheetDescription>
            {isEdit ? "Ubah detail project di sini." : "Tambahkan project baru ke portofolio."}
          </SheetDescription>
        </SheetHeader>

        {/* FORM */}
        <form action={handleSubmit} className="space-y-4 mt-4">
          {/* Hidden Input ID (Wajib untuk Edit) */}
          {isEdit && <input type="hidden" name="id" value={project.id} />}
          
          <div className="space-y-2">
            <Label htmlFor="title">Judul Project</Label>
            <Input 
              id="title" 
              name="title" 
              defaultValue={project?.title} 
              required 
              placeholder="Contoh: Website Toko Online" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Input 
              id="category" 
              name="category" 
              defaultValue={project?.category} 
              required 
              placeholder="Contoh: Web App / UI Design" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            {/* Trik: Pakai name="status" di Select Shadcn biar kebaca FormData */}
            <Select name="status" defaultValue={project?.status || "Draft"}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SheetFooter className="mt-8">
            <SheetClose asChild>
              <Button variant="outline" type="button">Batal</Button>
            </SheetClose>
            <SubmitButton>Simpan</SubmitButton>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}