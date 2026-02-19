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
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Palette className="h-8 w-8" />
          Appearance
        </h1>
        <p className="text-muted-foreground text-sm">
          Atur tampilan identitas website, warna tema, dan icon browser
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Identitas Website</CardTitle>
          <CardDescription>
            Pengaturan ini akan tampil di SEO dan tab browser pengunjung
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={clientAction} className="space-y-8">
            
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base font-semibold">Judul Website</Label>
              <Input 
                id="title" 
                name="title" 
                defaultValue={settings.title} 
                required 
                placeholder="ex: John Doe | Frontend Developer"
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">Teks yang muncul di tab browser</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="theme_color" className="text-base font-semibold">Warna Tema Brand</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-20 rounded-lg border-2 border-border/50 overflow-hidden shadow-sm">
                  <Input 
                    id="theme_color" 
                    name="theme_color" 
                    type="color" 
                    defaultValue={settings.theme_color} 
                    className="h-full w-full cursor-pointer border-0 p-0 absolute inset-0"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{settings.theme_color}</p>
                  <p className="text-xs text-muted-foreground mt-1">Warna utama untuk tombol dan aksen</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/30 pt-8">
              <div className="space-y-4 p-6 bg-muted/30 rounded-lg border border-border/50">
                <Label htmlFor="favicon_file" className="text-base font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5"/> Icon Website (Favicon)
                </Label>
                
                {settings.favicon_url && (
                  <div className="flex items-center gap-4 p-3 bg-background rounded-lg border border-border/30">
                    <div className="h-12 w-12 rounded-lg bg-background border border-border/50 flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                      <img src={settings.favicon_url} alt="Favicon preview" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-sm text-muted-foreground">Preview icon saat ini</span>
                  </div>
                )}
                
                <Input 
                  id="favicon_file" 
                  name="favicon_file" 
                  type="file" 
                  accept="image/png, image/jpeg, image/x-icon, image/svg+xml" 
                  className="cursor-pointer h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Ukuran 1:1 (square), format .png atau .ico direkomendasikan. Maksimal 2MB.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border/30 pt-6">
              <SubmitButton>Simpan Pengaturan</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
