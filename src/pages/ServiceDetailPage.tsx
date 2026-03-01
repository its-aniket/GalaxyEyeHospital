import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { services as defaultServices } from "../data/servicesData";
import { contactInfo as defaultContactInfo } from "../data/contactData";
import { useQuery } from "../hooks/useQuery";
import { getServices, getContactInfo } from "../services/api";
import type { Service, FAQ } from "../data/servicesData";
import type { ReactElement } from "react";

/* ─── Service Icons (same as ServicesPage) ─── */
const iconComponents: Record<string, (size?: number) => ReactElement> = {
  lasik: (size = 28) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="15" r="4" /><circle cx="18" cy="15" r="4" /><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" /><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" /><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
    </svg>
  ),
  cataract: (size = 28) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  retina: (size = 28) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  ),
  glaucoma: (size = 28) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="1" /><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
    </svg>
  ),
  pediatric: (size = 28) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" /><path d="M15 12h.01" /><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" /><path d="M9 12h.01" />
    </svg>
  ),
  lowvision: (size = 28) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" />
    </svg>
  ),
  diagnostic: (size = 28) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /><path d="M7 10h.01" /><path d="M17 10h.01" /><path d="M12 6V2" />
    </svg>
  ),
};

/* ─── FAQ Accordion Item ─── */
function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const { data: services } = useQuery(getServices, defaultServices);
  const { data: contactInfo } = useQuery(getContactInfo, defaultContactInfo);

  const service: Service | undefined = services.find((s) => s.slug === slug);

  // Scroll to top on mount / slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!service) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-6 p-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          </div>
          <h2 className="font-[Outfit] text-2xl font-bold text-gray-900">Service Not Found</h2>
          <p className="text-gray-500">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-3 bg-[hsl(var(--primary))] text-white font-semibold rounded-lg hover:bg-[hsl(176,61%,15%)] transition-colors"
          >
            View All Services
          </button>
        </div>
      </section>
    );
  }

  const { pageContent: pc } = service;
  const getIcon = iconComponents[service.icon];
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[hsl(var(--primary))]">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div className="space-y-6">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/60">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                <span className="text-white/90">{service.title}</span>
              </nav>

              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[hsl(var(--accent))] font-medium text-sm">
                {getIcon && <span className="text-[hsl(var(--accent))]">{getIcon(16)}</span>}
                {service.category === "surgical" ? "Surgical" : service.category === "non-surgical" ? "Non-Surgical" : "Diagnostic"}
              </span>

              <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
                {pc.heroTagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-white text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  Book Consultation
                </Link>
                <a
                  href={`tel:${contactInfo.tollFree}`}
                  className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call Us
                </a>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
                  <span>Recovery: {service.recoveryTime}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
                  <span>Success: {service.successRate}</span>
                </div>
              </div>
            </div>

            {/* Right — Image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={pc.heroImage}
                  alt={service.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[hsl(var(--primary))]/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[hsl(var(--accent))]/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute -bottom-px left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-15">
            <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── What This Treatment Is ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={pc.whatIsImage}
                  alt={pc.whatIsTitle}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
              {/* Floating accent badge */}
              <div className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center text-[hsl(var(--accent))]">
                  {getIcon && getIcon(24)}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{service.successRate}</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">
                Understanding the Treatment
              </span>
              <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] leading-tight">
                {pc.whatIsTitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {pc.whatIsDescription}
              </p>

              {/* Key features list */}
              <ul className="space-y-3 pt-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-14">
            <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">
              Why Choose This Treatment
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">
              Benefits of {service.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pc.benefits.map((benefit, i) => {
              const benefitIcons = [
                // Shield check
                <svg key="shield" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>,
                // Zap
                <svg key="zap" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
                // User check
                <svg key="user" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>,
                // Heart handshake
                <svg key="heart" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>,
              ];

              return (
                <div
                  key={benefit.title}
                  className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--accent))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="w-16 h-16 mx-auto mb-5 bg-[hsl(var(--primary))]/10 rounded-2xl flex items-center justify-center group-hover:bg-[hsl(var(--primary))] transition-colors duration-300">
                    <div className="text-[hsl(var(--primary))] group-hover:text-white transition-colors">
                      {benefitIcons[i]}
                    </div>
                  </div>
                  <h3 className="font-[Outfit] text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Treatment Process ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-14">
            <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">
              How It Works
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">
              Treatment Process
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your journey to better vision follows a clear, well-supported path from consultation to recovery.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[hsl(var(--accent))]/20 hidden md:block" />

              <div className="space-y-12">
                {pc.process.map((step) => {
                  const stepIcons = [
                    // Stethoscope / Clipboard
                    <svg key="s1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
                    // Procedure / Scalpel
                    <svg key="s2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>,
                    // Heart / Recovery
                    <svg key="s3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>,
                  ];

                  return (
                    <div key={step.step} className="flex gap-6 md:gap-8 items-start">
                      {/* Step number circle */}
                      <div className="relative z-10 shrink-0">
                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center shadow-lg">
                          <div className="text-white">
                            {stepIcons[step.step - 1]}
                          </div>
                        </div>
                      </div>

                      {/* Step content */}
                      <div className="flex-1 bg-gray-50 rounded-2xl p-6 md:p-8 relative">
                        {/* Arrow pointer */}
                        <div className="absolute left-0 top-6 -translate-x-2 w-4 h-4 bg-gray-50 rotate-45 hidden md:block" />
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-2.5 py-1 rounded-full">
                            Step {step.step}
                          </span>
                        </div>
                        <h3 className="font-[Outfit] text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left header */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">
                Got Questions?
              </span>
              <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Find answers to the most common questions about {service.title}. If you have additional questions, feel free to contact us.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[hsl(var(--primary))] font-semibold hover:text-[hsl(var(--accent))] transition-colors pt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Ask a Question
              </Link>
            </div>

            {/* Right accordion */}
            <div className="lg:col-span-3 space-y-4">
              {pc.faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  isOpen={openFAQ === i}
                  onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Services ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-14">
            <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">
              Explore More
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">
              Other Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {otherServices.map((s) => {
              const sIcon = iconComponents[s.icon];
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className="group rounded-2xl bg-gray-50 hover:bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--accent))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="w-14 h-14 bg-[hsl(var(--primary))]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--primary))] transition-colors duration-300">
                    <div className="text-[hsl(var(--primary))] group-hover:text-white transition-colors">
                      {sIcon && sIcon(24)}
                    </div>
                  </div>
                  <h3 className="font-[Outfit] text-lg font-bold text-gray-900 mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {s.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[hsl(var(--accent))] font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
            >
              View All Services
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-[hsl(var(--primary))] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 space-y-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center text-white mb-2">
            {getIcon && getIcon(36)}
          </div>
          <h2 className="font-[Outfit] text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Ready to take the next step for your vision?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Book an appointment with our {service.title.toLowerCase()} specialists today and start your journey to clearer, healthier vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              Book an Appointment
            </Link>
            <a
              href={`tel:${contactInfo.tollFree}`}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call: {contactInfo.tollFree}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
