"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

interface EngineerInput {
  name: string;
  skills: string[];
  status: string;
  currentRate: number;
  currentProjectId: string | null;
}

export async function createEngineer(input: EngineerInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("engineers").insert({
    name: input.name,
    skills: input.skills,
    status: input.status,
    current_rate: input.currentRate,
    current_project_id: input.currentProjectId || null,
  });
  if (error) throw error;
  revalidatePath("/engineers");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}

export async function updateEngineer(id: string, input: EngineerInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("engineers")
    .update({
      name: input.name,
      skills: input.skills,
      status: input.status,
      current_rate: input.currentRate,
      current_project_id: input.currentProjectId || null,
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/engineers");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}

export async function deleteEngineer(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("engineers").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/engineers");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}
