import { notFound } from "next/navigation"
import { Heart, Calendar, Clock, MapPin } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { RsvpForm } from "./rsvp-form"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ slug: string }>
}

const DEFAULT_COLORS = {
  primary_color: "#4a3728",
  secondary_color: "#faf7f4",
  accent_color: "#c9a87c",
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatTime(timeStr: string | null) {
  if (!timeStr) return ""
  const [hours, minutes] = timeStr.split(":")
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export default async function InvitePage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await getSupabaseServerClient()

  const { data: invitation } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (!invitation) notFound()

  const { data: template } = invitation.template_id
    ? await supabase
        .from("templates")
        .select("*")
        .eq("id", invitation.template_id)
        .maybeSingle()
    : { data: null }

  const colors = template ?? DEFAULT_COLORS

  return (
    <main
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: colors.secondary_color }}
    >
      <div className="max-w-2xl mx-auto">
        <div
          className="rounded-lg p-8 md:p-16 border shadow-xl"
          style={{ backgroundColor: colors.secondary_color }}
        >
          <div className="text-center">
            <div
              className="w-24 h-px mx-auto mb-8"
              style={{ backgroundColor: colors.accent_color }}
            />

            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: colors.primary_color, opacity: 0.7 }}
            >
              Together with their families
            </p>

            <h1
              className="font-serif text-5xl md:text-6xl mb-2"
              style={{ color: colors.primary_color }}
            >
              {invitation.partner1_name}
            </h1>

            <div
              className="w-12 h-12 mx-auto my-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.accent_color}33` }}
            >
              <Heart className="w-5 h-5" style={{ color: colors.accent_color }} />
            </div>

            <h1
              className="font-serif text-5xl md:text-6xl mb-6"
              style={{ color: colors.primary_color }}
            >
              {invitation.partner2_name}
            </h1>

            <p
              className="text-sm uppercase tracking-[0.2em] mb-8"
              style={{ color: colors.primary_color, opacity: 0.8 }}
            >
              Request the pleasure of your company
            </p>

            <div
              className="border-y py-6 my-6 space-y-4"
              style={{ borderColor: `${colors.accent_color}55` }}
            >
              {invitation.event_date && (
                <div className="flex items-center justify-center gap-2 text-base">
                  <Calendar className="w-4 h-4" style={{ color: colors.accent_color }} />
                  <span style={{ color: colors.primary_color }}>
                    {formatDate(invitation.event_date)}
                  </span>
                </div>
              )}
              {invitation.event_time && (
                <div className="flex items-center justify-center gap-2 text-base">
                  <Clock className="w-4 h-4" style={{ color: colors.accent_color }} />
                  <span style={{ color: colors.primary_color }}>
                    Ceremony at {formatTime(invitation.event_time)}
                  </span>
                </div>
              )}
              {invitation.venue && (
                <div className="flex items-center justify-center gap-2 text-base">
                  <MapPin className="w-4 h-4" style={{ color: colors.accent_color }} />
                  <span style={{ color: colors.primary_color }}>{invitation.venue}</span>
                </div>
              )}
              {invitation.address && (
                <p className="text-sm" style={{ color: colors.primary_color, opacity: 0.6 }}>
                  {invitation.address}
                </p>
              )}
            </div>

            {invitation.message && (
              <p
                className="text-base italic mb-6"
                style={{ color: colors.primary_color, opacity: 0.8 }}
              >
                {`"${invitation.message}"`}
              </p>
            )}

            {invitation.rsvp_by && (
              <p className="text-xs mb-4" style={{ color: colors.primary_color, opacity: 0.6 }}>
                Please respond by {formatDate(invitation.rsvp_by)}
              </p>
            )}

            <div
              className="w-24 h-px mx-auto mt-8"
              style={{ backgroundColor: colors.accent_color }}
            />
          </div>
        </div>

        <div className="mt-12 bg-card rounded-lg border p-8">
          <h2 className="font-serif text-2xl mb-2 text-foreground">RSVP</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Let {invitation.partner1_name} and {invitation.partner2_name} know if you can make it.
          </p>
          <RsvpForm slug={invitation.slug} />
        </div>
      </div>
    </main>
  )
}
