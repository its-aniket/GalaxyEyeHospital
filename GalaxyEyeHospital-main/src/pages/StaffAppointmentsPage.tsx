import PhoneNumber from "../components/PhoneNumber";
import { phoneHref } from "../lib/phone";
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getStaffAppointments, updateAppointmentStatus } from '../services/staffAppointments';
import type { AppointmentStatus, StaffAppointment } from '../services/staffAppointments';
import ThemedSelect from '../components/ThemedSelect';

const statuses: AppointmentStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];
const statusClass: Record<AppointmentStatus, string> = {
  pending: 'bg-amber-100 text-amber-900', confirmed: 'bg-teal-100 text-teal-900',
  cancelled: 'bg-red-100 text-red-900', completed: 'bg-slate-200 text-slate-800',
};

function dateTime(value: string): string {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(value));
}

function statusLabel(status: AppointmentStatus | 'all'): string {
  return status === 'all' ? 'All statuses' : `${status[0].toUpperCase()}${status.slice(1)}`;
}

export default function StaffAppointmentsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<StaffAppointment[]>([]);
  const [filter, setFilter] = useState<'all' | AppointmentStatus>('all');
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => { if (active) { setSession(data.session); setLoading(false); } });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession); setAppointments([]); setError(null); setMessage(null); setLoading(false);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  async function loadAppointments() {
    if (!session) return;
    setLoading(true); setError(null);
    try { setAppointments(await getStaffAppointments()); }
    catch (cause) {
      const detail = cause instanceof Error ? cause.message : 'Unable to load appointments.';
      setError(detail.includes('permission denied') || detail.includes('row-level security')
        ? 'This signed-in account is not approved for appointment access. Ask an administrator to add it to the hospital staff list.'
        : 'Unable to load appointments. Please try again.');
    } finally { setLoading(false); }
  }

  useEffect(() => { void loadAppointments(); }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(null); setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) setError('Sign-in failed. Check the email address and password.');
    setSubmitting(false);
  }

  async function changeStatus(appointment: StaffAppointment, status: AppointmentStatus) {
    if (status === appointment.status) return;
    setError(null); setMessage(null); setUpdating(appointment.id);
    try {
      await updateAppointmentStatus(appointment.id, status);
      setAppointments((current) => current.map((item) => item.id === appointment.id ? { ...item, status } : item));
      setMessage(`Updated ${appointment.fullName}'s appointment to ${status}.`);
    } catch {
      setError('Unable to update the appointment. Refresh the page and try again.');
    } finally { setUpdating(null); }
  }

  const visibleAppointments = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return appointments.filter((appointment) => (filter === 'all' || appointment.status === filter)
      && (!needle || [appointment.fullName, appointment.phone, appointment.email, appointment.branchName, appointment.appointmentDate]
        .some((value) => value.toLowerCase().includes(needle))));
  }, [appointments, filter, query]);

  if (loading && !session) return <main className="min-h-screen grid place-items-center">Loading secure staff access…</main>;

  if (!session) return <main className="min-h-screen bg-slate-50 pt-32 pb-16 px-4">
    <section className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-7 space-y-6" aria-labelledby="staff-signin-title">
      <div><p className="text-sm font-semibold text-[hsl(var(--accent))] uppercase tracking-wide">Hospital staff</p><h1 id="staff-signin-title" className="text-3xl font-bold text-[hsl(var(--primary))]">Appointments</h1><p className="mt-2 text-gray-600">Sign in with your approved hospital account.</p></div>
      <form onSubmit={signIn} className="space-y-4">
        <label className="block text-sm font-medium">Email<input required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label>
        <label className="block text-sm font-medium">Password<input required autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button disabled={submitting} className="w-full rounded-lg bg-[hsl(var(--primary))] py-3 font-semibold text-white disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </section>
  </main>;

  return <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
    <section className="max-w-7xl mx-auto space-y-6" aria-labelledby="staff-appointments-title">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold text-[hsl(var(--accent))] uppercase tracking-wide">Hospital staff</p><h1 id="staff-appointments-title" className="text-3xl font-bold text-[hsl(var(--primary))]">Appointment requests</h1><p className="mt-1 text-gray-600">Signed in as {session.user.email}</p></div><div className="flex flex-wrap gap-2"><Link to="/staff/consultations" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Consultations</Link><Link to="/staff/messages" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Messages</Link><button type="button" onClick={() => void supabase.auth.signOut()} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Sign out</button></div></div>
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-end">
        <label className="flex-1 min-w-55 text-sm font-medium">Search<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, phone, email, branch, date" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
        <div className="min-w-42 text-sm font-medium"><span className="block mb-1">Status</span><ThemedSelect value={filter} ariaLabel="Filter appointments by status" onChange={setFilter} buttonClassName="py-2" options={(['all', ...statuses] as const).map((status) => ({ value: status, label: statusLabel(status) }))} /></div>
        <button type="button" onClick={() => void loadAppointments()} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Refresh</button>
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
      {message && <p role="status" className="rounded-lg bg-teal-50 p-4 text-teal-900">{message}</p>}
      {loading ? <p role="status" className="text-gray-600">Loading appointments…</p> : !error && <div className="overflow-x-auto bg-white rounded-xl shadow-sm"><table className="w-full min-w-225 text-left text-sm"><thead className="bg-slate-100 text-slate-700"><tr><th className="p-4">Patient</th><th className="p-4">Appointment</th><th className="p-4">Branch</th><th className="p-4">Requested</th><th className="p-4">Status</th></tr></thead><tbody>{visibleAppointments.map((appointment) => <tr key={appointment.id} className="border-t border-slate-100"><td className="p-4"><p className="font-semibold text-slate-900">{appointment.fullName}</p><a className="text-[hsl(var(--primary))] hover:underline" href={phoneHref(appointment.phone)}><PhoneNumber value={appointment.phone} /></a><br /><a className="text-[hsl(var(--primary))] hover:underline" href={`mailto:${appointment.email}`}>{appointment.email}</a></td><td className="p-4 whitespace-nowrap">{appointment.appointmentDate}<br />{appointment.timeSlot} IST</td><td className="p-4">{appointment.branchName}</td><td className="p-4 whitespace-nowrap">{dateTime(appointment.createdAt)}</td><td className="p-4"><ThemedSelect portal value={appointment.status} disabled={updating === appointment.id} ariaLabel={`Status for ${appointment.fullName}`} onChange={(status) => void changeStatus(appointment, status)} buttonClassName={`rounded-full px-3 py-1.5 ${statusClass[appointment.status]}`} options={statuses.map((status) => ({ value: status, label: statusLabel(status) }))} /></td></tr>)}</tbody></table>{visibleAppointments.length === 0 && <p className="p-8 text-center text-gray-600">No appointments match these filters.</p>}</div>}
    </section>
  </main>;
}
