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
      {/* Panggil clientAction, BUKAN updateBiodata langsung */}
      <form action={clientAction} className="space-y-6" encType="multipart/form-data">
         <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" name="name" defaultValue={biodata?.name} required />
         </div>

         <div className="space-y-2">
            <Label htmlFor="role">Role / Posisi</Label>
            <Input id="role" name="role" defaultValue={biodata?.role} required />
         </div>

         <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea 
              id="description" 
              name="description" 
              defaultValue={biodata?.description} 
              rows={5}
              required 
            />
         </div>

         <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              defaultValue={biodata?.email} 
              required 
            />
         </div>

         <div className="space-y-2">
            <Label htmlFor="telepon">Telepon</Label>
            <Input 
              id="telepon" 
              name="telepon" 
              type="tel" 
              defaultValue={biodata?.telepon} 
            />
         </div>

         <div className="space-y-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input 
              id="github_url" 
              name="github_url" 
              type="url" 
              defaultValue={biodata?.github_url} 
            />
         </div>

         <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input 
              id="linkedin_url" 
              name="linkedin_url" 
              type="url" 
              defaultValue={biodata?.linkedin_url} 
            />
         </div>

         <div className="space-y-2">
            <Label htmlFor="cv_file">CV File (PDF)</Label>
            <Input 
              id="cv_file" 
              name="cv_file" 
              type="file" 
              accept="application/pdf"
            />
            {biodata?.cv_path && (
              <p className="text-sm text-muted-foreground">
                CV saat ini: <a href={biodata.cv_path} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lihat CV</a>
              </p>
            )}
         </div>

         <div className="flex justify-end border-t pt-6 mt-6">
            <SubmitButton>Simpan Perubahan</SubmitButton>
         </div>
      </form>
    </CardContent>
  )
}