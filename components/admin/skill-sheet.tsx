'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createSkill, updateSkill } from "@/app/admin/skills/actions"
import { SubmitButton } from "@/components/submit-button"
import { Plus, Pencil } from "lucide-react"
import { toast } from "sonner"

type Skill = {
  id?: number
  name?: string
  category?: string
  percentage?: number
}

export function SkillSheet({ skill }: { skill?: Skill }) {
  const [open, setOpen] = useState(false)
  const isEdit = !!skill

  async function handleSubmit(formData: FormData) {
    if (isEdit) {
      await updateSkill(formData)
      toast.success("Skill berhasil diupdate!")
    } else {
      await createSkill(formData)
      toast.success("Skill berhasil ditambahkan!")
    }
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
        ) : (
          <Button><Plus className="mr-2 h-4 w-4" /> Tambah Skill</Button>
        )}
      </SheetTrigger>
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl tracking-tight">{isEdit ? "Edit Skill" : "Tambah Skill Baru"}</SheetTitle>
          <SheetDescription className="text-muted-foreground text-sm leading-relaxed">
            Masukkan nama keahlian dan tingkat penguasaanmu.
          </SheetDescription>
        </SheetHeader>

        <form action={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {isEdit && <input type="hidden" name="id" value={skill.id} />}

          <div className="flex-1 overflow-y-auto px-6 pb-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium text-sm">Nama Skill</Label>
                <Input id="name" name="name" defaultValue={skill?.name} required placeholder="Contoh: React.js / Komunikasi" className="h-10 rounded-lg" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="font-medium text-sm">Kategori</Label>
                <Select name="category" defaultValue={skill?.category || "Hard Skill"}>
                  <SelectTrigger className="h-10 rounded-lg"><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hard Skill">Hard Skill</SelectItem>
                    <SelectItem value="Soft Skill">Soft Skill</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="percentage" className="font-medium text-sm">Tingkat Kemahiran</Label>
                <div className="flex items-center gap-3">
                  <Input id="percentage" name="percentage" type="number" min="1" max="100" defaultValue={skill?.percentage ?? 80} required className="h-10 flex-1 rounded-lg" />
                  <span className="text-sm font-medium text-muted-foreground min-w-8">%</span>
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="mt-auto">
            <SheetClose asChild><Button variant="outline" type="button" className="rounded-lg">Batal</Button></SheetClose>
            <SubmitButton className="rounded-lg">Simpan</SubmitButton>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
