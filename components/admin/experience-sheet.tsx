'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createExperience, updateExperience } from "@/app/admin/experiences/actions"
import { SubmitButton } from "@/components/submit-button"
import { Plus, Pencil } from "lucide-react"
import { toast } from "sonner"

export function ExperienceSheet({ exp }: { exp?: any }) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<string>(exp?.type ?? 'Work')
  const isEdit = !!exp

  useEffect(() => {
    if (open) setType(exp?.type ?? 'Work')
  }, [open, exp?.type])

  async function handleSubmit(formData: FormData) {
    try {
      if (isEdit) {
        await updateExperience(formData)
        toast.success("Riwayat berhasil diupdate!")
      } else {
        await createExperience(formData)
        toast.success("Riwayat berhasil ditambahkan!")
      }
      setOpen(false)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Gagal menyimpan')
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
        ) : (
          <Button><Plus className="mr-2 h-4 w-4" /> Tambah Data</Button>
        )}
      </SheetTrigger>
      
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Riwayat" : "Tambah Riwayat Baru"}</SheetTitle>
          <SheetDescription>Masukkan detail pekerjaan atau organisasimu.</SheetDescription>
        </SheetHeader>

        <form action={handleSubmit} className="space-y-4 mt-4">
          {isEdit && <input type="hidden" name="id" value={exp.id} />}
          {/* Radix Select tidak mengirim value ke FormData; pakai hidden input */}
          <input type="hidden" name="type" value={type} />
          
          <div className="space-y-2">
            <Label htmlFor="type">Kategori</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Work">Pekerjaan (Work)</SelectItem>
                <SelectItem value="Organization">Organisasi (Organization)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Posisi / Peran</Label>
            <Input id="title" name="title" defaultValue={exp?.title} required placeholder="ex: Frontend Developer / Ketua Divisi" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Nama Perusahaan / Organisasi</Label>
            <Input id="company" name="company" defaultValue={exp?.company} required placeholder="ex: PT Teknologi / BEM Fakultas" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Mulai (ex: Jan 2023)</Label>
              <Input id="start_date" name="start_date" defaultValue={exp?.start_date} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Selesai (ex: Sekarang)</Label>
              <Input id="end_date" name="end_date" defaultValue={exp?.end_date} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Singkat</Label>
            <Textarea id="description" name="description" defaultValue={exp?.description} rows={4} placeholder="Jelaskan tanggung jawab atau pencapaianmu..." />
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