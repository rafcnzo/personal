'use client'

import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import { updateBiodata } from "./actions";
import { toast } from "sonner"; // <-- Import Sonner

export function SettingsForm({ biodata }: { biodata: any }) {

  // Fungsi ini yang bertindak sebagai "Webhook / Listener"
  async function clientAction(formData: FormData) {
    // Jalankan Server Action
    const result = await updateBiodata(formData);

    // Cek hasil dari server
    if (result.success) {
      toast.success(result.message); // Notif Hijau
    } else {
      toast.error(result.message); // Notif Merah
    }
  }

  return (
    <CardContent>
      <form action={clientAction} className="space-y-8" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-semibold">Nama Lengkap</Label>
            <Input id="name" name="name" defaultValue={biodata?.name} required className="h-10" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="role" className="text-base font-semibold">Role / Posisi</Label>
            <Input id="role" name="role" defaultValue={biodata?.role} required className="h-10" />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-base font-semibold">Deskripsi Singkat</Label>
          <Textarea 
            id="description" 
            name="description" 
            defaultValue={biodata?.description} 
            rows={5}
            required
            placeholder="Ceritakan tentang diri kamu..."
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">Deskripsi ini akan tampil di halaman utama</p>
        </div>

        <div className="border-t border-border/30 pt-8">
          <h3 className="text-lg font-semibold mb-6">Informasi Kontak</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="font-medium">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                defaultValue={biodata?.email} 
                required
                className="h-10"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="telepon" className="font-medium">Telepon</Label>
              <Input 
                id="telepon" 
                name="telepon" 
                type="tel" 
                defaultValue={biodata?.telepon}
                className="h-10"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="github_url" className="font-medium">GitHub URL</Label>
              <Input 
                id="github_url" 
                name="github_url" 
                type="url" 
                defaultValue={biodata?.github_url}
                placeholder="https://github.com/username"
                className="h-10"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="linkedin_url" className="font-medium">LinkedIn URL</Label>
              <Input 
                id="linkedin_url" 
                name="linkedin_url" 
                type="url" 
                defaultValue={biodata?.linkedin_url}
                placeholder="https://linkedin.com/in/username"
                className="h-10"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8">
          <div className="space-y-4 p-6 bg-muted/30 rounded-lg border border-border/50">
            <Label htmlFor="cv_file" className="text-base font-semibold">Upload CV (PDF)</Label>
            <Input 
              id="cv_file" 
              name="cv_file" 
              type="file" 
              accept="application/pdf"
              className="h-10"
            />
            {biodata?.cv_path && (
              <div className="p-3 bg-background rounded-lg border border-border/30 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">CV saat ini tersimpan</span>
                <a href={biodata.cv_path} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary hover:underline">Lihat CV</a>
              </div>
            )}
            <p className="text-xs text-muted-foreground">File PDF, maksimal 5MB</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border/30 pt-6">
          <SubmitButton>Simpan Perubahan</SubmitButton>
        </div>
      </form>
    </CardContent>
  )
}
