import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./Stats.css";

const stats = [
  { value: "1,80,000+", label: "Patients checked so far", category: "Hospital care", icon: "people" },
  { value: "2.5 lakh", label: "Eye surgeries performed", category: "Hospital care", icon: "eye" },
  { value: "4.2 lakh", label: "Patients checked via vans", category: "Community", icon: "pin" },
  { value: "72", label: "Hospital beds", category: "Hospital care", icon: "bed" },
  { value: "5", label: "Operation theatres", category: "Hospital care", icon: "hospital" },
  { value: "250", label: "Eyeballs collected", category: "Hospital care", icon: "heart" },
  { value: "30", label: "Blood donation camps", category: "Community", icon: "drop" },
  { value: "12,000", label: "Blood bottles collected", category: "Community", icon: "bottle" },
  { value: "6", label: "Mobile vans", category: "Community", icon: "van" },
  { value: "50", label: "Trainees, Mirashi Nursing School", category: "Training", icon: "cap" },
  { value: "500+", label: "Fresh doctors trained", category: "Training", icon: "stethoscope" },
  { value: "9,000", label: "Students checked", category: "Community", icon: "clipboard" },
];
const paths: Record<string, string> = {
  people: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 4a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0 M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  bed: "M3 5v15 M21 12v8 M3 17h18 M3 12h18 M7 8h3v4H7z M13 8h5a3 3 0 0 1 3 3v1h-8z",
  hospital: "M5 21V3h14v18z M9 7h6 M12 4v6 M9 21v-6h6v6",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8 M8 12h8 M12 8v8",
  drop: "M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13 M9 16a3 3 0 0 0 3 3",
  bottle: "M9 2h6 M10 2v5l-4 7v7h12v-7l-4-7V2 M6 14h12 M12 16v3 M10.5 17.5h3",
  van: "M2 6h12v12H2z M14 10h4l4 5v3h-8 M4 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0 M16 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0 M6 10h4 M8 8v4",
  cap: "M2 8l10-5 10 5-10 5z M6 10v7c4 3 8 3 12 0v-7 M22 8v8",
  stethoscope: "M5 3H3v5a5 5 0 0 0 10 0V3h-2 M8 13v3a5 5 0 0 0 10 0v-3 M21 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  clipboard: "M9 4H5v18h14V4h-4 M9 2h6v5H9z M8 14l3 3 5-6",
};
function VisionArt() {
  const id = useId();
  const svg = useRef<SVGSVGElement>(null);
  const gaze = useRef<SVGGElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;
    const render = () => {
      frame = 0;
      const eye = svg.current;
      if (!eye || !gaze.current) return;
      const bounds = eye.getBoundingClientRect();
      if (!pointer || motion.matches) {
        gaze.current.style.transform = "translate(0px, 0px)";
        return;
      }
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const dx = pointer.x - (bounds.left + bounds.width / 2);
      const dy = pointer.y - (bounds.top + bounds.height / 2);
      const distance = Math.hypot(dx, dy, 180);
      gaze.current.style.transform = `translate(${dx / distance * 24}px, ${dy / distance * 15}px)`;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(render); };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const reset = () => { pointer = null; schedule(); };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);
  const eyeShape = "M35 151C78 91 123 81 178 87C238 88 287 118 326 155C282 193 236 211 181 212C122 215 69 192 35 151Z";
  return <svg ref={svg} className="impact-vision" viewBox="0 0 360 300" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id={id + "-white"} cx="52%" cy="62%" r="70%"><stop stopColor="#fffef4" /><stop offset=".55" stopColor="#e0ebe3" /><stop offset=".84" stopColor="#91aea4" /><stop offset="1" stopColor="#526f67" /></radialGradient>
      <radialGradient id={id + "-iris"}><stop offset=".25" stopColor="#5a482c" /><stop offset=".46" stopColor="#b69e58" /><stop offset=".65" stopColor="#598f7b" /><stop offset=".86" stopColor="#296556" /><stop offset="1" stopColor="#0b302e" /></radialGradient>
      <linearGradient id={id + "-lid"} x1="0" y1="80" x2="0" y2="220" gradientUnits="userSpaceOnUse"><stop stopColor="#7aa793" /><stop offset=".45" stopColor="#2b5c4e" /><stop offset="1" stopColor="#8bb09c" /></linearGradient>
      <linearGradient id={id + "-shade"} x1="0" y1="85" x2="0" y2="170" gradientUnits="userSpaceOnUse"><stop stopColor="#031f20" stopOpacity=".6" /><stop offset=".8" stopColor="#031f20" stopOpacity="0" /></linearGradient>
      <radialGradient id={id + "-gloss"} cx="35%" cy="24%"><stop stopColor="#fff" stopOpacity=".36" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <clipPath id={id + "-clip"}><path d={eyeShape} /></clipPath>
    </defs>
    <path d="M42 125C112 48 220 57 308 127" stroke="#8db8a2" strokeOpacity=".25" strokeWidth="2" />
    <path d="M62 204C139 243 234 238 298 196" stroke="#8db8a2" strokeOpacity=".17" strokeWidth="2" />
    <g className="impact-eye-art">
      <path d={eyeShape} fill={`url(#${id}-white)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <g stroke="#b88e87" strokeWidth=".7" opacity=".24"><path d="M35 151l25-3 17 6 15-2M58 148l8-10 15-4M326 155l-26 7-20-4-12 6M302 162l-12 14-13 4" /></g>
        <g ref={gaze} className="impact-gaze">
          <circle cx="180" cy="150" r="62" fill={`url(#${id}-iris)`} stroke="#163e36" strokeWidth="3" />
          {Array.from({ length: 100 }, (_, index) => {
            const angle = index * Math.PI * 2 / 100;
            const inner = 26 + Math.sin(index * 2.7) * 4;
            const outer = 58 + Math.sin(index * 1.9) * 2;
            const x = (radius: number, shift = 0) => 180 + Math.cos(angle + shift) * radius;
            const y = (radius: number, shift = 0) => 150 + Math.sin(angle + shift) * radius;
            return <path key={index} d={`M${x(inner)} ${y(inner)}Q${x(42, .035)} ${y(42, .035)} ${x(outer)} ${y(outer)}`} stroke={index % 3 === 0 ? "#c9c387" : index % 3 === 1 ? "#123e36" : "#92b69a"} strokeWidth={index % 4 === 0 ? 1.3 : .65} opacity=".65" />;
          })}
          <circle cx="180" cy="150" r="26" fill="#081817" />
          <circle cx="180" cy="150" r="23" fill="#020909" />
          <circle cx="180" cy="150" r="60" fill={`url(#${id}-gloss)`} />
          <ellipse cx="160" cy="129" rx="13" ry="9" transform="rotate(-30 160 129)" fill="#fff" opacity=".9" />
          <circle cx="197" cy="172" r="4" fill="#fff" opacity=".6" />
          <path d="M146 182a46 46 0 0 0 56 7" stroke="#d9eedb" strokeWidth="2" opacity=".25" />
        </g>
        <path d={eyeShape} fill={`url(#${id}-shade)`} />
        <path d="M35 151q12-13 19-14q-5 13-5 25Z" fill="#bf9d8a" opacity=".6" />
      </g>
      <path d={eyeShape} stroke={`url(#${id}-lid)`} strokeWidth="3" />
      <path d="M35 151C78 91 123 81 178 87C238 88 287 118 326 155" stroke="#0c2a27" strokeWidth="5" strokeLinecap="round" />
      <path d="M49 166C129 230 243 218 312 166" stroke="#c0d9c4" strokeWidth="1" opacity=".55" />
    </g>
  </svg>;
}
export default function Stats() {
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={section} className={`impact-section ${visible ? "impact-visible" : ""}`} aria-labelledby="impact-title">
    <div className="container mx-auto px-4 md:px-6">
      <header className="impact-heading"><div><p className="impact-eyebrow"><span />Our impact</p><h2 id="impact-title">Better vision.<br /><span>Brighter futures.</span></h2></div><p className="impact-intro">From hospital care to community outreach, every step brings better eye care closer to the people who need it.</p></header>
      <div className="impact-layout">
        <aside className="impact-feature"><div className="impact-feature-top"><span>A VISION OF CARE</span><span className="impact-feature-mark">✦</span></div><VisionArt /><div className="impact-feature-copy"><h3>Every number.<br />A life touched.</h3><p>Care in our hospitals.<br />Connection in our communities.<br />Knowledge for the next generation.</p></div><div className="impact-feature-footer"><span className="impact-small-cross">+</span><span>Padma Shri Dr. Manohar Dole<br />Medical Foundation · Narayangaon, Pune</span></div></aside>
        <div className="impact-results">
          <div id="impact-metrics" className="impact-grid">{stats.map((stat, index) => <article className="impact-stat" key={stat.label} style={{ "--impact-delay": `${index * 35}ms` } as CSSProperties}><div className={`impact-icon ${stat.category === "Community" ? "impact-icon-community" : stat.category === "Training" ? "impact-icon-training" : ""}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[stat.icon]} /></svg></div><p className="impact-value">{stat.value}</p><p className="impact-label">{stat.label}</p></article>)}</div>
        </div>
      </div>
    </div>
  </section>;
}
