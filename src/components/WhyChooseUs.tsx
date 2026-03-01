import { Link } from "react-router-dom";

const features = [
  "40+ years of trusted eye care excellence",
  "Board-certified ophthalmologists & optometrists",
  "State-of-the-art diagnostic equipment",
  "Comprehensive pre & post-operative care",
  "Insurance & cashless treatment options",
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50" id="why-choose-us">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-[Outfit] font-bold text-[hsl(var(--primary))]">Trusted by Thousands of Patients</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                For over four decades, Galaxy Eye Hospital has been at the forefront of ophthalmic excellence. Our commitment to patient care, advanced technology, and expert doctors sets us apart.
              </p>
            </div>
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="px-8 py-3 bg-[hsl(var(--primary))] text-white font-semibold rounded-lg hover:bg-[hsl(176,61%,15%)] transition-colors shadow-md">
              Learn More About Us
            </Link>
          </div>

          <div className="relative">
            <div className="bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl p-10 text-white space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-[Outfit]">Our Promise</h3>
                <p className="text-white/80">Every patient receives personalized care backed by decades of experience.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "4.9/5", label: "Patient Rating" },
                  { num: "98%", label: "Success Rate" },
                  { num: "24/7", label: "Emergency Care" },
                  { num: "15+", label: "Specializations" },
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
  );
}
