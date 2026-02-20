import { createClient } from "@/utils/supabase/server";
import { ExperienceSheet } from "@/components/admin/experience-sheet";
import { DeleteExperienceButton } from "@/components/admin/delete-experience-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building2, Calendar, Users } from "lucide-react";

export default async function ExperiencesPage() {
  const supabase = await createClient();
  const { data: experiences } = await supabase.from("experiences").select("*").order("id", { ascending: false });

  const works = experiences?.filter(e => e.type === "Work") || [];
  const organizations = experiences?.filter(e => e.type === "Organization") || [];

  const renderEmpty = (label: string) => (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-muted/20 py-16 px-6 text-center">
      <div className="rounded-full bg-muted/60 p-4 mb-4">
        <Briefcase className="h-10 w-10 text-muted-foreground/60" />
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
      <p className="text-muted-foreground/80 text-sm mt-1 max-w-xs">Tambahkan data pertama untuk menampilkannya di sini</p>
    </div>
  );

  const renderTimeline = (items: any[], emptyLabel: string) => {
    if (items.length === 0) return renderEmpty(emptyLabel);

    return (
      <ul className="space-y-0 mt-6">
        {items.map((item, index) => (
          <li key={item.id} className="relative flex gap-4">
            {/* Garis vertikal penghubung */}
            {index < items.length - 1 && (
              <div className="absolute left-[15px] top-10 bottom-0 w-px bg-border" aria-hidden />
            )}
            {/* Bullet */}
            <div className="relative z-10 mt-1.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>

            <div className="flex-1 min-w-0 pb-8 last:pb-0">
              <div className="group rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-border hover:shadow-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 shrink-0" />
                        {item.company}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        {item.start_date} – {item.end_date}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed pt-1 line-clamp-4">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0 sm:opacity-80 sm:group-hover:opacity-100 transition-opacity">
                    <ExperienceSheet exp={item} />
                    <DeleteExperienceButton id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" />
            </span>
            Pengalaman
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Kelola riwayat pekerjaan dan organisasi kamu
          </p>
        </div>
        <ExperienceSheet />
      </div>

      {/* Tabs + List */}
      <Tabs defaultValue="work" className="w-full">
        <TabsList className="h-11 w-full sm:w-auto bg-muted/60 p-1 rounded-xl border border-border/50">
          <TabsTrigger
            value="work"
            className="rounded-lg px-4 data-[state=active]:shadow-sm min-w-0 sm:min-w-[140px]"
          >
            <Briefcase className="h-4 w-4 shrink-0 mr-2" />
            Pekerjaan
            <span className="ml-2 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium tabular-nums">
              {works.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="organization"
            className="rounded-lg px-4 data-[state=active]:shadow-sm min-w-0 sm:min-w-[140px]"
          >
            <Users className="h-4 w-4 shrink-0 mr-2" />
            Organisasi
            <span className="ml-2 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium tabular-nums">
              {organizations.length}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="work" className="mt-0">
          {renderTimeline(works, "Belum ada pengalaman kerja")}
        </TabsContent>
        <TabsContent value="organization" className="mt-0">
          {renderTimeline(organizations, "Belum ada pengalaman organisasi")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
