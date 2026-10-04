import { supabase } from '../lib/supabase';

export type ContactMessageStatus = 'New' | 'Contacted' | 'Closed';

export interface StaffContactMessage {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
}

type ContactMessageRow = {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  message: string;
  status: ContactMessageStatus;
  created_at: string;
};

export async function getStaffContactMessages(): Promise<StaffContactMessage[]> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('id, full_name, phone, email, message, status, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return ((data ?? []) as ContactMessageRow[]).map((row) => ({
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function updateContactMessageStatus(id: number, status: ContactMessageStatus): Promise<void> {
  const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);
  if (error) throw error;
}
