/** Keep display formatting separate from the number used by the dialler. */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (local.length === 10) return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  return value.trim();
}

export function phoneHref(value: string): string {
  const digits = value.replace(/\D/g, "");
  return `tel:${digits.length === 10 ? "+91" : (digits.length === 12 && digits.startsWith("91")) || value.trim().startsWith("+") ? "+" : ""}${digits}`;
}
