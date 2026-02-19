import { createClient } from "@/utils/supabase/server";
import { SkillSheet } from "@/components/admin/skill-sheet";
import { DeleteSkillButton } from "@/components/admin/delete-skill-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Wrench } from "lucide-react";

export default async function SkillsPage() {
  const supabase = await createClient();
  const { data: skills } = await supabase.from("skills").select("*").order("percentage", { ascending: false });

  const hardSkills = skills?.filter(s => s.category === "Hard Skill") || [];
  const softSkills = skills?.filter(s => s.category === "Soft Skill") || [];

  // Fungsi untuk merender list skill
  const renderSkillList = (skillList: any[]) => {
    if (skillList.length === 0) return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg border-border/50 bg-muted/30">
        <Wrench className="h-8 w-8 text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground text-sm">Belum ada data di kategori ini</p>
      </div>
    );
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillList.map((skill) => (
          <div key={skill.id} className="p-4 border border-border/50 rounded-lg bg-card hover:bg-muted/50 transition-colors flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="font-semibold text-foreground">{skill.name}</span>
                  <span className="text-xs font-medium text-primary ml-2">{skill.percentage}%</span>
                </div>
                <Progress value={skill.percentage} className="h-2" />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2 border-t border-border/30">
              <SkillSheet skill={skill} />
              <DeleteSkillButton id={skill.id} />
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
              <Wrench className="h-8 w-8" /> Skills
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">Kelola keahlian Hard Skill dan Soft Skill kamu</p>
          </div>
          <SkillSheet />
        </div>
      </div>

      <Tabs defaultValue="hard" className="w-full">
        <TabsList className="mb-6 bg-background border border-border/50">
          <TabsTrigger value="hard" className="relative">Hard Skills <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">{hardSkills.length}</span></TabsTrigger>
          <TabsTrigger value="soft" className="relative">Soft Skills <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">{softSkills.length}</span></TabsTrigger>
        </TabsList>
        <TabsContent value="hard">
          {renderSkillList(hardSkills)}
        </TabsContent>
        <TabsContent value="soft">
          {renderSkillList(softSkills)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
