import { supabase } from '../lib/supabase';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface StaffAppointment {
  id: string;
  appointmentDate: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  status: AppointmentStatus;
  createdAt: string;
  branchName: string;
}

type AppointmentRow = {
  id: string; appointment_date: string; time_slot: string; full_name: string;
  phone: string; email: string; status: AppointmentStatus; created_at: string;
  branches: { name: string } | { name: string }[] | null;
};

export async function getStaffAppointments(): Promise<StaffAppointment[]> {
  const { data, error } = await supabase
    .from('appointment_requests')
    .select('id, appointment_date, time_slot, full_name, phone, email, status, created_at, branches(name)')
    .order('appointment_date')
    .order('time_slot')
    .order('created_at');
  if (error) throw error;
  return (data as AppointmentRow[]).map((row) => ({
    id: row.id, appointmentDate: row.appointment_date, timeSlot: row.time_slot,
    fullName: row.full_name, phone: row.phone, email: row.email, status: row.status,
    createdAt: row.created_at,
    branchName: Array.isArray(row.branches) ? row.branches[0]?.name ?? 'Unknown branch' : row.branches?.name ?? 'Unknown branch',
  }));
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<void> {
  const { error } = await supabase.from('appointment_requests').update({ status }).eq('id', id);
  if (error) throw error;
}
