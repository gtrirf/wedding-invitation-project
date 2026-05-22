"use server"

import { z } from "zod"
import { getSupabaseServerClient } from "@/lib/supabase/server"

const RsvpInput = z.object({
  slug: z.string().min(1).max(40),
  guestName: z.string().min(1).max(120),
  email: z.string().email().max(200).optional().or(z.literal("")),
  attending: z.boolean(),
  guestCount: z.number().int().min(1).max(10).default(1),
  note: z.string().max(500).optional().or(z.literal("")),
})

export type RsvpInput = z.infer<typeof RsvpInput>

export type SubmitRsvpResult =
  | { ok: true }
  | { ok: false; error: string }

export async function submitRsvp(input: RsvpInput): Promise<SubmitRsvpResult> {
  const parsed = RsvpInput.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" }
  }
  const v = parsed.data

  const supabase = await getSupabaseServerClient()

  const { data: invitation, error: lookupError } = await supabase
    .from("invitations")
    .select("id")
    .eq("slug", v.slug)
    .maybeSingle()

  if (lookupError || !invitation) {
    return { ok: false, error: "Invitation not found" }
  }

  const { error } = await supabase.from("rsvps").insert({
    invitation_id: invitation.id,
    guest_name: v.guestName,
    email: v.email || null,
    attending: v.attending,
    guest_count: v.guestCount,
    note: v.note || null,
  })

  if (error) {
    console.error("submitRsvp failed", error)
    return { ok: false, error: "Could not save RSVP" }
  }
  return { ok: true }
}
