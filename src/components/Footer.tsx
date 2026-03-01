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
            <div className="flex items-center gap-2">
              <img src={hospitalInfo.logo} alt={hospitalInfo.name} className="w-8 h-8" />
              <span className="text-white text-xl font-bold font-[Outfit]">{hospitalInfo.name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {hospitalInfo.description}
            </p>
            <div className="flex gap-3">
              {(socialLinks ?? []).map((s) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(var(--accent))] transition-colors" title={s.platform}>
                  <span className="text-xs text-white uppercase font-bold">{s.platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {(quickLinks ?? []).map((l) => (
                <li key={l.label}><Link to={l.href} className="text-gray-400 hover:text-[hsl(var(--accent))] transition-colors text-sm">{l.label}</Link></li>
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
                <span className="text-gray-400">{contactInfo.tollFree}</span>
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
