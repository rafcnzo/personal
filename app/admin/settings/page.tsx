import { createClient } from "@/utils/supabase/server";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsForm } from "./settings-form"; // <-- Import Client Form

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: biodata } = await supabase.from("biodata").select("*").eq("id", 1).single();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Kelola informasi profil dan data pribadi kamu</p>
      </div>
      
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Informasi Profil</CardTitle>
          <CardDescription>Perubahan akan langsung mengubah tampilan website public kamu</CardDescription>
        </CardHeader>
        
        <SettingsForm biodata={biodata} />
      </Card>
    </div>
  );
}
