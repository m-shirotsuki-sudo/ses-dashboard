import { createClient } from "@/lib/supabase/server";
import type { Contract } from "./types";

export async function getContracts(): Promise<Contract[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    engineerId: row.engineer_id,
    projectId: row.project_id,
    rate: Number(row.rate),
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
  }));
}
