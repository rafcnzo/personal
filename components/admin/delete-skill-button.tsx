'use client'
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteSkill } from "@/app/admin/skills/actions"
import { toast } from "sonner"
import { useState } from "react"

export function DeleteSkillButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)
  async function handleDelete() {
    if(confirm("Yakin mau hapus skill ini?")) {
      setLoading(true)
      await deleteSkill(id)
      setLoading(false)
      toast.success("Skill dihapus")
    }
  }
  return (
    <Button variant="destructive" size="icon" disabled={loading} onClick={handleDelete}>
      <Trash className="h-4 w-4" />
    </Button>
  )
}