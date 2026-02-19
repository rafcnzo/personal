import { createClient } from "@/utils/supabase/server";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsForm } from "./settings-form"; // <-- Import Client Form

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: biodata } = await supabase.from("biodata").select("*").eq("id", 1).single();

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Informasi Profil</CardTitle>
          <CardDescription>Perubahan di sini akan langsung mengubah tampilan website public.</CardDescription>
        </CardHeader>
        
        {/* Panggil form yang sudah "pintar" bisa memunculkan toast */}
        <SettingsForm biodata={biodata} />
      </Card>
    </div>
  );
}