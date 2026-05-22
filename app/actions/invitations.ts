"use server"

import { z } from "zod"
import { getSupabaseServerClient } from "@/lib/supabase/server"

const InvitationInput = z.object({
  templateId: z.string().min(1).max(64).nullable().optional(),
  partner1Name: z.string().min(1).max(80),
  partner2Name: z.string().min(1).max(80),
  eventDate: z.string().optional().nullable(),
  eventTime: z.string().optional().nullable(),
  venue: z.string().max(200).optional().nullable(),
  address: z.string().max(300).optional().nullable(),
  rsvpDate: z.string().optional().nullable(),
  message: z.string().max(1000).optional().nullable(),
})

export type InvitationInput = z.infer<typeof InvitationInput>

export type CreateInvitationResult =
  | { ok: true; slug: string; id: string }
  | { ok: false; error: string }

function makeSlug() {
  // 10-char URL-safe base36 — enough entropy for non-guessable share links.
  return Array.from({ length: 2 }, () =>
    Math.random().toString(36).slice(2, 8)
  ).join("").slice(0, 10)
}

export async function createInvitation(
  input: InvitationInput
): Promise<CreateInvitationResult> {
  const parsed = InvitationInput.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" }
  }
  const v = parsed.data

  const supabase = await getSupabaseServerClient()

  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = makeSlug()
    const { data, error } = await supabase
      .from("invitations")
      .insert({
        slug,
        template_id: v.templateId ?? null,
        partner1_name: v.partner1Name,
        partner2_name: v.partner2Name,
        event_date: v.eventDate || null,
        event_time: v.eventTime || null,
        venue: v.venue || null,
        address: v.address || null,
        rsvp_by: v.rsvpDate || null,
        message: v.message || null,
      })
      .select("id, slug")
      .single()

    if (!error && data) return { ok: true, slug: data.slug, id: data.id }
    // 23505 = unique_violation (slug collision) — retry with new slug.
    if (error && (error as { code?: string }).code !== "23505") {
      console.error("createInvitation failed", error)
      return { ok: false, error: "Could not save invitation" }
    }
  }
  return { ok: false, error: "Could not generate a unique link, try again" }
}
