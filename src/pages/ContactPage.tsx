import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { getContactInfo, getBranches, getHospitalInfo } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

/* ─── Icon Helpers ─── */
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
);
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
);

export default function ContactPage() {
  const { data: contactInfo } = useQuery(getContactInfo);
  const { data: branches } = useQuery(getBranches);
  const { data: hospitalInfo } = useQuery(getHospitalInfo);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Form submission logic here (connect to backend later)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  if (!contactInfo || !hospitalInfo) return <LoadingSpinner />;

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
              <MailIcon />
              Get In Touch
            </span>
            <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Contact <span className="text-[hsl(var(--accent))]">{hospitalInfo.name}</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              We are here to assist you with appointments, consultations, and vision care support.
            </p>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
                <ClockIcon />
                <span>Opening Times: <strong>9 AM to 9 PM</strong></span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))] text-sm font-semibold">
                <AlertIcon />
                <span>Emergency Services Available 24/7</span>
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

      {/* ── Branch Contact Cards ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-4">
              Our Branches
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))]">
              Visit Us At Our <span className="text-[hsl(var(--primary))]">Locations</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {(branches ?? []).map((branch) => (
              <div
                key={branch.id}
                className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-[hsl(var(--accent))]/30 transition-all duration-300"
              >
                {/* Branch Type Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-semibold uppercase tracking-wide">
                    {branch.type === "main" ? "Main Branch" : "Branch"}
                  </span>
                </div>

                {/* Branch Icon */}
                <div className="w-14 h-14 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-5 group-hover:bg-[hsl(var(--accent))]/10 transition-colors">
                  <MapPinIcon />
                </div>

                {/* Branch Name */}
                <h3 className="font-[Outfit] text-xl font-bold text-[hsl(var(--foreground))] mb-1">
                  {branch.name.replace("Galaxy Eye Hospital - ", "")}
                </h3>
                <p className="text-gray-500 text-sm mb-6">{branch.address}, {branch.city}, {branch.state}</p>

                {/* Contact Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <PhoneIcon />
                    <span>Phone: <strong>{branch.phone}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MailIcon />
                    <span>{branch.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[hsl(var(--primary))] text-[hsl(var(--primary))] rounded-lg hover:bg-[hsl(var(--primary))]/5 transition-colors text-sm font-medium"
                  >
                    <ExternalLinkIcon />
                    Google Map
                  </a>
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, "")}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[hsl(var(--accent))] text-white rounded-lg hover:bg-[hsl(var(--accent))]/90 transition-colors text-sm font-medium"
                  >
                    <PhoneIcon />
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left — Info */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-4">
                  Send Us a Message
                </span>
                <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
                  We'd Love to <span className="text-[hsl(var(--primary))]">Hear From You</span>
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Have a question or need an appointment? Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center shrink-0 text-[hsl(var(--primary))]">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm">Phone</h4>
                    <p className="text-gray-500 text-sm">{contactInfo.primaryPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center shrink-0 text-[hsl(var(--primary))]">
                    <MailIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm">Email</h4>
                    <p className="text-gray-500 text-sm">{contactInfo.primaryEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center shrink-0 text-[hsl(var(--primary))]">
                    <ClockIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--foreground))] text-sm">Opening Hours</h4>
                    <p className="text-gray-500 text-sm">Mon – Sun: 9:00 AM – 9:00 PM</p>
                    <p className="text-[hsl(var(--accent))] text-xs font-medium mt-1">Emergency services available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(142, 71%, 45%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <h3 className="font-[Outfit] text-2xl font-bold text-[hsl(var(--foreground))]">Message Sent!</h3>
                  <p className="text-gray-500 text-sm max-w-xs">Thank you for reaching out. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-[Outfit] text-xl font-bold text-[hsl(var(--foreground))] mb-2">Contact Form</h3>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 focus:border-[hsl(var(--accent))] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 focus:border-[hsl(var(--accent))] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 focus:border-[hsl(var(--accent))] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 focus:border-[hsl(var(--accent))] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[hsl(var(--accent))] text-white rounded-lg font-semibold hover:bg-[hsl(var(--accent))]/90 transition-colors shadow-lg shadow-[hsl(var(--accent))]/20"
                  >
                    <SendIcon />
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick CTA Banner ── */}
      <section className="py-16 bg-[hsl(var(--primary))]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-white">
              Need Urgent Assistance?
            </h2>
            <p className="text-white/70 text-lg">
              Call us now at <strong className="text-[hsl(var(--accent))]">{contactInfo.tollFree}</strong> — our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${contactInfo.primaryPhone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[hsl(var(--accent))] text-white rounded-lg font-semibold hover:bg-[hsl(var(--accent))]/90 transition-colors shadow-lg shadow-[hsl(var(--accent))]/20"
              >
                <PhoneIcon />
                Call Now
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
