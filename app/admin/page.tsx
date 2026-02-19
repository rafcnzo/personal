import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Lightbulb, Trophy, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+2 bulan ini",
      icon: Briefcase,
      color: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Skills",
      value: "28",
      change: "+5 skill baru",
      icon: Lightbulb,
      color: "bg-amber-50 dark:bg-amber-950",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Experiences",
      value: "5",
      change: "Aktif & terarsip",
      icon: Trophy,
      color: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Pesan Baru",
      value: "3",
      change: "Belum dibaca",
      icon: MessageSquare,
      color: "bg-green-50 dark:bg-green-950",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali! Berikut ringkasan data portfolio kamu.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="overflow-hidden border-border/50 hover:border-border/80 transition-colors">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold leading-none">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="/admin/projects" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors text-center">
              <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium">Projects</span>
            </a>
            <a href="/admin/skills" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors text-center">
              <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium">Skills</span>
            </a>
            <a href="/admin/experiences" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors text-center">
              <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium">Experience</span>
            </a>
            <a href="/admin/messages" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors text-center">
              <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium">Messages</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
