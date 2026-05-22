"use client"

import { useEffect, useState, useTransition } from "react"
import { Heart, Calendar, Clock, MapPin, Copy, Check, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createInvitation } from "@/app/actions/invitations"
import type { TemplateData } from "./template-card"

interface FormData {
  partner1Name: string
  partner2Name: string
  eventDate: string
  eventTime: string
  venue: string
  address: string
  rsvpDate: string
  message: string
}

const DEFAULT_PREVIEW = {
  secondaryColor: "#faf7f4",
  primaryColor: "#4a3728",
  accentColor: "#c9a87c",
}

export function CustomizeSection() {
  const [formData, setFormData] = useState<FormData>({
    partner1Name: "Sarah",
    partner2Name: "James",
    eventDate: "2026-06-15",
    eventTime: "16:00",
    venue: "The Grand Garden Estate",
    address: "123 Garden Lane, New York, NY 10001",
    rsvpDate: "2026-05-15",
    message: "We can't wait to celebrate with you!",
  })
  const [template, setTemplate] = useState<TemplateData | null>(null)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSaving, startTransition] = useTransition()

  useEffect(() => {
    function onSelect(e: Event) {
      const detail = (e as CustomEvent<TemplateData>).detail
      if (detail) setTemplate(detail)
    }
    window.addEventListener("wedding:template-selected", onSelect)
    return () => window.removeEventListener("wedding:template-selected", onSelect)
  }, [])

  const colors = template ?? DEFAULT_PREVIEW

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setShareUrl(null)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeStr: string) => {
    if (!timeStr) return ""
    const [hours, minutes] = timeStr.split(":")
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const saveAndShare = () => {
    setErrorMsg(null)
    startTransition(async () => {
      const result = await createInvitation({
        templateId: template?.id ?? null,
        partner1Name: formData.partner1Name,
        partner2Name: formData.partner2Name,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        venue: formData.venue,
        address: formData.address,
        rsvpDate: formData.rsvpDate,
        message: formData.message,
      })

      if (!result.ok) {
        setErrorMsg(result.error)
        return
      }

      const url = `${window.location.origin}/invite/${result.slug}`
      setShareUrl(url)
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Clipboard not available; show the URL anyway.
      }
    })
  }

  return (
    <section id="customize" className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Personalize Your Invitation
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Make It Yours
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Fill in your details below and watch your invitation come to life in real-time.
          </p>
          {template && (
            <p className="mt-4 text-sm text-muted-foreground">
              Using template:{" "}
              <span className="font-serif text-foreground">{template.name}</span>
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="space-y-6 bg-card p-8 rounded-lg border">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partner1">Partner 1 Name</Label>
                <Input
                  id="partner1"
                  value={formData.partner1Name}
                  onChange={(e) => handleInputChange("partner1Name", e.target.value)}
                  placeholder="Sarah"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partner2">Partner 2 Name</Label>
                <Input
                  id="partner2"
                  value={formData.partner2Name}
                  onChange={(e) => handleInputChange("partner2Name", e.target.value)}
                  placeholder="James"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Wedding Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange("eventDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Ceremony Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => handleInputChange("eventTime", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue Name</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                placeholder="The Grand Garden Estate"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Venue Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="123 Garden Lane, New York, NY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rsvpDate">RSVP By Date</Label>
              <Input
                id="rsvpDate"
                type="date"
                value={formData.rsvpDate}
                onChange={(e) => handleInputChange("rsvpDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Personal Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="We can't wait to celebrate with you!"
                rows={3}
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button
                onClick={saveAndShare}
                disabled={isSaving}
                className="w-full gap-2 bg-primary text-primary-foreground"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : copied ? (
                  <Check className="w-4 h-4" />
                ) : shareUrl ? (
                  <Copy className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSaving
                  ? "Creating link…"
                  : copied
                  ? "Link copied!"
                  : shareUrl
                  ? "Copy share link again"
                  : "Create shareable invitation"}
              </Button>

              {shareUrl && (
                <div className="text-xs break-all text-muted-foreground p-3 rounded border bg-muted/40">
                  <span className="block uppercase tracking-wider mb-1 text-[10px]">
                    Your invitation link
                  </span>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline"
                  >
                    {shareUrl}
                  </a>
                </div>
              )}

              {errorMsg && (
                <p className="text-xs text-destructive">{errorMsg}</p>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="sticky top-8">
            <div
              className="rounded-lg p-8 md:p-12 border shadow-lg"
              style={{ backgroundColor: colors.secondaryColor }}
            >
              <div className="text-center">
                <div
                  className="w-24 h-px mx-auto mb-8"
                  style={{ backgroundColor: colors.accentColor }}
                />

                <p
                  className="text-xs uppercase tracking-[0.3em] mb-6"
                  style={{ color: colors.primaryColor, opacity: 0.7 }}
                >
                  Together with their families
                </p>

                <h3
                  className="font-serif text-4xl md:text-5xl mb-2"
                  style={{ color: colors.primaryColor }}
                >
                  {formData.partner1Name || "Partner 1"}
                </h3>

                <div
                  className="w-10 h-10 mx-auto my-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accentColor}33` }}
                >
                  <Heart className="w-4 h-4" style={{ color: colors.accentColor }} />
                </div>

                <h3
                  className="font-serif text-4xl md:text-5xl mb-6"
                  style={{ color: colors.primaryColor }}
                >
                  {formData.partner2Name || "Partner 2"}
                </h3>

                <p
                  className="text-sm uppercase tracking-[0.2em] mb-8"
                  style={{ color: colors.primaryColor, opacity: 0.8 }}
                >
                  Request the pleasure of your company
                </p>

                <div
                  className="border-y py-6 my-6 space-y-4"
                  style={{ borderColor: `${colors.accentColor}55` }}
                >
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" style={{ color: colors.accentColor }} />
                    <span style={{ color: colors.primaryColor }}>
                      {formData.eventDate ? formatDate(formData.eventDate) : "Select a date"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Clock className="w-4 h-4" style={{ color: colors.accentColor }} />
                    <span style={{ color: colors.primaryColor }}>
                      Ceremony at{" "}
                      {formData.eventTime ? formatTime(formData.eventTime) : "Select a time"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" style={{ color: colors.accentColor }} />
                    <span style={{ color: colors.primaryColor }}>
                      {formData.venue || "Venue name"}
                    </span>
                  </div>
                  {formData.address && (
                    <p className="text-xs" style={{ color: colors.primaryColor, opacity: 0.6 }}>
                      {formData.address}
                    </p>
                  )}
                </div>

                {formData.message && (
                  <p
                    className="text-sm italic mb-6"
                    style={{ color: colors.primaryColor, opacity: 0.7 }}
                  >
                    {`"${formData.message}"`}
                  </p>
                )}

                <p className="text-xs mb-4" style={{ color: colors.primaryColor, opacity: 0.6 }}>
                  Please respond by{" "}
                  {formData.rsvpDate ? formatDate(formData.rsvpDate) : "RSVP date"}
                </p>

                <div
                  className="w-24 h-px mx-auto mt-8"
                  style={{ backgroundColor: colors.accentColor }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
