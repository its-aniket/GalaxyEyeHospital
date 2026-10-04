-- Visitors may be anonymous or already signed in as hospital staff. Both can
-- submit a consultation request, but neither gains public read access.
BEGIN;

GRANT INSERT ON public.home_consultation_leads TO authenticated;

CREATE POLICY "authenticated_insert_home_consultation_leads"
  ON public.home_consultation_leads FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "authenticated_upload_eye_photos"
  ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'eye-photos');

COMMIT;
