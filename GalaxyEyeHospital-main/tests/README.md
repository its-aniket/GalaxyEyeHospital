# Appointment form checks

Run date/time and contact-validation tests with Node 24:

```powershell
node --test tests/appointmentForm.test.mjs
```

For isolated browser submission testing:

```powershell
node node_modules/vite/bin/vite.js --config tests/vite.appointment.config.ts --configLoader runner --port 5174
```

Open `http://localhost:5174/#appointment`. This test config reads real branch and
slot options, but replaces the booking service with an in-memory fixture. It never
creates a Supabase appointment. Do not deploy with this config.

Use name ` Browser Test `, mobile `+91 (98765) 43210`, email
`BROWSER@example.com`, and select a future date/time. The first submission fails;
retrying unchanged must show a pending receipt. The fixture asserts that the
retry keeps the same request key and normalized contact details. Check that inputs
are disabled during submission and that starting a new request clears the form.

Verified in the browser on 2026-09-06: invalid mobile validation, submission lock,
failure feedback, successful retry, receipt display, and clean form reset.
Live database behavior was separately verified during the migration; see
`supabase/README.md`.
