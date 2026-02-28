import { createClient } from "@/lib/supabase/server";
import type { Deal } from "./types";

export async function getDeals(): Promise<Deal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    client: row.client,
    stage: row.stage,
    expectedRate: Number(row.expected_rate),
    salesPerson: row.sales_person,
    createdAt: row.created_at?.split("T")[0] ?? "",
  }));
}
