export type BgPattern = "floral" | "minimal" | "geometric" | "classic"

export interface TemplateRow {
  id: string
  name: string
  style: string
  primary_color: string
  secondary_color: string
  accent_color: string
  bg_pattern: BgPattern
  sort_order: number
  created_at: string
}

export interface InvitationRow {
  id: string
  slug: string
  template_id: string | null
  partner1_name: string
  partner2_name: string
  event_date: string | null
  event_time: string | null
  venue: string | null
  address: string | null
  rsvp_by: string | null
  message: string | null
  created_at: string
}

export interface RsvpRow {
  id: string
  invitation_id: string
  guest_name: string
  email: string | null
  attending: boolean
  guest_count: number
  note: string | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      templates:   { Row: TemplateRow;   Insert: Partial<TemplateRow>   & Pick<TemplateRow, "id" | "name" | "style" | "primary_color" | "secondary_color" | "accent_color" | "bg_pattern">; Update: Partial<TemplateRow> }
      invitations: { Row: InvitationRow; Insert: Omit<InvitationRow, "id" | "created_at"> & { id?: string; created_at?: string }; Update: Partial<InvitationRow> }
      rsvps:       { Row: RsvpRow;       Insert: Omit<RsvpRow, "id" | "created_at"> & { id?: string; created_at?: string }; Update: Partial<RsvpRow> }
    }
  }
}
