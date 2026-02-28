"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

interface DealInput {
  name: string;
  client: string;
  stage: string;
  expectedRate: number;
  salesPerson: string;
}

export async function createDeal(input: DealInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("deals").insert({
    name: input.name,
    client: input.client,
    stage: input.stage,
    expected_rate: input.expectedRate,
    sales_person: input.salesPerson,
  });
  if (error) throw error;
  revalidatePath("/pipeline");
  revalidatePath("/dashboard");
}

export async function updateDeal(id: string, input: DealInput) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("deals")
    .update({
      name: input.name,
      client: input.client,
      stage: input.stage,
      expected_rate: input.expectedRate,
      sales_person: input.salesPerson,
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/pipeline");
  revalidatePath("/dashboard");
}

export async function deleteDeal(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("deals").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/pipeline");
  revalidatePath("/dashboard");
}
