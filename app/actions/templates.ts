"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { TemplateRow } from "@/lib/supabase/types"

export async function fetchTemplates(): Promise<TemplateRow[]> {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("fetchTemplates failed", error)
    return []
  }
  return data ?? []
}

export async function fetchTemplate(id: string): Promise<TemplateRow | null> {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error("fetchTemplate failed", error)
    return null
  }
  return data
}
