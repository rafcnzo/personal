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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground">Kelola portofolio project kamu di sini</p>
          </div>
          <ProjectSheet />
        </div>
      </div>

      <div className="rounded-lg border border-border/50">
        <DataTable columns={columns} data={projects || []} />
      </div>
    </div>
  );
}
