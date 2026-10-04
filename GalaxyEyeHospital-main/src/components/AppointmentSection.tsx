import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useQuery } from '../hooks/useQuery';
import { getBranches, getAppointmentTimeSlots } from '../services/api';
import { requestAppointment } from '../services/appointments';
import type { AppointmentReceipt } from '../services/appointments';
import { hospitalDate, isFutureSlot, lastAppointmentDate, normalizePhone, validateContact } from '../lib/appointmentForm';
import ThemedSelect from './ThemedSelect';

const inputClass = 'w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-[hsl(var(--accent))] focus:border-transparent outline-none disabled:opacity-60';
const cardClass = 'bg-white rounded-xl shadow-md p-6 space-y-4';

export default function AppointmentSection() {
  const { data: branches, loading: branchesLoading, error: branchError } = useQuery(getBranches);
  const { data: timeSlots, loading: slotsLoading, error: slotError } = useQuery(getAppointmentTimeSlots);
  const [now, setNow] = useState(() => new Date());
  const [branchId, setBranchId] = useState<number | null>(null);
  const [date, setDate] = useState(() => hospitalDate());
  const [time, setTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<AppointmentReceipt | null>(null);
  const inFlight = useRef(false);
  const attempt = useRef<{ payload: string; key: string } | null>(null);
  const feedback = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (receipt || error) feedback.current?.focus();
  }, [receipt, error]);

  const activeBranch = branches?.find((branch) => branch.id === branchId) ?? branches?.[0];
  const slots = [...new Set(timeSlots ?? [])];
  const today = hospitalDate(now);
  const maxDate = lastAppointmentDate(now);
  const validDate = date >= today && date <= maxDate;
  const activeTime = slots.includes(time) && validDate && isFutureSlot(date, time, now) ? time : '';
  const loading = branchesLoading || slotsLoading;
  const unavailable = !!branchError || !!slotError || !branches?.length || !slots.length;
  const locked = submitting || !!receipt;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || receipt) return;
    setError(null);
    const contactError = validateContact(fullName, phone, email);
    const current = new Date();
    if (contactError) { setError(contactError); return; }
    if (!activeBranch || unavailable) { setError('Appointment scheduling is unavailable. Please try again later.'); return; }
    if (date < hospitalDate(current) || date > lastAppointmentDate(current) || !activeTime || !isFutureSlot(date, activeTime, current)) {
      setError('Choose a future date and time within the next 90 days.'); return;
    }
    const details = {
      branchId: activeBranch.id, appointmentDate: date, timeSlot: activeTime,
      fullName: fullName.trim(), phone: normalizePhone(phone), email: email.trim().toLowerCase(),
    };
    const payload = JSON.stringify(details);
    inFlight.current = true;
    setSubmitting(true);
    try {
      // Keep retries stable after uncertain network responses; don't persist patient data.
      if (attempt.current?.payload !== payload) attempt.current = { payload, key: crypto.randomUUID() };
      const result = await requestAppointment({ ...details, requestKey: attempt.current.key });
      setReceipt(result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to submit your request. Please try again.');
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  function startNewRequest() {
    setReceipt(null); setError(null); setFullName(''); setPhone(''); setEmail('');
    setTime(''); setDate(hospitalDate()); setNow(new Date()); attempt.current = null;
  }

  return (
    <section className="py-24 bg-white" id="appointment" aria-labelledby="appointment-title">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Easy Scheduling</span>
          <h2 id="appointment-title" className="text-3xl md:text-4xl font-[Outfit] font-bold text-[hsl(var(--primary))]">Book Your Appointment</h2>
          <p className="text-gray-600 text-lg">Choose your preferred branch, date, and time. Your request is subject to hospital confirmation.</p>
        </div>
        {loading ? <p role="status" className="text-center text-gray-600">Loading appointment options…</p> : unavailable ? (
          <div role="alert" className="text-center space-y-3 text-gray-700">
            <p>Appointment scheduling is temporarily unavailable. Please reload or contact the hospital.</p>
            <button type="button" onClick={() => window.location.reload()} className="underline">Reload appointment options</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8" aria-busy={submitting}>
            <fieldset disabled={locked} className="lg:col-span-2 space-y-6 min-w-0">
              <legend className="sr-only">Appointment preferences</legend>
              <div className={cardClass}>
                <h3 className="block text-lg font-bold text-gray-900">Select Branch</h3>
                {activeBranch && <ThemedSelect value={activeBranch.id} ariaLabel="Select branch"
                  options={(branches ?? []).map((branch) => ({ value: branch.id, label: branch.name }))}
                  onChange={(value) => { setBranchId(value); setError(null); }} />}
              </div>
              <div className={cardClass}>
                <label htmlFor="appointment-date" className="block text-lg font-bold text-gray-900">Preferred Date</label>
                <input id="appointment-date" type="date" required min={today} max={maxDate} value={date}
                  onChange={(event) => { setDate(event.target.value); setTime(''); setError(null); }} className={inputClass}
                  aria-describedby="appointment-timezone" />
                <p id="appointment-timezone" className="text-sm text-gray-500">Choose up to 90 days ahead. All times are in India Standard Time (IST).</p>
              </div>
              <div className={cardClass}>
                <h3 id="appointment-slots" className="text-lg font-bold text-gray-900">Preferred Time</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3" role="group" aria-labelledby="appointment-slots">
                  {slots.map((slot) => {
                    const expired = !validDate || !isFutureSlot(date, slot, now);
                    return <button key={slot} type="button" disabled={expired} aria-pressed={activeTime === slot}
                      onClick={() => { setTime(slot); setError(null); }}
                      className={`px-3 py-3 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed ${activeTime === slot
                        ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))] shadow-md'
                        : 'border-gray-200 text-gray-600 hover:border-[hsl(var(--accent))]'}`}>{slot}</button>;
                  })}
                </div>
                {validDate && !slots.some((slot) => isFutureSlot(date, slot, now)) &&
                  <p role="status" className="text-sm text-gray-600">No future times remain for this date. Please choose another date.</p>}
              </div>
            </fieldset>
            <div className="lg:col-span-1 min-w-0">
              <div className={`${cardClass} sticky top-28`}>
                <fieldset disabled={locked} className="space-y-4 min-w-0">
                  <legend className="text-lg font-bold text-gray-900 mb-4">Your Details</legend>
                  <div className="space-y-1">
                    <label htmlFor="appointment-name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <input id="appointment-name" name="fullName" autoComplete="name" type="text" required minLength={2} maxLength={120}
                      value={fullName} onChange={(event) => setFullName(event.target.value)} className={inputClass} />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="appointment-phone" className="text-sm font-medium text-gray-700">Mobile Number</label>
                    <input id="appointment-phone" name="phone" autoComplete="tel" type="tel" required maxLength={24}
                      value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} aria-describedby="appointment-phone-help" />
                    <p id="appointment-phone-help" className="text-xs text-gray-500">10-digit Indian mobile number; +91 is optional.</p>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="appointment-email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <input id="appointment-email" name="email" autoComplete="email" type="email" required maxLength={254}
                      value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
                  </div>
                </fieldset>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <h4 className="font-semibold text-gray-900">Request Summary</h4>
                  <dl className="space-y-2 text-gray-600">
                    <div className="flex justify-between gap-3"><dt>Date</dt><dd>{date || 'Select a date'}</dd></div>
                    <div className="flex justify-between gap-3"><dt>Time</dt><dd>{receipt ? time : activeTime || 'Select a time'}{(receipt ? time : activeTime) && ' IST'}</dd></div>
                    <div className="flex justify-between gap-3"><dt>Branch</dt><dd className="text-right">{activeBranch?.name}</dd></div>
                  </dl>
                </div>
                {(error || receipt) && <div ref={feedback} tabIndex={-1} role={error ? 'alert' : 'status'}
                  className={`rounded-lg p-4 text-sm space-y-2 ${error ? 'bg-red-50 text-red-800' : 'bg-teal-50 text-teal-900'}`}>
                  {error ? <p>{error}</p> : receipt && <>
                    <p className="font-semibold">{receipt.status === 'pending' ? 'Appointment request received' : `Appointment status: ${receipt.status}`}</p>
                    <p>{receipt.status === 'pending' ? 'Your request is pending hospital confirmation. Your appointment is not confirmed yet.' : 'This is the current status of your previously submitted request.'}</p>
                    <p className="break-all">Reference: {receipt.id}</p>
                  </>}
                </div>}
                {receipt ? <button key="new-request" type="button" onClick={startNewRequest} className="w-full py-3 border border-gray-300 rounded-lg text-gray-700">Start a new request</button> : (
                  <button key="submit-request" type="submit" disabled={submitting} className="w-full py-3 bg-[hsl(var(--accent))] hover:bg-[hsl(173,80%,35%)] text-white font-semibold rounded-lg transition-colors shadow-md disabled:opacity-60 disabled:cursor-wait">
                    {submitting ? 'Submitting request…' : 'Request Appointment'}
                  </button>
                )}
                <p className="text-xs text-gray-500 text-center">Submitting sends your contact details and preferred appointment to the hospital for review.</p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
