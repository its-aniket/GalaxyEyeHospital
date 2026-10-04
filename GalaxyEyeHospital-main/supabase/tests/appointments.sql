\set ON_ERROR_STOP on
BEGIN;

INSERT INTO public.branches
  (id, name, type, address, city, state, pincode, phone, email, map_url, lat, lng)
VALUES (-9876, 'Backend test branch', 'clinic', 'Test only', 'Test', 'Test',
        '000000', '9876543210', 'test@example.com', '', 0, 0);
INSERT INTO public.appointment_time_slots (time_slot, sort_order) VALUES ('11:47 AM', 9999);

CREATE FUNCTION pg_temp.expect_error(statement TEXT, expected_code TEXT) RETURNS void
LANGUAGE plpgsql AS $$
BEGIN
  BEGIN
    EXECUTE statement;
  EXCEPTION WHEN OTHERS THEN
    IF SQLSTATE = expected_code THEN RETURN; END IF;
    RAISE EXCEPTION 'Expected %, got %: %', expected_code, SQLSTATE, SQLERRM;
  END;
  RAISE EXCEPTION 'Expected failure %, but statement succeeded: %', expected_code, statement;
END;
$$;

-- Exercise actual public permissions, not the database owner's privileges.
SET LOCAL ROLE anon;
DO $$
DECLARE
  receipt JSONB;
  retry JSONB;
  appointment_day DATE := (now() AT TIME ZONE 'Asia/Kolkata')::date + 1;
BEGIN
  receipt := public.request_appointment('435ca4dd-a268-4641-ae76-4ad190554361',
    -9876, appointment_day, '11:47 AM', ' Test Patient ', '+91 98765 43210', 'PATIENT@example.com');
  IF receipt->>'status' <> 'pending' OR receipt->>'id' IS NULL THEN
    RAISE EXCEPTION 'Invalid receipt: %', receipt;
  END IF;
  retry := public.request_appointment('435ca4dd-a268-4641-ae76-4ad190554361',
    -9876, appointment_day, '11:47 AM', 'Test Patient', '9876543210', 'patient@example.com');
  IF receipt <> retry THEN RAISE EXCEPTION 'Retry did not return original receipt'; END IF;
END;
$$;

SELECT pg_temp.expect_error('SELECT * FROM public.appointment_requests', '42501');
SELECT pg_temp.expect_error('DELETE FROM public.appointment_requests', '42501');
SELECT pg_temp.expect_error('UPDATE public.appointment_requests SET status = ''confirmed''', '42501');
SELECT pg_temp.expect_error('INSERT INTO public.appointment_requests DEFAULT VALUES', '42501');

DO $$
DECLARE
  day DATE := (now() AT TIME ZONE 'Asia/Kolkata')::date + 1;
  call_template TEXT := 'SELECT public.request_appointment(%L::uuid, %L::integer, %L::date, %L, %L, %L, %L)';
BEGIN
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -9876, day,
    '11:47 AM', 'Test Patient', '9876543210', 'patient@example.com'), '23505');
  PERFORM pg_temp.expect_error(format(call_template, '435ca4dd-a268-4641-ae76-4ad190554361', -9876, day,
    '11:47 AM', 'Different Patient', '9876543210', 'patient@example.com'), '22023');
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -9876, day - 2,
    '11:47 AM', 'Test Patient', '9876543210', 'patient@example.com'), '22023');
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -9876, day + 90,
    '11:47 AM', 'Test Patient', '9876543210', 'patient@example.com'), '22023');
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -9876, day,
    '11:47 AM', 'Test Patient', '123', 'patient@example.com'), '22023');
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -9876, day,
    '11:47 AM', 'Test Patient', '9876543210', 'invalid-email'), '22023');
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -9876, day,
    '11:47 AM', ' ', '9876543210', 'patient@example.com'), '22023');
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -9876, day,
    '25:00 PM', 'Test Patient', '9876543210', 'patient@example.com'), '22023');
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -9876, day,
    NULL, 'Test Patient', '9876543210', 'patient@example.com'), '22023');
  PERFORM pg_temp.expect_error(format(call_template, gen_random_uuid(), -999999, day,
    '11:47 AM', 'Test Patient', '9876543210', 'patient@example.com'), '22023');
END;
$$;

SET LOCAL ROLE authenticated;
SELECT pg_temp.expect_error('SELECT * FROM public.appointment_requests', '42501');
SELECT pg_temp.expect_error('UPDATE public.appointment_requests SET status = ''confirmed''', '42501');
RESET ROLE;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.appointment_requests WHERE branch_id = -9876) <> 1 THEN
    RAISE EXCEPTION 'Expected exactly one persisted request';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.appointment_requests WHERE branch_id = -9876
    AND full_name = 'Test Patient' AND phone = '9876543210' AND email = 'patient@example.com') THEN
    RAISE EXCEPTION 'Contact normalization failed';
  END IF;
END;
$$;
ROLLBACK;
\echo Appointment backend tests passed; fixtures rolled back.
