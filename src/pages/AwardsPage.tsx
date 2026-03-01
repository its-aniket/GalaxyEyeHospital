import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { awards as defaultAwards, awardCategories } from "../data/awardsData";
import { contactInfo as defaultContactInfo } from "../data/contactData";
import { useQuery } from "../hooks/useQuery";
import { getAwards, getContactInfo } from "../services/api";

/* ─── Category Icons ─── */
const categoryIcons: Record<string, ReactNode> = {
  All: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
  ),
  National: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
  ),
  State: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
  ),
  Medical: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>
  ),
  Social: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  Institutional: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
  ),
};

export default function AwardsPage() {
  const { data: awards } = useQuery(getAwards, defaultAwards);
  const { data: contactInfo } = useQuery(getContactInfo, defaultContactInfo);

  const [activeCategory, setActiveCategory] = useState("All");

  const highlighted = awards.filter((a) => a.highlighted);
  const filteredAwards =
    activeCategory === "All"
      ? awards
      : awards.filter((a) => a.category === activeCategory.toLowerCase());

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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
              Awards & Recognition
            </span>
            <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Awards & <span className="text-[hsl(var(--accent))]">Recognition</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              A legacy of excellence in eye care, inspired by the Dole Foundation and recognized by medical and social institutions.
            </p>

            {/* Quick stats line */}
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              {[
                { value: `${awards.length}+`, label: "Awards" },
                { value: "40+", label: "Years" },
                { value: "National", label: "Recognition" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-white font-[Outfit]">{s.value}</div>
                  <div className="text-white/60 text-sm">{s.label}</div>
                </div>
              ))}
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

      {/* ── Featured Awards ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-14">
            <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">
              Milestone Achievements
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">
              Featured Awards
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The most prestigious recognitions that define our journey of excellence and service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlighted.map((award, i) => (
              <div
                key={award.id}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  i === 0
                    ? "md:col-span-2 lg:col-span-1 bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(176,61%,15%)] text-white"
                    : "bg-white border border-gray-100 shadow-md hover:border-[hsl(var(--accent))]/30"
                }`}
              >
                {/* Accent top bar */}
                <div className={`absolute top-0 left-0 w-full h-1 ${i === 0 ? "bg-[hsl(var(--accent))]" : "bg-[hsl(var(--accent))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"}`} />

                <div className="p-8">
                  {/* Trophy icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                    i === 0
                      ? "bg-white/15"
                      : "bg-[hsl(var(--primary))]/10 group-hover:bg-[hsl(var(--primary))] transition-colors duration-300"
                  }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={i === 0 ? "text-[hsl(var(--accent))]" : "text-[hsl(var(--primary))] group-hover:text-white transition-colors"}
                    >
                      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
                      <circle cx="12" cy="8" r="6"/>
                    </svg>
                  </div>

                  {/* Year badge */}
                  {award.year && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                      i === 0
                        ? "bg-[hsl(var(--accent))] text-white"
                        : "bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]"
                    }`}>
                      {award.year}
                    </span>
                  )}

                  <h3 className={`font-[Outfit] text-xl font-bold mb-2 ${i === 0 ? "text-white" : "text-gray-900"}`}>
                    {award.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${i === 0 ? "text-white/70" : "text-gray-500"}`}>
                    {award.issuingAuthority}
                  </p>

                  {/* Category tag */}
                  <div className="mt-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      i === 0 ? "bg-white/10 text-white/80" : "bg-gray-100 text-gray-500"
                    }`}>
                      {award.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filters + Full Awards Grid ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-10">
            <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">
              Complete List
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">
              All Awards & Recognitions
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {awardCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[hsl(var(--primary))] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {categoryIcons[cat]}
                {cat}
                {activeCategory === cat && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center">
                    {filteredAwards.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Awards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAwards.map((award) => (
              <div
                key={award.id}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-100 hover:border-[hsl(var(--accent))]/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-[hsl(var(--accent))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-start gap-4">
                  {/* Trophy icon */}
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[hsl(var(--primary))]/8 flex items-center justify-center group-hover:bg-[hsl(var(--primary))] transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[hsl(var(--primary))] group-hover:text-white transition-colors"
                    >
                      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
                      <circle cx="12" cy="8" r="6"/>
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-[Outfit] font-bold text-gray-900 text-base leading-snug">
                        {award.title}
                      </h3>
                      {award.highlighted && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">
                      {award.issuingAuthority}
                    </p>
                    <div className="flex items-center gap-2">
                      {award.year && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/8 px-2 py-0.5 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                          {award.year}
                        </span>
                      )}
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-50 text-gray-400 rounded-full capitalize">
                        {award.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredAwards.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700">No awards found</h3>
              <p className="text-gray-500">Try selecting a different category.</p>
              <button onClick={() => setActiveCategory("All")} className="text-[hsl(var(--accent))] font-semibold hover:underline">
                View all awards
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Trust Statement ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(176,61%,15%)] rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <blockquote className="font-[Outfit] text-2xl md:text-3xl font-bold text-white leading-snug">
                  "Decades of dedication to ethical, compassionate, and advanced eye care."
                </blockquote>
                <p className="text-white/70 text-lg max-w-xl mx-auto">
                  Every award we receive reflects the trust of our patients and the tireless commitment of our founder, Dr. Manohar Dole, and the entire Galaxy Eye Hospital team.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold font-[Outfit] text-lg">
                    MD
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">Dr. Manohar Dole</div>
                    <div className="text-white/60 text-sm">Founder & Chief Ophthalmologist</div>
                  </div>
                </div>
              </div>
            </div>
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
          <h2 className="font-[Outfit] text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Experience the award-winning care yourself.
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Join 95,000+ patients who trust Galaxy Eye Hospital for ethical, precise, and compassionate eye care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
