# Appointment backend

This project uses Supabase Postgres and its RPC API. No separate Node server is required.
The appointment endpoint accepts a **request**, pending hospital confirmation; it does
not reserve exclusive capacity or send email/SMS.

## Deployment status

Applied `202609050001_appointment_requests.sql` to project
`buhgbvpkpkudjnszezxb` through the Supabase SQL Editor on 2026-09-05.
Do not reapply this migration to that project. This was a manual SQL deployment,
not a Supabase CLI migration-history update.

Live verification passed: anonymous booking creation, identical-request retry,
duplicate rejection, past-date rejection, and blocked public reads. Test bookings
were rolled back. RLS is enabled; anonymous and ordinary authenticated users have
no table read access, and anonymous direct inserts are denied. The public REST RPC
returned the expected validation error (`22023`) for an invalid request.

## Staff appointment page

The app includes the protected route `/staff/appointments`. It uses Supabase Auth
and shows patient appointment data only after the signed-in account has been
approved as hospital staff.

1. Apply `supabase/migrations/202609060001_staff_appointments.sql` once.
2. In Supabase Dashboard → Authentication → Users, create or invite each hospital
   staff account. Do not use a public sign-up flow for this page.
3. As a database administrator, approve an existing user by running this query in
   the SQL Editor, replacing the email address:

```sql
INSERT INTO public.appointment_staff (user_id)
SELECT id FROM auth.users WHERE email = 'staff@example.com'
ON CONFLICT (user_id) DO NOTHING;
```

The approved account can read appointment requests and update only their status.
An ordinary authenticated user cannot read or alter appointments. Removing staff
access is reversible:

```sql
DELETE FROM public.appointment_staff
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'staff@example.com');
```

## Eye Care at Home

Apply `supabase/migrations/202609060002_home_consultation_leads.sql` after the
staff migration. It creates the consultation-lead table with public submission
and staff-only review access. Create the private `eye-photos` bucket and its
upload policies from `supabase/schema.sql` before accepting photo uploads.

Apply `supabase/migrations/202609060003_authenticated_consultation_submission.sql`
as well. It lets a visitor who is already signed in submit the same form without
giving authenticated users permission to read consultation leads or photos.

## Provision

1. Create/open your Supabase project. For an empty database, run `supabase/schema.sql`
   in its SQL Editor once. Do not rerun that file against an existing schema.
2. Run `supabase/migrations/202609050001_appointment_requests.sql` once in the SQL Editor.
   It is transactional and requires the existing `branches` and `appointment_time_slots` tables.
3. Populate those two tables with real hospital branches and offered times in the Table Editor.
   Times must use formats such as `10:00 AM` or `02:30 PM`.
   The old `seed.ts` references missing `src/data` files and cannot currently be used.
4. Set the two public frontend variables from `.env.example` in `.env` and your hosting environment.
   Never put a service-role key or database password in a `VITE_` variable.
5. The homepage appointment form calls `requestAppointment` from
   `src/services/appointments.ts`. Booking buttons link to `/#appointment`.
   Rebuild and deploy the frontend to publish the connected form.

## API

`POST https://YOUR_PROJECT_REF.supabase.co/rest/v1/rpc/request_appointment`

Headers: `apikey: YOUR_PUBLIC_ANON_KEY`, `Content-Type: application/json`.

```json
{
  "p_request_key": "435ca4dd-a268-4641-ae76-4ad190554361",
  "p_branch_id": 1,
  "p_appointment_date": "2026-09-10",
  "p_time_slot": "10:00 AM",
  "p_full_name": "Test Patient",
  "p_phone": "9876543210",
  "p_email": "patient@example.com"
}
```

Use an actual branch/slot and a future date within 90 days. Success returns
`{"id":"<uuid>","status":"pending"}`. Generate a random request key for each new
submission; reuse it only when retrying unchanged details after a network failure.
The same key and details return the original receipt. Reusing the key with changed
details is rejected. A second active request for the same phone, branch, date and
time is rejected even with a new key. Other patients can request the same slot;
staff determine capacity when confirming.

Validation runs inside Postgres, including Indian mobile numbers, email, branch,
configured time slot, and future date/time in Asia/Kolkata. Responses contain only
the receipt ID and status, never stored contact details.

## Access and operations

Anonymous visitors and ordinary authenticated users cannot read, update, delete,
or directly insert patient records. Only the validated RPC is exposed to them.
Staff can initially review requests in the Supabase Dashboard. A staff application
will need explicit staff authorization; ordinary signup does not grant access.

Before a public launch, add abuse protection (such as a CAPTCHA-validated server
endpoint and rate limiting), staff scheduling/capacity rules, and notification
delivery if required. The RPC currently allows unauthenticated requests and does
not implement those features.

The function's fixed search path and explicit privileges follow
[Supabase database function guidance](https://supabase.com/docs/guides/database/functions).

## Database tests

`tests/appointments.sql` runs in a transaction and rolls back its fixtures. Run
only against a disposable test database after applying the schema and migration:

```powershell
psql "$env:TEST_DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/tests/appointments.sql
```

These tests cover validation, retry behavior, duplicate rejection, and public
access restrictions. They do not contact patients or send notifications.
