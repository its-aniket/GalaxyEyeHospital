import { useState } from "react";
import { Link } from "react-router-dom";
import { services as defaultServices, serviceCategories } from "../data/servicesData";
import { contactInfo as defaultContactInfo } from "../data/contactData";
import { useQuery } from "../hooks/useQuery";
import { getServices, getContactInfo } from "../services/api";
import type { ReactElement } from "react";

/* ─── Icon Map ─── */
const iconComponents: Record<string, ReactElement> = {
  lasik: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="15" r="4" /><circle cx="18" cy="15" r="4" /><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" /><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" /><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
    </svg>
  ),
  cataract: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  retina: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  ),
  glaucoma: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="1" /><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
    </svg>
  ),
  pediatric: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" /><path d="M15 12h.01" /><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" /><path d="M9 12h.01" />
    </svg>
  ),
  lowvision: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" />
    </svg>
  ),
  diagnostic: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /><path d="M7 10h.01" /><path d="M17 10h.01" /><path d="M12 6V2" />
    </svg>
  ),
};

/* ─── Category Icon ─── */
const categoryIcons: Record<string, ReactElement> = {
  All: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
  ),
  Surgical: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4" /><path d="m17 7 3-3" /><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" /><path d="m9 11 4 4" /><path d="m5 19-3 3" /><path d="m14 4 6 6" /></svg>
  ),
  "Non-Surgical": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" /></svg>
  ),
  Diagnostic: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
  ),
};

export default function ServicesPage() {
  const { data: services } = useQuery(getServices, defaultServices);
  const { data: contactInfo } = useQuery(getContactInfo, defaultContactInfo);

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter(
          (s) => s.category === activeCategory.toLowerCase()
        );

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[hsl(var(--primary))]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[hsl(var(--accent))] font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--accent))] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--accent))]" />
              </span>
              Our Expertise
            </span>
            <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Our Eye Care <span className="text-[hsl(var(--accent))]">Services</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              A complete range of eye care services designed to preserve, restore, and enhance your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-white text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                Book Appointment
              </Link>
              <a
                href={`tel:${contactInfo.tollFree}`}
                className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Us
              </a>
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

      {/* ── Category Filters ── */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 py-4 overflow-x-auto scrollbar-hide">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[hsl(var(--primary))] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            ))}
            <div className="ml-auto hidden md:flex items-center gap-2 text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              <span>{filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredServices.map((service) => {
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative scroll-mt-36"
                >
                  {/* Accent top bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--accent))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-16 h-16 bg-[hsl(var(--primary))]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--primary))] transition-colors duration-300">
                        <div className="text-[hsl(var(--primary))] group-hover:text-white transition-colors">
                          {iconComponents[service.icon]}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <Link to={`/services/${service.slug}`} className="font-[Outfit] text-xl font-bold text-gray-900 hover:text-[hsl(var(--primary))] transition-colors">
                            {service.title}
                          </Link>
                          {service.popular && (
                            <span className="px-2 py-0.5 text-xs font-bold bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full capitalize">
                          {service.category.replace("-", " ")}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mb-5">
                      <div className="text-center">
                        <p className="text-sm font-bold text-[hsl(var(--primary))]">{service.duration}</p>
                        <p className="text-xs text-gray-500">Duration</p>
                      </div>
                      <div className="text-center border-x border-gray-200">
                        <p className="text-sm font-bold text-[hsl(var(--primary))]">{service.recoveryTime}</p>
                        <p className="text-xs text-gray-500">Recovery</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-[hsl(var(--primary))]">{service.successRate}</p>
                        <p className="text-xs text-gray-500">Success Rate</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link
                        to={`/services/${service.slug}`}
                        className="text-[hsl(var(--primary))] font-semibold hover:text-[hsl(var(--accent))] flex items-center gap-2 text-sm transition-colors"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </Link>
                      <Link
                        to="/contact"
                        className="px-4 py-2 bg-[hsl(var(--primary))] text-white text-sm font-semibold rounded-lg hover:bg-[hsl(176,61%,15%)] transition-colors inline-flex items-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700">No services found</h3>
              <p className="text-gray-500">Try selecting a different category.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="text-[hsl(var(--accent))] font-semibold hover:underline"
              >
                View all services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Why Choose Our Services ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Why Galaxy Eye Hospital</span>
                <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">World-Class Eye Care, Close to Home</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every procedure at Galaxy Eye Hospital is backed by decades of clinical expertise, cutting-edge technology, and a genuine commitment to patient well-being.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Board-certified ophthalmologists with 40+ years of combined experience",
                  "Latest diagnostic & surgical technology (OCT, Femto Laser, Phaco)",
                  "Transparent pricing with insurance & cashless options",
                  "Comprehensive pre-operative and post-operative care",
                  "Child-friendly and senior-friendly facilities",
                  "Multiple convenient branches across Pune",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl p-10 text-white space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-[Outfit]">Service Highlights</h3>
                  <p className="text-white/80">Trusted by 95,000+ patients across Maharashtra for ethical, precise, and affordable eye care.</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { num: "7", label: "Specialties" },
                    { num: "98%", label: "Success Rate" },
                    { num: "24/7", label: "Emergency Care" },
                    { num: "15+", label: "Advanced Machines" },
                  ].map((s) => (
                    <div key={s.label} className="text-center space-y-1">
                      <div className="text-3xl font-bold font-[Outfit]">{s.num}</div>
                      <div className="text-white/70 text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[hsl(var(--accent))]/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[hsl(var(--primary))]/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-20 bg-[hsl(var(--primary))] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 space-y-8">
          <h2 className="font-[Outfit] text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Not sure which service you need? Talk to our specialists.
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Our team will guide you to the right treatment based on your condition and needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contact Us
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
