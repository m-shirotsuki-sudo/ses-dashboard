import { createClient } from "@/lib/supabase/server";
import type { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    client: row.client,
    requiredSkills: row.required_skills ?? [],
    rateMin: Number(row.rate_min),
    rateMax: Number(row.rate_max),
    status: row.status,
    startDate: row.start_date,
    endDate: row.end_date,
  }));
}
