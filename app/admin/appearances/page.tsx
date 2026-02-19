'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { updateAppearance } from "./actions";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client"; // Pakai client karena ini file 'use client'
import { Palette, Globe } from "lucide-react";

export default function AppearancePage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function loadSettings() {
      const supabase = createClient();
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      setSettings(data);
    }
    loadSettings();
  }, []);

  async function clientAction(formData: FormData) {
    const result = await updateAppearance(formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  if (!settings) return <div className="p-8">Memuat pengaturan...</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Palette className="h-8 w-8" />
          Appearance
        </h1>
        <p className="text-muted-foreground mt-2">
          Atur tampilan identitas website, warna tema, dan icon browser.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Identitas Website</CardTitle>
          <CardDescription>
            Data ini akan digunakan untuk SEO dan tampilan di tab browser pengunjung.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={clientAction} className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="title">Judul Website (Page Title)</Label>
              <Input 
                id="title" 
                name="title" 
                defaultValue={settings.title} 
                required 
                placeholder="ex: John Doe | Frontend Developer" 
              />
              <p className="text-xs text-muted-foreground">Teks yang muncul di tab atas browser.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme_color">Warna Tema Utama (Brand Color)</Label>
              <div className="flex items-center gap-4">
                {/* Input warna bawaan browser */}
                <Input 
                  id="theme_color" 
                  name="theme_color" 
                  type="color" 
                  defaultValue={settings.theme_color} 
                  className="w-16 h-12 p-1 cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">
                  Pilih warna dasar untuk tombol dan aksen di halaman utama.
                </span>
              </div>
            </div>

            <hr className="my-6" />

            <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
              <Label htmlFor="favicon_file" className="text-base font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4"/> Icon Website (Favicon)
              </Label>
              
              {settings.favicon_url && (
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded bg-white border flex items-center justify-center p-1 overflow-hidden">
                    <img src={settings.favicon_url} alt="Favicon" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-muted-foreground">Icon saat ini</span>
                </div>
              )}
              
              <Input 
                id="favicon_file" 
                name="favicon_file" 
                type="file" 
                accept="image/png, image/jpeg, image/x-icon, image/svg+xml" 
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Upload gambar rasio kotak (1:1). Ekstensi .png atau .ico disarankan. Max 2MB.
              </p>
            </div>

            <div className="flex justify-end border-t pt-6">
              <SubmitButton>Simpan Tampilan</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}