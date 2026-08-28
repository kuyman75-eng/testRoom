/*
# Create event_registrations table (single-tenant, no auth)

1. New Tables
- `event_registrations`
- `id` (uuid, primary key)
- `name` (text, not null) — applicant's full name
- `phone` (text, not null) — applicant's phone number
- `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `event_registrations`.
- Allow anon + authenticated INSERT only (public submissions, no reads/updates/deletes from the client).
*/

CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_registrations" ON event_registrations;
CREATE POLICY "anon_insert_registrations" ON event_registrations
  FOR INSERT TO anon, authenticated WITH CHECK (true);