-- Wedding invitation backend schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- ── Templates ───────────────────────────────────────────────────────────────
create table if not exists public.templates (
  id              text primary key,
  name            text not null,
  style           text not null,
  primary_color   text not null,
  secondary_color text not null,
  accent_color    text not null,
  bg_pattern      text not null check (bg_pattern in ('floral','minimal','geometric','classic')),
  sort_order      int  not null default 0,
  created_at      timestamptz not null default now()
);

-- ── Invitations ─────────────────────────────────────────────────────────────
create table if not exists public.invitations (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  template_id   text references public.templates(id) on delete set null,
  partner1_name text not null,
  partner2_name text not null,
  event_date    date,
  event_time    time,
  venue         text,
  address       text,
  rsvp_by       date,
  message       text,
  created_at    timestamptz not null default now()
);

create index if not exists invitations_slug_idx on public.invitations(slug);

-- ── RSVPs ───────────────────────────────────────────────────────────────────
create table if not exists public.rsvps (
  id            uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_name    text not null,
  email         text,
  attending     boolean not null,
  guest_count   int  not null default 1 check (guest_count between 1 and 10),
  note          text,
  created_at    timestamptz not null default now()
);

create index if not exists rsvps_invitation_id_idx on public.rsvps(invitation_id);

-- ── Row Level Security ──────────────────────────────────────────────────────
-- Public anon access is intentional for this app: templates are public,
-- invitations are readable by anyone with the slug, and RSVPs are write-only
-- for guests (no public read).
alter table public.templates   enable row level security;
alter table public.invitations enable row level security;
alter table public.rsvps       enable row level security;

drop policy if exists "templates are public" on public.templates;
create policy "templates are public"
  on public.templates for select using (true);

drop policy if exists "invitations readable by anyone with slug" on public.invitations;
create policy "invitations readable by anyone with slug"
  on public.invitations for select using (true);

drop policy if exists "anyone can create an invitation" on public.invitations;
create policy "anyone can create an invitation"
  on public.invitations for insert with check (true);

drop policy if exists "anyone can submit an rsvp" on public.rsvps;
create policy "anyone can submit an rsvp"
  on public.rsvps for insert with check (true);

-- ── Seed templates (matches the previously hardcoded list) ──────────────────
insert into public.templates (id, name, style, primary_color, secondary_color, accent_color, bg_pattern, sort_order) values
  ('elegant-rose',    'Elegant Rose',    'Romantic & Timeless',       '#4a3728', '#faf7f4', '#c9a87c', 'floral',    1),
  ('modern-minimal',  'Modern Minimal',  'Clean & Contemporary',      '#1a1a1a', '#ffffff', '#b8860b', 'minimal',   2),
  ('garden-bloom',    'Garden Bloom',    'Fresh & Natural',           '#2d4a3e', '#f5f7f4', '#8fbc8f', 'floral',    3),
  ('classic-charm',   'Classic Charm',   'Traditional & Elegant',     '#3d3d3d', '#fffef9', '#d4af37', 'classic',   4),
  ('rustic-romance',  'Rustic Romance',  'Warm & Cozy',               '#5c4033', '#f9f5f0', '#cd853f', 'geometric', 5),
  ('ocean-breeze',    'Ocean Breeze',    'Coastal & Serene',          '#2c5364', '#f0f8ff', '#5dade2', 'minimal',   6)
on conflict (id) do update set
  name            = excluded.name,
  style           = excluded.style,
  primary_color   = excluded.primary_color,
  secondary_color = excluded.secondary_color,
  accent_color    = excluded.accent_color,
  bg_pattern      = excluded.bg_pattern,
  sort_order      = excluded.sort_order;
