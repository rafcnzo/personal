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
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl tracking-tight">{isEdit ? "Edit Riwayat" : "Tambah Riwayat Baru"}</SheetTitle>
          <SheetDescription className="text-muted-foreground text-sm leading-relaxed">
            Masukkan detail pekerjaan atau organisasimu.
          </SheetDescription>
        </SheetHeader>

        <form action={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {isEdit && <input type="hidden" name="id" value={exp.id} />}
          <input type="hidden" name="type" value={type} />

          <div className="flex-1 overflow-y-auto px-6 pb-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type" className="font-medium text-sm">Kategori</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-10 rounded-lg"><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Work">Pekerjaan</SelectItem>
                    <SelectItem value="Organization">Organisasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="font-medium text-sm">Posisi / Peran</Label>
                <Input id="title" name="title" defaultValue={exp?.title} required placeholder="Contoh: Frontend Developer" className="h-10 rounded-lg" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="font-medium text-sm">Nama Perusahaan / Organisasi</Label>
                <Input id="company" name="company" defaultValue={exp?.company} required placeholder="Contoh: PT Teknologi" className="h-10 rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date" className="font-medium text-sm">Mulai</Label>
                  <Input id="start_date" name="start_date" defaultValue={exp?.start_date} required placeholder="Jan 2023" className="h-10 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date" className="font-medium text-sm">Selesai</Label>
                  <Input id="end_date" name="end_date" defaultValue={exp?.end_date} required placeholder="Sekarang" className="h-10 rounded-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium text-sm">Deskripsi Singkat</Label>
                <Textarea id="description" name="description" defaultValue={exp?.description} rows={4} placeholder="Jelaskan tanggung jawab atau pencapaianmu..." className="resize-none rounded-lg" />
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
