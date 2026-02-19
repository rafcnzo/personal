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
    if (skillList.length === 0) return <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">Belum ada data di kategori ini.</div>;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillList.map((skill) => (
          <div key={skill.id} className="p-4 border rounded-lg bg-white dark:bg-slate-950 flex items-center justify-between shadow-sm">
            <div className="flex-1 mr-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
              </div>
              <Progress value={skill.percentage} className="h-2" />
            </div>
            <div className="flex gap-2">
              <SkillSheet skill={skill} />
              <DeleteSkillButton id={skill.id} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wrench className="h-8 w-8" /> Skills
          </h1>
          <p className="text-muted-foreground mt-2">Kelola keahlian Hard Skill dan Soft Skill kamu.</p>
        </div>
        <SkillSheet />
      </div>

      <Tabs defaultValue="hard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="hard">Hard Skills ({hardSkills.length})</TabsTrigger>
          <TabsTrigger value="soft">Soft Skills ({softSkills.length})</TabsTrigger>
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