import PhoneNumber from "../components/PhoneNumber";
import { phoneHref } from "../lib/phone";
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import ThemedSelect from '../components/ThemedSelect';
import { supabase } from '../lib/supabase';
import { getStaffConsultations, updateConsultationStatus } from '../services/staffConsultations';
import type { ConsultationStatus, StaffConsultation } from '../services/staffConsultations';

const statuses: ConsultationStatus[] = ['New', 'Contacted', 'Closed'];
const statusClass: Record<ConsultationStatus, string> = {
  New: 'bg-amber-100 text-amber-900',
  Contacted: 'bg-teal-100 text-teal-900',
  Closed: 'bg-slate-200 text-slate-800',
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata',
  }).format(new Date(value));
}

export default function StaffConsultationsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<StaffConsultation[]>([]);
  const [filter, setFilter] = useState<'all' | ConsultationStatus>('all');
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) { setSession(data.session); setLoading(false); }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession); setConsultations([]); setError(null); setMessage(null); setLoading(false);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  async function loadConsultations() {
    if (!session) return;
    setLoading(true); setError(null);
    try { setConsultations(await getStaffConsultations()); }
    catch (cause) {
      const detail = cause instanceof Error ? cause.message : '';
      setError(detail.includes('permission denied') || detail.includes('row-level security')
        ? 'This signed-in account is not approved for consultation access. Ask an administrator to add it to the hospital staff list.'
        : 'Unable to load consultation requests. Please try again.');
    } finally { setLoading(false); }
  }

  useEffect(() => { void loadConsultations(); }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(null); setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) setError('Sign-in failed. Check the email address and password.');
    setSubmitting(false);
  }

  async function changeStatus(consultation: StaffConsultation, status: ConsultationStatus) {
    if (status === consultation.status) return;
    setError(null); setMessage(null); setUpdating(consultation.id);
    try {
      await updateConsultationStatus(consultation.id, status);
      setConsultations((items) => items.map((item) => item.id === consultation.id ? { ...item, status } : item));
      setMessage(`Updated ${consultation.fullName}'s consultation to ${status}.`);
    } catch {
      setError('Unable to update the consultation. Refresh the page and try again.');
    } finally { setUpdating(null); }
  }

  const visibleConsultations = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return consultations.filter((consultation) => (filter === 'all' || consultation.status === filter)
      && (!needle || [consultation.fullName, consultation.contactNumber, consultation.problemDescription, consultation.whichEye]
        .some((value) => value.toLowerCase().includes(needle))));
  }, [consultations, filter, query]);

  if (loading && !session) return <main className="min-h-screen grid place-items-center">Loading secure staff access…</main>;

  if (!session) return <main className="min-h-screen bg-slate-50 pt-32 pb-16 px-4">
    <section className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-7 space-y-6" aria-labelledby="staff-signin-title">
      <div><p className="text-sm font-semibold text-[hsl(var(--accent))] uppercase tracking-wide">Hospital staff</p><h1 id="staff-signin-title" className="text-3xl font-bold text-[hsl(var(--primary))]">Consultations</h1><p className="mt-2 text-gray-600">Sign in with your approved hospital account.</p></div>
      <form onSubmit={signIn} className="space-y-4">
        <label className="block text-sm font-medium">Email<input required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label>
        <label className="block text-sm font-medium">Password<input required autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button disabled={submitting} className="w-full rounded-lg bg-[hsl(var(--primary))] py-3 font-semibold text-white disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </section>
  </main>;

  return <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
    <section className="max-w-7xl mx-auto space-y-6" aria-labelledby="staff-consultations-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="text-sm font-semibold text-[hsl(var(--accent))] uppercase tracking-wide">Hospital staff</p><h1 id="staff-consultations-title" className="text-3xl font-bold text-[hsl(var(--primary))]">Free consultation requests</h1><p className="mt-1 text-gray-600">Signed in as {session.user.email}</p></div>
        <div className="flex flex-wrap gap-2"><Link to="/staff/appointments" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Appointments</Link><Link to="/staff/messages" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Messages</Link><button type="button" onClick={() => void supabase.auth.signOut()} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Sign out</button></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-end">
        <label className="flex-1 min-w-55 text-sm font-medium">Search<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, phone, eye, concern" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
        <div className="min-w-42 text-sm font-medium"><span className="block mb-1">Status</span><ThemedSelect value={filter} ariaLabel="Filter consultations by status" onChange={setFilter} buttonClassName="py-2" options={(['all', ...statuses] as const).map((status) => ({ value: status, label: status === 'all' ? 'All statuses' : status }))} /></div>
        <button type="button" onClick={() => void loadConsultations()} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Refresh</button>
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
      {message && <p role="status" className="rounded-lg bg-teal-50 p-4 text-teal-900">{message}</p>}
      {loading ? <p role="status" className="text-gray-600">Loading consultation requests…</p> : !error && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleConsultations.map((consultation) => <article key={consultation.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="flex gap-4"><a href={consultation.photoUrl ?? undefined} target="_blank" rel="noreferrer" className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">{consultation.photoUrl ? <img src={consultation.photoUrl} alt={`Uploaded eye photo from ${consultation.fullName}`} className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center text-xs text-slate-500">No photo</span>}</a><div className="min-w-0"><h2 className="truncate font-bold text-slate-900">{consultation.fullName}</h2><a className="text-sm text-[hsl(var(--primary))] hover:underline" href={phoneHref(consultation.contactNumber)}><PhoneNumber value={consultation.contactNumber} /></a><p className="mt-1 text-xs text-slate-500">{formatDate(consultation.createdAt)}</p></div></div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-slate-500">Affected eye</dt><dd className="font-medium">{consultation.whichEye}</dd></div><div><dt className="text-slate-500">Callback</dt><dd className="font-medium">{consultation.preferredCallbackTime ?? 'Not specified'}</dd></div>{consultation.sinceHowLong && <div><dt className="text-slate-500">Duration</dt><dd className="font-medium">{consultation.sinceHowLong}</dd></div>}</dl>
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700"><p className="font-medium text-slate-500">Concern</p><p className="mt-1 whitespace-pre-wrap">{consultation.problemDescription}</p></div>
          <div className="mt-4"><p className="mb-1 text-sm font-medium text-slate-600">Status</p><ThemedSelect portal value={consultation.status} disabled={updating === consultation.id} ariaLabel={`Status for ${consultation.fullName}`} onChange={(status) => void changeStatus(consultation, status)} buttonClassName={`rounded-full px-3 py-1.5 ${statusClass[consultation.status]}`} options={statuses.map((status) => ({ value: status, label: status }))} /></div>
        </article>)}
        {visibleConsultations.length === 0 && <p className="col-span-full rounded-xl bg-white p-8 text-center text-gray-600 shadow-sm">No consultation requests match these filters.</p>}
      </div>}
    </section>
  </main>;
}
