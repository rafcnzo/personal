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

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Mail className="h-8 w-8" />
          Inbox Pesan
        </h1>
        <p className="text-muted-foreground mt-2">
          Pesan dari pengunjung website portofolio kamu.
        </p>
      </div>

      <div className="space-y-4">
        {messages?.map((msg) => (
          <Card key={msg.id} className={msg.is_read ? "bg-slate-50 dark:bg-slate-900" : "border-blue-200 dark:border-blue-800 shadow-sm"}>
            <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {msg.name}
                  {!msg.is_read && <Badge className="bg-blue-500">Baru</Badge>}
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">
                    {msg.email}
                  </a>
                  {" • "}
                  {new Date(msg.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </CardDescription>
              </div>
              
              {/* Grup Tombol Aksi */}
              <div className="flex gap-2">
                {!msg.is_read && (
                  <form action={async () => {
                    'use server';
                    await markAsRead(msg.id);
                  }}>
                    <SubmitButton variant="outline" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Tandai Dibaca
                    </SubmitButton>
                  </form>
                )}
                
                <form action={async () => {
                  'use server';
                  await deleteMessage(msg.id);
                }}>
                  <SubmitButton variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </SubmitButton>
                </form>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white dark:bg-slate-950 rounded-md border text-sm whitespace-pre-wrap">
                {msg.message}
              </div>
            </CardContent>
          </Card>
        ))}

        {messages?.length === 0 && (
          <div className="text-center p-12 border border-dashed rounded-lg text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Belum ada pesan masuk.</p>
          </div>
        )}
      </div>
    </div>
  );
}