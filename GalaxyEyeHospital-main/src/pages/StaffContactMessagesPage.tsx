import PhoneNumber from "../components/PhoneNumber";
import { phoneHref } from "../lib/phone";
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import ThemedSelect from '../components/ThemedSelect';
import { supabase } from '../lib/supabase';
import { getStaffContactMessages, updateContactMessageStatus } from '../services/staffContactMessages';
import type { ContactMessageStatus, StaffContactMessage } from '../services/staffContactMessages';

const statuses: ContactMessageStatus[] = ['New', 'Contacted', 'Closed'];
const statusClass: Record<ContactMessageStatus, string> = {
  New: 'bg-amber-100 text-amber-900',
  Contacted: 'bg-teal-100 text-teal-900',
  Closed: 'bg-slate-200 text-slate-800',
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(value));
}

export default function StaffContactMessagesPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<StaffContactMessage[]>([]);
  const [filter, setFilter] = useState<'all' | ContactMessageStatus>('all');
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => { if (active) { setSession(data.session); setLoading(false); } });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession); setMessages([]); setError(null); setNotice(null); setLoading(false);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  async function loadMessages() {
    if (!session) return;
    setLoading(true); setError(null);
    try { setMessages(await getStaffContactMessages()); }
    catch (cause) {
      const detail = cause instanceof Error ? cause.message : '';
      setError(detail.includes('permission denied') || detail.includes('row-level security')
        ? 'This signed-in account is not approved for contact-message access. Ask an administrator to add it to the hospital staff list.'
        : 'Unable to load contact messages. Please try again.');
    } finally { setLoading(false); }
  }

  useEffect(() => { void loadMessages(); }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(null); setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) setError('Sign-in failed. Check the email address and password.');
    setSubmitting(false);
  }

  async function changeStatus(message: StaffContactMessage, status: ContactMessageStatus) {
    if (message.status === status) return;
    setError(null); setNotice(null); setUpdating(message.id);
    try {
      await updateContactMessageStatus(message.id, status);
      setMessages((items) => items.map((item) => item.id === message.id ? { ...item, status } : item));
      setNotice(`Updated ${message.fullName}'s message to ${status}.`);
    } catch {
      setError('Unable to update the message. Refresh the page and try again.');
    } finally { setUpdating(null); }
  }

  const visibleMessages = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return messages.filter((message) => (filter === 'all' || message.status === filter)
      && (!needle || [message.fullName, message.phone, message.email ?? '', message.message]
        .some((value) => value.toLowerCase().includes(needle))));
  }, [messages, filter, query]);

  if (loading && !session) return <main className="min-h-screen grid place-items-center">Loading secure staff access…</main>;

  if (!session) return <main className="min-h-screen bg-slate-50 pt-32 pb-16 px-4">
    <section className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-7 space-y-6" aria-labelledby="staff-signin-title">
      <div><p className="text-sm font-semibold text-[hsl(var(--accent))] uppercase tracking-wide">Hospital staff</p><h1 id="staff-signin-title" className="text-3xl font-bold text-[hsl(var(--primary))]">Contact messages</h1><p className="mt-2 text-gray-600">Sign in with your approved hospital account.</p></div>
      <form onSubmit={signIn} className="space-y-4">
        <label className="block text-sm font-medium">Email<input required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label>
        <label className="block text-sm font-medium">Password<input required autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button disabled={submitting} className="w-full rounded-lg bg-[hsl(var(--primary))] py-3 font-semibold text-white disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </section>
  </main>;

  return <main className="min-h-screen bg-slate-50 pt-28 pb-16 px-4">
    <section className="max-w-7xl mx-auto space-y-6" aria-labelledby="staff-messages-title">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold text-[hsl(var(--accent))] uppercase tracking-wide">Hospital staff</p><h1 id="staff-messages-title" className="text-3xl font-bold text-[hsl(var(--primary))]">Contact messages</h1><p className="mt-1 text-gray-600">Signed in as {session.user.email}</p></div><div className="flex flex-wrap gap-2"><Link to="/staff/appointments" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Appointments</Link><Link to="/staff/consultations" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Consultations</Link><button type="button" onClick={() => void supabase.auth.signOut()} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Sign out</button></div></div>
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-end"><label className="flex-1 min-w-55 text-sm font-medium">Search<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, phone, email, message" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label><div className="min-w-42 text-sm font-medium"><span className="block mb-1">Status</span><ThemedSelect value={filter} ariaLabel="Filter contact messages by status" onChange={setFilter} buttonClassName="py-2" options={(['all', ...statuses] as const).map((status) => ({ value: status, label: status === 'all' ? 'All statuses' : status }))} /></div><button type="button" onClick={() => void loadMessages()} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium">Refresh</button></div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
      {notice && <p role="status" className="rounded-lg bg-teal-50 p-4 text-teal-900">{notice}</p>}
      {loading ? <p role="status" className="text-gray-600">Loading contact messages…</p> : !error && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleMessages.map((message) => <article key={message.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h2 className="truncate font-bold text-slate-900">{message.fullName}</h2><a href={phoneHref(message.phone)} className="text-sm text-[hsl(var(--primary))] hover:underline"><PhoneNumber value={message.phone} /></a>{message.email && <><span className="text-slate-400"> · </span><a href={`mailto:${message.email}`} className="text-sm text-[hsl(var(--primary))] hover:underline">{message.email}</a></>}<p className="mt-1 text-xs text-slate-500">{formatDate(message.createdAt)}</p></div></div><p className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{message.message}</p><div className="mt-4"><p className="mb-1 text-sm font-medium text-slate-600">Status</p><ThemedSelect portal value={message.status} disabled={updating === message.id} ariaLabel={`Status for ${message.fullName}`} onChange={(status) => void changeStatus(message, status)} buttonClassName={`rounded-full px-3 py-1.5 ${statusClass[message.status]}`} options={statuses.map((status) => ({ value: status, label: status }))} /></div></article>)}{visibleMessages.length === 0 && <p className="col-span-full rounded-xl bg-white p-8 text-center text-gray-600 shadow-sm">No contact messages match these filters.</p>}</div>}
    </section>
  </main>;
}
