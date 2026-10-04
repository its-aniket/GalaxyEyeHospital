import { useEffect, useState } from "react";
import logo from "../assets/galaxy-logo-animated.svg?raw";
import "./BrandIntro.css";

export default function BrandIntro({ onComplete, preview = false }: { onComplete: () => void; preview?: boolean }) {
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, []);
  useEffect(() => {
    if (preview) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(onComplete, reducedMotion ? 900 : 5600);
    return () => window.clearTimeout(timeout);
  }, [onComplete, preview]);

  return <div className={`brand-intro ${preview ? "brand-intro-preview" : ""}`} role="dialog" aria-modal="true" aria-label="Welcome to Galaxy Eye Hospital">
    <div className="brand-intro-scene" key={replay}>
      <div className="brand-intro-lockup">
        <div className="brand-intro-emblem" dangerouslySetInnerHTML={{ __html: logo }} />
        <div className="brand-intro-wordmark">
          <p className="brand-intro-kicker">A clearer tomorrow</p>
          <p className="brand-intro-name">Galaxy <span>Eye Hospital</span></p>
          <div className="brand-intro-rule" />
          <p className="brand-intro-specialties">Lasik, Laser &amp; Retina Center</p>
        </div>
      </div>
      <p className="brand-intro-caption">Expert care. A lifetime of better vision.</p>
    </div>
    <div className="brand-intro-controls">
      {preview && <button type="button" onClick={() => setReplay(value => value + 1)}>Replay animation <span aria-hidden="true">↻</span></button>}
      <button type="button" onClick={onComplete}>{preview ? "Enter website" : "Skip intro"}<span aria-hidden="true">→</span></button>
    </div>
  </div>;
}
