import PhoneNumber from "./PhoneNumber";
import { Link } from "react-router-dom";
import { getFormattedHours } from "../types";
import { useQuery } from "../hooks/useQuery";
import {
  getHospitalInfo,
  getContactInfo,
  getSocialLinks,
  getQuickLinks,
  getServiceLinks,
  getBranches,
} from "../services/api";

function SocialIcon({ platform }: { platform: string }) {
  const name = platform.toLowerCase().replace(/[^a-z]/g, "");
  const iconClass = "h-4 w-4 fill-current";

  if (name === "facebook") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.7v3h2.7v8h3.1Z" /></svg>;
  }
  if (name === "twitter" || name === "x") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}><path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.3L6.6 22H3.5l7.3-8.3L3.3 2h6.2l4.3 5.7L18.9 2Zm-1.1 18h1.7L8.6 3.9H6.8L17.8 20Z" /></svg>;
  }
  if (name === "instagram") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}><path d="M7.4 2h9.2A5.4 5.4 0 0 1 22 7.4v9.2a5.4 5.4 0 0 1-5.4 5.4H7.4A5.4 5.4 0 0 1 2 16.6V7.4A5.4 5.4 0 0 1 7.4 2Zm-.2 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2Zm10.7 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 6.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 2A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8Z" /></svg>;
  }
  if (name === "linkedin") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}><path d="M20.5 3h-17A1.5 1.5 0 0 0 2 4.5v15A1.5 1.5 0 0 0 3.5 21h17a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 20.5 3ZM8 18H5V9h3v9ZM6.5 7.8A1.8 1.8 0 1 1 6.5 4a1.8 1.8 0 0 1 0 3.8ZM19 18h-3v-4.6c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5V18h-3V9h2.9v1.2h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.6 2 3.6 4.7V18Z" /></svg>;
  }
  if (name === "youtube") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}><path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.5 12 4.5 12 4.5s-5.6 0-7.5.6a3 3 0 0 0-2.1 2.1C1.8 9.1 1.8 12 1.8 12s0 2.9.6 4.8a3 3 0 0 0 2.1 2.1c1.9.6 7.5.6 7.5.6s5.6 0 7.5-.6a3 3 0 0 0 2.1-2.1c.6-1.9.6-4.8.6-4.8s0-2.9-.6-4.8ZM10.2 15V9l5.2 3-5.2 3Z" /></svg>;
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M10 14 21 3" /><path d="M15 3h6v6" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></svg>;
}

export default function Footer() {
  const { data: hospitalInfo } = useQuery(getHospitalInfo);
  const { data: contactInfo } = useQuery(getContactInfo);
  const { data: socialLinks } = useQuery(getSocialLinks);
  const { data: quickLinks } = useQuery(getQuickLinks);
  const { data: serviceLinks } = useQuery(getServiceLinks);
  const { data: branches } = useQuery(getBranches);

  if (!hospitalInfo || !contactInfo) return null;

  return (
    <footer className="bg-[hsl(var(--foreground))] text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/logo.png" alt={hospitalInfo.name} className="h-12 object-contain brightness-0 invert" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {hospitalInfo.description}
            </p>
            <div className="flex gap-3">
              {(socialLinks ?? []).map((s) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit us on ${s.platform}`} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[hsl(var(--accent))] transition-colors" title={s.platform}>
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {(quickLinks ?? []).map((l) => (
                <li key={l.label}><Link to={l.label.toLowerCase() === 'appointments' ? '/#appointment' : l.href} className="text-gray-400 hover:text-[hsl(var(--accent))] transition-colors text-sm">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {(serviceLinks ?? []).map((l) => (
                <li key={l.label}><Link to={l.href} className="text-gray-400 hover:text-[hsl(var(--accent))] transition-colors text-sm">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-[hsl(var(--accent))] shrink-0"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-gray-400">{branches?.[0]?.address}, {branches?.[0]?.city}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--accent))] shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span className="text-gray-400"><PhoneNumber value={contactInfo.tollFree} /></span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--accent))] shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span className="text-gray-400">{contactInfo.primaryEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--accent))] shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span className="text-gray-400">{getFormattedHours()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[hsl(var(--accent))] transition-colors cursor-default">Privacy Policy</span>
            <span className="hover:text-[hsl(var(--accent))] transition-colors cursor-default">Terms of Service</span>
            <span className="hover:text-[hsl(var(--accent))] transition-colors cursor-default">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
