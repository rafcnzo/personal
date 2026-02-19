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
          <SheetTitle>{isEdit ? "Edit Skill" : "Tambah Skill Baru"}</SheetTitle>
          <SheetDescription>Masukkan nama keahlian dan tingkat penguasaanmu.</SheetDescription>
        </SheetHeader>

        <form action={handleSubmit} className="space-y-4 mt-4">
          {isEdit && <input type="hidden" name="id" value={skill.id} />}
          
          <div className="space-y-2">
            <Label htmlFor="name">Nama Skill</Label>
            <Input id="name" name="name" defaultValue={skill?.name} required placeholder="Contoh: React.js / Komunikasi" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select name="category" defaultValue={skill?.category || "Hard Skill"}>
              <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Hard Skill">Hard Skill</SelectItem>
                <SelectItem value="Soft Skill">Soft Skill</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="percentage">Tingkat Kemahiran (1-100)</Label>
            <Input id="percentage" name="percentage" type="number" min="1" max="100" defaultValue={skill?.percentage || 80} required />
          </div>

          <SheetFooter className="mt-8">
            <SheetClose asChild><Button variant="outline" type="button">Batal</Button></SheetClose>
            <SubmitButton>Simpan</SubmitButton>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}