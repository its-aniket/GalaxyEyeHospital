import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const SLIDE_DURATION = 8000;
const slides = [
  {
    id: "welcome", label: "Welcome", title: "See the World with", accent: "Clarity",
    description: "Experience world-class eye care with advanced technology and compassionate experts. Over 40 years of restoring vision and changing lives.",
    image: "/hero.png", alt: "A bright, modern eye clinic with examination equipment",
    primary: { text: "Book Your Appointment", href: "/#appointment" },
    secondary: { text: "Explore Services", href: "/services" },
    badge: { title: "95k+", description: "Happy Patients Served" },
  },
  {
    id: "cataract", label: "Cataract care", title: "Clearer Vision.", accent: "Cataract Care.",
    description: "Take the next step towards clearer vision. Explore our cataract surgery options and meet a team that guides you from consultation to recovery.",
    image: "/images/hero-cataract.jpg", alt: "An ophthalmologist speaking with an older patient in a modern eye examination room",
    primary: { text: "Book a Consultation", href: "/#appointment" },
    secondary: { text: "Cataract Surgery", href: "/services/cataract-surgery" },
    badge: { title: "Cataract Care", description: "Expert guidance, every step" },
  },
  {
    id: "home", label: "Eye care at home", title: "Expert Eye Care.", accent: "From Home.",
    description: "Eye concerns? Share a photo and tell us what is bothering you. Request a free consultation, and our hospital team will call you with the next best step.",
    image: "/images/hero-eye-care-at-home.jpg", alt: "An older woman using her smartphone to request eye care advice from the comfort of home",
    primary: { text: "Get Free Consultation", href: "/eye-care-at-home" },
    secondary: { text: "How It Works", href: "/eye-care-at-home" },
    badge: { title: "Free Consultation", description: "Photo upload. Hospital callback." },
  },
];

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={direction === "right" ? "M5 12h14m-6-7 7 7-7 7" : "M19 12H5m6-7-7 7 7 7"} /></svg>;
}

export default function Hero({ ready = true }: { ready?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const section = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const playing = !paused && !reducedMotion;
  const autoAdvance = playing && ready && !hovered && !focused && inView && pageVisible;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(motion.matches);
    const onVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (section.current) observer.observe(section.current);
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    slides.slice(1).forEach(slide => { const image = new Image(); image.src = slide.image; });
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!autoAdvance) return;
    const timer = window.setTimeout(() => setActive(index => (index + 1) % slides.length), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, autoAdvance]);

  function selectSlide(index: number) {
    setActive((index + slides.length) % slides.length);
    setPaused(true);
  }

  return (
    <section ref={section} role="region" aria-roledescription="carousel" aria-label="Featured eye care" className="hero-carousel relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-linear-to-br from-white via-blue-50/30 to-teal-50/20"
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={event => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const dx = event.changedTouches[0].clientX - start.x;
        const dy = event.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) selectSlide(active + (dx < 0 ? 1 : -1));
      }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="hero-copy-stack" aria-live={playing ? "off" : "polite"} aria-atomic="true">
              {slides.map((slide, index) => (
                <div key={slide.id} className={`hero-copy-slide space-y-8 ${active === index ? "is-active" : ""}`} inert={active !== index} aria-hidden={active !== index}>
                  <h1 className="font-[Outfit] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-[hsl(var(--primary))]">
                    {slide.title} <span className="text-[hsl(var(--accent))]">{slide.accent}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">{slide.description}</p>
                  <div className="hero-actions flex flex-col sm:flex-row gap-4 pt-4">
                    <Link to={slide.primary.href} className="h-14 px-8 text-lg bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-medium rounded-md shadow-xl shadow-[hsl(var(--primary))]/20 transition-all flex items-center justify-center">{slide.primary.text}</Link>
                    <Link to={slide.secondary.href} className="h-14 px-8 text-lg border border-[hsl(var(--primary))]/20 hover:bg-[hsl(var(--primary))]/5 text-[hsl(var(--primary))] font-medium rounded-md transition-all group flex items-center justify-center gap-2">
                      {slide.secondary.text}<span className="transition-transform group-hover:translate-x-1"><Arrow /></span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200/60">
              <div>
                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  {Array.from({ length: 5 }, (_, index) => <svg key={index} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8l-6.2 3.3L7 14.2 2 9.3l6.9-1Z" /></svg>)}
                </div>
                <p className="text-sm font-medium text-gray-900">4.9/5 Rating</p>
                <p className="text-xs text-gray-500">Based on 12k+ Reviews</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div><p className="text-sm font-medium text-gray-900">Top Rated</p><p className="text-xs text-gray-500">Best Eye Hospital 2024</p></div>
            </div>
            <div className="hero-controls">
              <div className="hero-dots" role="group" aria-label="Choose a featured slide">
                {slides.map((slide, index) => <button key={slide.id} type="button" aria-label={`Show ${slide.label}`} aria-pressed={active === index} className={active === index ? "is-active" : ""} onClick={() => selectSlide(index)}><span /></button>)}
              </div>
              <span className="hero-current-label" aria-hidden="true">{slides[active].label}</span>
              <div className="hero-arrow-controls">
                <button type="button" onClick={() => selectSlide(active - 1)} aria-label="Previous slide"><Arrow direction="left" /></button>
                <button type="button" onClick={() => selectSlide(active + 1)} aria-label="Next slide"><Arrow /></button>
                <button type="button" onClick={() => setPaused(value => !value)} aria-label={playing ? "Pause slideshow" : "Play slideshow"} disabled={reducedMotion} title={reducedMotion ? "Automatic rotation is disabled by your reduced motion preference" : undefined}>
                  {playing ? <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="4" y="3" width="2.5" height="10" rx="1" /><rect x="9.5" y="3" width="2.5" height="10" rx="1" /></svg> : <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5 2.5 13 8l-8 5.5Z" /></svg>}
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-tr from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))]/10 rounded-4xl blur-2xl transform rotate-2" />
            <div className="hero-image-stack relative rounded-4xl overflow-hidden shadow-2xl shadow-[hsl(var(--primary))]/10 border border-white/50">
              {slides.map((slide, index) => <div key={slide.id} className={`hero-image-slide ${active === index ? "is-active" : ""}`} aria-hidden={active !== index}>
                <img src={slide.image} alt={slide.alt} width="1408" height="768" className="w-full h-full object-cover" fetchPriority={index === 0 ? "high" : "low"} onError={event => { if (!event.currentTarget.src.endsWith("/hero.png")) event.currentTarget.src = "/hero.png"; }} />
                <div className="hero-image-badge absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                  <p className={`${index === 0 ? "text-3xl" : "text-xl"} font-bold text-[hsl(var(--primary))]`}>{slide.badge.title}</p>
                  <p className="text-sm text-gray-600 font-medium">{slide.badge.description}</p>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
