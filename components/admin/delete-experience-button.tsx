'use client'
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteExperience } from "@/app/admin/experiences/actions"
import { toast } from "sonner"
import { useState } from "react"

export function DeleteExperienceButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)
  async function handleDelete() {
    if (!confirm("Yakin mau hapus riwayat ini?")) return
    setLoading(true)
    try {
      await deleteExperience(id)
      toast.success("Riwayat dihapus")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal menghapus")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button variant="destructive" size="icon" className="h-8 w-8" disabled={loading} onClick={handleDelete}>
      <Trash className="h-4 w-4" />
    </Button>
  )
}