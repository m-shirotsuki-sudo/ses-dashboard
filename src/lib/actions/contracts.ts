"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

interface ContractInput {
  name: string;
  engineerId: string;
  projectId: string;
  rate: number;
  startDate: string;
  endDate: string | null;
  status: string;
}

export async function createContract(input: ContractInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("contracts").insert({
    name: input.name,
    engineer_id: input.engineerId,
    project_id: input.projectId,
    rate: input.rate,
    start_date: input.startDate,
    end_date: input.endDate || null,
    status: input.status,
  });
  if (error) throw error;
  revalidatePath("/contracts");
  revalidatePath("/engineers");
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}

export async function updateContract(id: string, input: ContractInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contracts")
    .update({
      name: input.name,
      engineer_id: input.engineerId,
      project_id: input.projectId,
      rate: input.rate,
      start_date: input.startDate,
      end_date: input.endDate || null,
      status: input.status,
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/contracts");
  revalidatePath("/engineers");
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}

export async function deleteContract(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contracts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/contracts");
  revalidatePath("/engineers");
  revalidatePath("/projects");
  revalidatePath("/dashboard");
  revalidatePath("/revenue");
}
