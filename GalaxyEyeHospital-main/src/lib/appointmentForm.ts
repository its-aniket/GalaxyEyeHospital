export function hospitalDate(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now);
}

export function lastAppointmentDate(now = new Date()): string {
  const date = new Date(`${hospitalDate(now)}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 90);
  return date.toISOString().slice(0, 10);
}

export function isFutureSlot(date: string, slot: string, now = new Date()): boolean {
  const match = /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/.exec(slot);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !match) return false;
  const hour = Number(match[1]) % 12 + (match[3] === 'PM' ? 12 : 0);
  const timestamp = new Date(`${date}T${String(hour).padStart(2, '0')}:${match[2]}:00+05:30`);
  return !Number.isNaN(timestamp.getTime()) && hospitalDate(timestamp) === date && timestamp.getTime() > now.getTime();
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/[\s()+-]/g, '');
  return digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
}

export function validateContact(fullName: string, phone: string, email: string): string | null {
  if (fullName.trim().length < 2 || fullName.trim().length > 120) return 'Enter your full name (2–120 characters).';
  if (!/^[6-9][0-9]{9}$/.test(normalizePhone(phone))) return 'Enter a valid 10-digit Indian mobile number, optionally starting with +91.';
  if (email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address.';
  return null;
}
