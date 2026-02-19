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
    if (items.length === 0) return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg border-border/50 bg-muted/30">
        <Briefcase className="h-8 w-8 text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground text-sm">Belum ada data di kategori ini</p>
      </div>
    );
    
    return (
      <div className="space-y-4 my-6">
        {items.map((item, index) => (
          <div key={item.id} className="relative">
            {/* Timeline dot dan line */}
            <div className="absolute -left-7 top-6 h-4 w-4 rounded-full border-2 border-primary bg-background flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            </div>
            {index < items.length - 1 && (
              <div className="absolute -left-5 top-10 w-0.5 h-20 bg-border/50"></div>
            )}

            <div className="ml-8 p-5 rounded-lg border border-border/50 bg-card hover:border-border transition-colors">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3"/> {item.company}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> {item.start_date} - {item.end_date}</span>
                  </div>
                  {item.description && (
                    <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                {/* Tombol Aksi */}
                <div className="flex gap-2 flex-shrink-0">
                  <ExperienceSheet exp={item} />
                  <DeleteExperienceButton id={item.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-8 w-8" /> Pengalaman
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">Kelola riwayat pekerjaan dan organisasi kamu</p>
          </div>
          <ExperienceSheet />
        </div>
      </div>

      <Tabs defaultValue="work" className="w-full">
        <TabsList className="bg-background border border-border/50">
          <TabsTrigger value="work" className="relative">Pekerjaan <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">{works.length}</span></TabsTrigger>
          <TabsTrigger value="organization" className="relative">Organisasi <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">{organizations.length}</span></TabsTrigger>
        </TabsList>
        <TabsContent value="work" className="mt-6">
          {renderTimeline(works, <Briefcase className="h-4 w-4" />)}
        </TabsContent>
        <TabsContent value="organization" className="mt-6">
          {renderTimeline(organizations, <Users className="h-4 w-4" />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
