import { supabase } from '../lib/supabase';

export type ConsultationStatus = 'New' | 'Contacted' | 'Closed';

export interface StaffConsultation {
  id: number;
  fullName: string;
  contactNumber: string;
  whichEye: 'Left' | 'Right' | 'Both';
  problemDescription: string;
  sinceHowLong: string | null;
  preferredCallbackTime: string | null;
  consent: boolean;
  photoUrl: string | null;
  status: ConsultationStatus;
  createdAt: string;
}

type ConsultationRow = {
  id: number;
  full_name: string;
  contact_number: string;
  which_eye: 'Left' | 'Right' | 'Both';
  problem_description: string;
  since_how_long: string | null;
  preferred_callback_time: string | null;
  consent: boolean;
  image_url: string;
  status: ConsultationStatus;
  created_at: string;
};

export async function getStaffConsultations(): Promise<StaffConsultation[]> {
  const { data, error } = await supabase
    .from('home_consultation_leads')
    .select('id, full_name, contact_number, which_eye, problem_description, since_how_long, preferred_callback_time, consent, image_url, status, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;

  const rows = (data ?? []) as ConsultationRow[];
  const signedUrls = await Promise.all(rows.map(async (row) => {
    const { data: signedPhoto } = await supabase.storage
      .from('eye-photos')
      .createSignedUrl(row.image_url, 60 * 60);
    return signedPhoto?.signedUrl ?? null;
  }));

  return rows.map((row, index) => ({
    id: row.id,
    fullName: row.full_name,
    contactNumber: row.contact_number,
    whichEye: row.which_eye,
    problemDescription: row.problem_description,
    sinceHowLong: row.since_how_long,
    preferredCallbackTime: row.preferred_callback_time,
    consent: row.consent,
    photoUrl: signedUrls[index],
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function updateConsultationStatus(id: number, status: ConsultationStatus): Promise<void> {
  const { error } = await supabase
    .from('home_consultation_leads')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
}
