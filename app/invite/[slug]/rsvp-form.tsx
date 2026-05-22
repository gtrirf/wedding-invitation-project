"use client"

import { useState, useTransition } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitRsvp } from "@/app/actions/rsvp"

interface RsvpFormProps {
  slug: string
}

export function RsvpForm({ slug }: RsvpFormProps) {
  const [guestName, setGuestName] = useState("")
  const [email, setEmail] = useState("")
  const [attending, setAttending] = useState<boolean>(true)
  const [guestCount, setGuestCount] = useState(1)
  const [note, setNote] = useState("")
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await submitRsvp({
        slug,
        guestName,
        email,
        attending,
        guestCount,
        note,
      })
      if (result.ok) {
        setDone(true)
      } else {
        setError(result.error)
      }
    })
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 text-sm text-foreground">
        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="w-4 h-4 text-primary" />
        </span>
        Thanks! Your RSVP has been recorded.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="guestName">Your name</Label>
        <Input
          id="guestName"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          required
          maxLength={120}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (optional)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <Label>Will you attend?</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={attending ? "default" : "outline"}
            onClick={() => setAttending(true)}
          >
            Joyfully accept
          </Button>
          <Button
            type="button"
            variant={!attending ? "default" : "outline"}
            onClick={() => setAttending(false)}
          >
            Regretfully decline
          </Button>
        </div>
      </div>

      {attending && (
        <div className="space-y-2">
          <Label htmlFor="guestCount">Number of guests</Label>
          <Input
            id="guestCount"
            type="number"
            min={1}
            max={10}
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="note">Note to the couple (optional)</Label>
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          maxLength={500}
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full gap-2">
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {isPending ? "Sending…" : "Send RSVP"}
      </Button>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </form>
  )
}
