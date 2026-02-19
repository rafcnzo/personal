import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Trash2, CheckCircle2 } from "lucide-react";
import { markAsRead, deleteMessage } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default async function MessagesPage() {
  const supabase = await createClient();
  
  // Ambil semua pesan, urutkan dari yang paling baru
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return <div>Error loading messages: {error.message}</div>;

  const unreadCount = messages?.filter(m => !m.is_read).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Mail className="h-8 w-8" />
              Inbox Pesan
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Pesan dari pengunjung website portofolio kamu
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded-full">
              {unreadCount} pesan baru
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {messages?.map((msg) => (
          <Card key={msg.id} className={`overflow-hidden border transition-all ${msg.is_read ? "bg-background border-border/50 opacity-75" : "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/50"}`}>
            <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-base">{msg.name}</CardTitle>
                  {!msg.is_read && <Badge className="bg-blue-600 dark:bg-blue-500 text-white text-xs">New</Badge>}
                </div>
                <CardDescription className="text-xs">
                  <a href={`mailto:${msg.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {msg.email}
                  </a>
                  {" • "}
                  {new Date(msg.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </CardDescription>
              </div>
              
              {/* Grup Tombol Aksi */}
              <div className="flex gap-2 ml-4 flex-shrink-0">
                {!msg.is_read && (
                  <form action={async () => {
                    'use server';
                    await markAsRead(msg.id);
                  }}>
                    <SubmitButton variant="ghost" size="sm" className="text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 h-8 px-2">
                      <CheckCircle2 className="h-4 w-4" />
                    </SubmitButton>
                  </form>
                )}
                
                <form action={async () => {
                  'use server';
                  await deleteMessage(msg.id);
                }}>
                  <SubmitButton variant="ghost" size="sm" className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 h-8 px-2">
                    <Trash2 className="h-4 w-4" />
                  </SubmitButton>
                </form>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="p-3 bg-muted/50 rounded-md border border-border/30 text-sm whitespace-pre-wrap leading-relaxed text-muted-foreground">
                {msg.message}
              </div>
            </CardContent>
          </Card>
        ))}

        {messages?.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/30">
            <Mail className="h-12 w-12 mb-3 opacity-30" />
            <p className="font-medium">Belum ada pesan masuk</p>
            <p className="text-xs text-muted-foreground/75 mt-1">Pesan dari pengunjung akan muncul di sini</p>
          </div>
        )}
      </div>
    </div>
  );
}
