-- Hospital staff access for appointment requests.
-- Before using the staff page, create each staff member in Supabase Auth, then
-- insert their auth.users id into public.appointment_staff (see README).
BEGIN;

CREATE TABLE public.appointment_staff (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.appointment_staff ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.appointment_staff FROM PUBLIC, anon, authenticated;

CREATE FUNCTION public.is_appointment_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.appointment_staff
    WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_appointment_staff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_appointment_staff() TO authenticated;

GRANT SELECT, UPDATE (status) ON public.appointment_requests TO authenticated;

CREATE POLICY "appointment_staff_read_requests"
  ON public.appointment_requests FOR SELECT TO authenticated
  USING ((SELECT public.is_appointment_staff()));

CREATE POLICY "appointment_staff_update_status"
  ON public.appointment_requests FOR UPDATE TO authenticated
  USING ((SELECT public.is_appointment_staff()))
  WITH CHECK ((SELECT public.is_appointment_staff()));

COMMIT;
