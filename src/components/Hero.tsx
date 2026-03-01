import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-linear-to-br from-white via-blue-50/30 to-teal-50/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--accent))] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--accent))]" />
              </span>
              Accepting New Patients
            </div>

            <h1 className="font-[Outfit] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-[hsl(var(--primary))]">
              See the World with <span className="text-[hsl(var(--accent))]">Clarity</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Experience world-class eye care with advanced technology and compassionate experts. Over 40 years of restoring vision and changing lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/contact" className="h-14 px-8 text-lg bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-medium rounded-md shadow-xl shadow-[hsl(var(--primary))]/20 transition-all flex items-center justify-center">
                Book Your Appointment
              </Link>
              <Link to="/services" className="h-14 px-8 text-lg border border-[hsl(var(--primary))]/20 hover:bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))] font-medium rounded-md transition-all group flex items-center justify-center gap-2">
                Explore Services
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-gray-200/60">
              <div>
                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-900">4.9/5 Rating</p>
                <p className="text-xs text-gray-500">Based on 12k+ Reviews</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <p className="text-sm font-medium text-gray-900">Top Rated</p>
                <p className="text-xs text-gray-500">Best Eye Hospital 2024</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-tr from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))]/10 rounded-4xl blur-2xl transform rotate-2" />
            <div className="relative rounded-4xl overflow-hidden shadow-2xl shadow-[hsl(var(--primary))]/10 border border-white/50">
              <img alt="Modern Eye Clinic" className="w-full h-auto object-cover" src="/hero.png" />
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-50">
                <p className="text-3xl font-bold text-[hsl(var(--primary))]">95k+</p>
                <p className="text-sm text-gray-600 font-medium">Happy Patients Served</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
