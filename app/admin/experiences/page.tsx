import { createClient } from "@/utils/supabase/server";
import { ExperienceSheet } from "@/components/admin/experience-sheet";
import { DeleteExperienceButton } from "@/components/admin/delete-experience-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building2, Calendar, Users } from "lucide-react";

export default async function ExperiencesPage() {
  const supabase = await createClient();
  const { data: experiences } = await supabase.from("experiences").select("*").order("id", { ascending: false });

  // Filter berdasarkan Work atau Organization
  const works = experiences?.filter(e => e.type === "Work") || [];
  const organizations = experiences?.filter(e => e.type === "Organization") || [];

  const renderTimeline = (items: any[], icon: any) => {
    if (items.length === 0) return <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">Belum ada riwayat.</div>;
    
    return (
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-8 space-y-8 my-6">
        {items.map((item) => (
          <div key={item.id} className="relative">
            {/* Titik Timeline */}
            <div className="absolute -left-[41px] top-1 bg-white dark:bg-slate-950 p-1 rounded-full border-2 border-primary">
              <div className="bg-primary rounded-full p-1.5 text-white">
                {icon}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-950 p-5 rounded-lg border shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3"/> {item.company}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> {item.start_date} - {item.end_date}</span>
                  </div>
                </div>
                {/* Tombol Aksi */}
                <div className="flex gap-2">
                  <ExperienceSheet exp={item} />
                  <DeleteExperienceButton id={item.id} />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="h-8 w-8" /> Pengalaman
          </h1>
          <p className="text-muted-foreground mt-2">Kelola riwayat pekerjaan dan riwayat organisasimu.</p>
        </div>
        <ExperienceSheet />
      </div>

      <Tabs defaultValue="work" className="w-full">
        <TabsList>
          <TabsTrigger value="work">Pekerjaan ({works.length})</TabsTrigger>
          <TabsTrigger value="organization">Organisasi ({organizations.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          {renderTimeline(works, <Briefcase className="h-4 w-4" />)}
        </TabsContent>
        <TabsContent value="organization">
          {/* Pakai icon Users untuk tab organisasi */}
          {renderTimeline(organizations, <Users className="h-4 w-4" />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}