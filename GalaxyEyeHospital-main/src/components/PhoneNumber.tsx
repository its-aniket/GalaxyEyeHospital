import { formatPhoneNumber } from "../lib/phone";

export default function PhoneNumber({ value }: { value: string }) {
  return <span className="whitespace-nowrap">{formatPhoneNumber(value)}</span>;
}
