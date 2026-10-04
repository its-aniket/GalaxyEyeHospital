-- Requires branches and appointment_time_slots from supabase/schema.sql.
BEGIN;

CREATE TABLE public.appointment_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_key UUID NOT NULL UNIQUE,
  branch_id INTEGER NOT NULL REFERENCES public.branches(id),
  appointment_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  phone TEXT NOT NULL CHECK (phone ~ '^[6-9][0-9]{9}$'),
  email TEXT NOT NULL CHECK (char_length(email) <= 254 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX appointment_requests_schedule_idx
  ON public.appointment_requests (appointment_date, branch_id, status);
CREATE UNIQUE INDEX appointment_requests_active_duplicate_idx
  ON public.appointment_requests (phone, branch_id, appointment_date, time_slot)
  WHERE status IN ('pending', 'confirmed');

ALTER TABLE public.appointment_requests ENABLE ROW LEVEL SECURITY;
-- Neither public visitors nor ordinary signed-in users can inspect patient data.
REVOKE ALL ON public.appointment_requests FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointment_requests TO service_role;

-- This is the only public write entry point. Definer rights allow a validated
-- insert without granting callers direct access to the patient table.
CREATE FUNCTION public.request_appointment(
  p_request_key UUID,
  p_branch_id INTEGER,
  p_appointment_date DATE,
  p_time_slot TEXT,
  p_full_name TEXT,
  p_phone TEXT,
  p_email TEXT
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_name TEXT := btrim(p_full_name);
  v_phone TEXT := regexp_replace(p_phone, '[[:space:]()+-]', '', 'g');
  v_email TEXT := lower(btrim(p_email));
  v_slot TEXT := btrim(p_time_slot);
  v_now TIMESTAMP := clock_timestamp() AT TIME ZONE 'Asia/Kolkata';
  v_time TIME;
  v_existing public.appointment_requests%ROWTYPE;
  v_id UUID;
BEGIN
  IF char_length(v_phone) = 12 AND left(v_phone, 2) = '91' THEN
    v_phone := substring(v_phone FROM 3);
  END IF;
  IF p_request_key IS NULL OR p_branch_id IS NULL OR p_appointment_date IS NULL
    OR v_name IS NULL OR char_length(v_name) NOT BETWEEN 2 AND 120
    OR v_phone IS NULL OR v_phone !~ '^[6-9][0-9]{9}$'
    OR v_email IS NULL OR char_length(v_email) > 254
    OR v_email !~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    OR v_slot IS NULL OR v_slot !~ '^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$' THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'Please provide valid appointment and contact details.';
  END IF;

  -- Serialize retries for the same request key, including simultaneous calls.
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_request_key::text, 0));
  SELECT * INTO v_existing FROM public.appointment_requests WHERE request_key = p_request_key;
  IF FOUND THEN
    IF ROW(v_existing.branch_id, v_existing.appointment_date, v_existing.time_slot,
           v_existing.full_name, v_existing.phone, v_existing.email)
       IS DISTINCT FROM ROW(p_branch_id, p_appointment_date, v_slot, v_name, v_phone, v_email) THEN
      RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'This request key was already used. Start a new request.';
    END IF;
    RETURN jsonb_build_object('id', v_existing.id, 'status', v_existing.status);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.branches WHERE id = p_branch_id) THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'Select a valid branch.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.appointment_time_slots WHERE time_slot = v_slot) THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'Select a valid time slot.';
  END IF;
  v_time := v_slot::time;
  IF p_appointment_date + v_time <= v_now OR p_appointment_date > v_now::date + 90 THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'Choose a future appointment within the next 90 days.';
  END IF;

  INSERT INTO public.appointment_requests
    (request_key, branch_id, appointment_date, time_slot, full_name, phone, email)
  VALUES (p_request_key, p_branch_id, p_appointment_date, v_slot, v_name, v_phone, v_email)
  RETURNING id INTO v_id;
  RETURN jsonb_build_object('id', v_id, 'status', 'pending');
EXCEPTION WHEN unique_violation THEN
  RAISE EXCEPTION USING ERRCODE = '23505', MESSAGE = 'An appointment request already exists for this phone, branch, date and time.';
END;
$$;

REVOKE ALL ON FUNCTION public.request_appointment(UUID, INTEGER, DATE, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.request_appointment(UUID, INTEGER, DATE, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

COMMIT;
