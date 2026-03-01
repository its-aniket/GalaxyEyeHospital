import { Link } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { getContactInfo } from "../services/api";

export default function CTABanner() {
  const { data: contactInfo } = useQuery(getContactInfo);
  if (!contactInfo) return null;

  return (
    <section className="py-20 bg-[hsl(var(--primary))] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10 space-y-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Outfit] font-bold text-white max-w-3xl mx-auto leading-tight">
          Your Vision Is Our Mission — Book Your Visit Today
        </h2>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Don't wait for symptoms. Regular eye check-ups can help detect problems early and keep your vision at its best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="px-8 py-4 bg-white text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            Book Appointment
          </Link>
          <a href={`tel:${contactInfo.tollFree}`} className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call: {contactInfo.tollFree}
          </a>
        </div>
      </div>
    </section>
  );
}
