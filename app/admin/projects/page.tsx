import { createClient } from "@/utils/supabase/server";
import { ProjectSheet } from "@/components/admin/project-sheet";
import { DataTable } from "@/components/ui/data-table"; // Import Tabel Mesin
import { columns } from "./columns"; // Import Definisi Kolom

export default async function ProjectsPage() {
  const supabase = await createClient();
  
  // Ambil data
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        
        {/* Tombol CREATE tetap disini */}
        <ProjectSheet />
      </div>

      {/* Tabel sekarang cuma sebaris ini! */}
      {/* Kita oper 'columns' dan 'data' ke komponen DataTable */}
      <DataTable columns={columns} data={projects || []} />
    </div>
  );
}