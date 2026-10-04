-- Eye Care at Home consultation requests and staff-only access.
BEGIN;

CREATE TABLE IF NOT EXISTS public.home_consultation_leads (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  which_eye TEXT NOT NULL CHECK (which_eye IN ('Left', 'Right', 'Both')),
  problem_description TEXT NOT NULL,
  since_how_long TEXT,
  preferred_callback_time TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.home_consultation_leads ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.home_consultation_leads FROM PUBLIC, anon, authenticated;
GRANT INSERT ON public.home_consultation_leads TO anon;
GRANT SELECT, UPDATE (status) ON public.home_consultation_leads TO authenticated;

CREATE POLICY "public_insert_home_consultation_leads"
  ON public.home_consultation_leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "appointment_staff_read_home_consultation_leads"
  ON public.home_consultation_leads FOR SELECT TO authenticated
  USING ((SELECT public.is_appointment_staff()));

CREATE POLICY "appointment_staff_update_home_consultation_status"
  ON public.home_consultation_leads FOR UPDATE TO authenticated
  USING ((SELECT public.is_appointment_staff()))
  WITH CHECK ((SELECT public.is_appointment_staff()));

CREATE INDEX IF NOT EXISTS idx_home_consultation_leads_status
  ON public.home_consultation_leads (status);
CREATE INDEX IF NOT EXISTS idx_home_consultation_leads_created_at
  ON public.home_consultation_leads (created_at DESC);

COMMIT;
