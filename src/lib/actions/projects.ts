"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

interface ProjectInput {
  name: string;
  client: string;
  requiredSkills: string[];
  rateMin: number;
  rateMax: number;
  status: string;
  startDate: string;
  endDate: string | null;
}

export async function createProject(input: ProjectInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert({
    name: input.name,
    client: input.client,
    required_skills: input.requiredSkills,
    rate_min: input.rateMin,
    rate_max: input.rateMax,
    status: input.status,
    start_date: input.startDate,
    end_date: input.endDate || null,
  });
  if (error) throw error;
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}

export async function updateProject(id: string, input: ProjectInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      name: input.name,
      client: input.client,
      required_skills: input.requiredSkills,
      rate_min: input.rateMin,
      rate_max: input.rateMax,
      status: input.status,
      start_date: input.startDate,
      end_date: input.endDate || null,
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}
