'use client'

import { useState, useEffect } from "react"
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
import { Plus, Pencil, ImagePlus, X, Link as LinkIcon, Cpu } from "lucide-react"
import { toast } from "sonner"

function parseImagePaths(value: string | null | undefined): string[] {
  if (!value || value.trim() === '') return []
  try {
    const parsed = JSON.parse(value) as unknown
    return Array.isArray(parsed) ? parsed.filter((u): u is string => typeof u === 'string') : []
  } catch {
    return []
  }
}

// Sinkronisasi tipe data dengan columns.tsx
type Project = {
  id?: number
  title?: string
  category?: string
  status?: string
  image_path?: string | null
  url_link?: string
  stack?: any
}

export function ProjectSheet({ project }: { project?: Project }) {
  const [open, setOpen] = useState(false)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [stacks, setStacks] = useState<string[]>([])
  const [stackInput, setStackInput] = useState("")
  
  const isEdit = !!project

  useEffect(() => {
    if (open) {
      if (project?.image_path) {
        setExistingImages(parseImagePaths(project.image_path))
      } else {
        setExistingImages([])
      }

      // Handle parsing stack saat edit
      if (project?.stack) {
        if (Array.isArray(project.stack)) {
          setStacks(project.stack)
        } else if (typeof project.stack === 'object' && Array.isArray(project.stack.tech)) {
          setStacks(project.stack.tech)
        }
      } else {
        setStacks([])
      }
    }
  }, [open, project])

  const addStack = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && stackInput.trim() !== '') {
      e.preventDefault()
      if (!stacks.includes(stackInput.trim())) {
        setStacks([...stacks, stackInput.trim()])
      }
      setStackInput("")
    }
  }

  const removeStack = (index: number) => {
    setStacks(stacks.filter((_, i) => i !== index))
  }

  async function handleSubmit(formData: FormData) {
    try {
      // Masukkan stack array sebagai JSON string agar action bisa memprosesnya
      formData.append('stack', JSON.stringify(stacks))
      
      if (isEdit) {
        await updateProject(formData)
        toast.success("Project berhasil diupdate!")
      } else {
        await createProject(formData)
        toast.success("Project berhasil dibuat!")
      }
      setOpen(false)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal menyimpan")
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="icon" className="size-8">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Project
          </Button>
        )}
      </SheetTrigger>
      
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-xl tracking-tight">{isEdit ? "Edit Project" : "Project Baru"}</SheetTitle>
          <SheetDescription className="text-muted-foreground text-sm leading-relaxed">
            {isEdit ? "Ubah detail project di sini." : "Tambahkan project baru ke portofolio kamu."}
          </SheetDescription>
        </SheetHeader>

        <form action={handleSubmit} className="flex flex-col flex-1 min-h-0 mt-6">
          {isEdit && <input type="hidden" name="id" value={project.id} />}
          <input type="hidden" name="existing_images" value={JSON.stringify(existingImages)} />

          <div className="flex-1 overflow-y-auto px-1">
            <div className="space-y-6 pb-8">
              {/* Judul */}
              <div className="space-y-2">
                <Label htmlFor="title" className="font-medium text-sm">Judul Project</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={project?.title}
                  required
                  placeholder="Contoh: Website Toko Online"
                  className="h-10 rounded-lg"
                />
              </div>

              {/* Kategori & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-medium text-sm">Kategori</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={project?.category}
                    required
                    placeholder="Web App"
                    className="h-10 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="font-medium text-sm">Status</Label>
                  <Select name="status" defaultValue={project?.status || "Draft"}>
                    <SelectTrigger className="h-10 rounded-lg">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* URL Link */}
              <div className="space-y-2">
                <Label htmlFor="url_link" className="font-medium text-sm flex items-center gap-2">
                  <LinkIcon className="size-3.5" /> URL Link (Opsional)
                </Label>
                <Input
                  id="url_link"
                  name="url_link"
                  type="url"
                  defaultValue={project?.url_link}
                  placeholder="https://github.com/... atau https://demo.com"
                  className="h-10 rounded-lg"
                />
              </div>

              {/* Tech Stack (Tag Input) */}
              <div className="space-y-2">
                <Label className="font-medium text-sm flex items-center gap-2">
                  <Cpu className="size-3.5" /> Tech Stack
                </Label>
                <div className="flex flex-wrap gap-2 p-2 min-h-12 border rounded-lg bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
                  {stacks.map((s, i) => (
                    <span key={i} className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium border border-border">
                      {s}
                      <button type="button" onClick={() => removeStack(i)} className="hover:text-destructive">
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    value={stackInput}
                    onChange={(e) => setStackInput(e.target.value)}
                    onKeyDown={addStack}
                    placeholder={stacks.length === 0 ? "Ketik stack lalu Enter (misal: Laravel)" : "Tambah lagi..."}
                    className="flex-1 bg-transparent outline-none text-sm min-w-[120px]"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground italic">*Tekan Enter untuk menambahkan teknologi.</p>
              </div>

              {/* Gambar */}
              <div className="space-y-3">
                <Label className="font-medium text-sm flex items-center gap-2">
                  <ImagePlus className="size-3.5" /> Gambar Project
                </Label>
                
                {existingImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {existingImages.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="relative group rounded-lg overflow-hidden border border-border bg-muted/30 aspect-square"
                      >
                        <img src={url} alt="" className="size-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setExistingImages(prev => prev.filter((_, i) => i !== index))}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="size-5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Input
                    id="images"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="h-10 rounded-lg cursor-pointer file:mr-2 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">Support multiple upload. Format: JPG, PNG, WebP.</p>
              </div>
            </div>
          </div>

          <SheetFooter className="pt-4 border-t mt-auto">
            <SheetClose asChild>
              <Button variant="outline" type="button" className="rounded-lg">Batal</Button>
            </SheetClose>
            <SubmitButton className="rounded-lg px-8">Simpan Project</SubmitButton>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}