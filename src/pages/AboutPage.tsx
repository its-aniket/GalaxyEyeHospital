import { Link } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { getDoctors, getContactInfo } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

/* ─── Icon Helpers ─── */
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);
const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
);
const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

/* Doctors data imported from ../data/doctorsData */

/* ─── Core Values ─── */
const values = [
  "Ethical and transparent patient care",
  "Affordable and accessible treatment",
  "Advanced technology and precision",
  "Compassionate and personalized service",
  "Commitment to innovation and research",
  "Rooted in humanitarian values",
];

/* ─── Impact Stats ─── */
const impactStats = [
  { icon: <ClockIcon />, value: "40+", label: "Years of Excellence" },
  { icon: <UsersIcon />, value: "95,000+", label: "Patients Served" },
  { icon: <MapPinIcon />, value: "Multiple", label: "Branches in Maharashtra" },
  { icon: <AwardIcon />, value: "15+", label: "Awards & Recognitions" },
];

export default function AboutPage() {
  const { data: doctors } = useQuery(getDoctors);
  const { data: contactInfo } = useQuery(getContactInfo);

  if (!contactInfo) return <LoadingSpinner />;

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[hsl(var(--accent))] font-medium text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--accent))] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--accent))]" />
                </span>
                About Us
              </span>
              <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                About <span className="text-[hsl(var(--accent))]">Galaxy</span> Eye Hospital
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                Galaxy Eye Hospital is a leading LASIK, Retina, and Cataract Center in Pune, known for delivering high-quality, ethical, and technology-driven eye care.
              </p>
              <p className="text-white/60 text-base leading-relaxed max-w-xl">
                Rooted in the humanitarian legacy of the Dole Foundation, our mission is to ensure that advanced vision care remains accessible, affordable, and patient-focused.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-white text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
                >
                  Contact Us
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Our Services
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-linear-to-tr from-[hsl(var(--accent))]/20 to-white/5 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="/hero.png"
                  alt="Galaxy Eye Hospital"
                  className="w-full h-105 object-cover"
                />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-52">
                  <p className="text-3xl font-bold text-[hsl(var(--primary))] font-[Outfit]">40+</p>
                  <p className="text-sm text-gray-600 font-medium">Years of Trusted Eye Care</p>
                </div>
              </div>
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

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="group relative rounded-2xl bg-gray-50 p-8 md:p-10 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 bg-[hsl(var(--primary))]/10 rounded-xl flex items-center justify-center mb-6 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-white transition-all duration-300">
                <TargetIcon />
              </div>
              <h2 className="font-[Outfit] text-2xl font-bold text-[hsl(var(--primary))] mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide ethical, precise, and affordable eye care that improves vision and quality of life for every patient.
              </p>
            </div>

            {/* Vision */}
            <div className="group relative rounded-2xl bg-gray-50 p-8 md:p-10 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[hsl(var(--accent))] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 bg-[hsl(var(--accent))]/10 rounded-xl flex items-center justify-center mb-6 text-[hsl(var(--accent))] group-hover:bg-[hsl(var(--accent))] group-hover:text-white transition-all duration-300">
                <EyeIcon />
              </div>
              <h2 className="font-[Outfit] text-2xl font-bold text-[hsl(var(--primary))] mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become Maharashtra's most trusted and socially responsible eye care network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience & Impact Stats ── */}
      <section className="py-16 bg-[hsl(var(--primary))] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Experience & Impact</span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-white mt-3">Numbers That Speak Trust</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {impactStats.map((stat) => (
              <div key={stat.label} className="space-y-2 group">
                <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="h-6 w-6 text-[hsl(var(--accent))]">{stat.icon}</div>
                </div>
                <h3 className="text-4xl md:text-5xl font-[Outfit] font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/70 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story & Values ── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl p-10 text-white space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-[Outfit]">Our Legacy</h3>
                  <p className="text-white/80">
                    With over 40 years of experience and 95,000+ patients served, Galaxy Eye Hospital continues to transform lives by restoring and protecting vision through innovation, integrity, and compassionate care.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { num: "98%", label: "Success Rate" },
                    { num: "4.9/5", label: "Patient Rating" },
                    { num: "24/7", label: "Emergency Care" },
                    { num: "50+", label: "Expert Doctors" },
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

            {/* Values Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">What We Stand For</span>
                <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">Our Core Values</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every decision we make is guided by our commitment to ethical care, technological excellence, and the well-being of our patients.
                </p>
              </div>
              <ul className="space-y-4">
                {values.map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-gray-700 text-base">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Doctors ── */}
      <section className="py-24 bg-white" id="doctors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Expert Team</span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">Our Doctors</h2>
            <p className="text-gray-600 text-lg">
              Our ophthalmologists specialize in LASIK, Cataract, Retina, Glaucoma, and Pediatric Eye Care. Each doctor is committed to delivering safe, precise, and patient-centered treatment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(doctors ?? []).map((doc) => (
              <div
                key={doc.name}
                className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                {/* Accent bar on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[hsl(var(--accent))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-[Outfit] text-lg font-bold text-white">{doc.name}</h3>
                    <p className="text-white/80 text-sm">{doc.speciality}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      <span>{doc.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
                      <span>{doc.experience} Experience</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <Link
                      to="/contact"
                      className="text-[hsl(var(--primary))] font-semibold text-sm hover:text-[hsl(var(--accent))] transition-colors flex items-center gap-1"
                    >
                      Book Appointment
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </Link>
                    <a href={doc.socialLinks?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-gray-100 text-gray-400 hover:bg-[hsl(var(--primary))] hover:text-white transition-all" title="LinkedIn">
                      <LinkedInIcon />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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
            Ready to Experience World-Class Eye Care?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Schedule your consultation today and take the first step towards clearer vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              Book Appointment
            </Link>
            <a
              href={`tel:${contactInfo.primaryPhone.replace(/\s/g, "")}`}
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
