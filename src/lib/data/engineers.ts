import { createClient } from "@/lib/supabase/server";
import type { Engineer } from "./types";

export async function getEngineers(): Promise<Engineer[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("engineers")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    skills: row.skills ?? [],
    status: row.status,
    currentRate: Number(row.current_rate),
    currentProjectId: row.current_project_id,
  }));
}
