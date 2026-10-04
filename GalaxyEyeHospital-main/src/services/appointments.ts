import { supabase } from '../lib/supabase';

export interface AppointmentRequest {
  /** Generate once with crypto.randomUUID(); reuse for retries of the same data. */
  requestKey: string;
  branchId: number;
  /** YYYY-MM-DD, interpreted in the hospital's Asia/Kolkata timezone. */
  appointmentDate: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
}

export interface AppointmentReceipt {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export async function requestAppointment(input: AppointmentRequest): Promise<AppointmentReceipt> {
  const { data, error } = await supabase.rpc('request_appointment', {
    p_request_key: input.requestKey,
    p_branch_id: input.branchId,
    p_appointment_date: input.appointmentDate,
    p_time_slot: input.timeSlot,
    p_full_name: input.fullName,
    p_phone: input.phone,
    p_email: input.email,
  });

  if (error) {
    if (error.code === '22023' || error.code === '23505') throw new Error(error.message);
    throw new Error('Unable to submit your appointment request. Please try again.');
  }
  if (!data || typeof data.id !== 'string' ||
      !['pending', 'confirmed', 'cancelled', 'completed'].includes(data.status)) {
    throw new Error('The appointment service returned an unexpected response.');
  }
  return data as AppointmentReceipt;
}
