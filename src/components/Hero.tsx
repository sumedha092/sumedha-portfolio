import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Trophy } from "lucide-react";
import TerminalWindow from "./TerminalWindow";

const PAIRS = [
  { line1: "SOFTWARE",   line2: "ENGINEER.",  gradient: "linear-gradient(135deg, #00F0C8, #58A6FF)" },
  { line1: "AI",         line2: "BUILDER.",   gradient: "linear-gradient(135deg, #BC8CFF, #00F0C8)" },
  { line1: "DATA",       line2: "ANALYST.",   gradient: "linear-gradient(135deg, #FFBE00, #FF8C42)" },
  { line1: "FULL-STACK", line2: "AI DEV.", gradient: "linear-gradient(135deg, #3FB950, #58A6FF)" },
];

const SUBTITLES = [
  "→ Building distributed systems at scale",
  "→ Shipping AI that runs at 30 FPS",
  "→ Analyzing 100K+ record datasets",
  "→ Writing Spring Boot microservices",
  "→ Winning hackathons with multi-agent AI",
];

const STATS = ["8+ Projects", "5+ Microservices", "200+ Students"];

// Slightly smaller so FULL-STACK fits within 55% viewport
const FONT_SIZE = "clamp(1.8rem, 3.8vw, 5rem)";

const Hero = () => {
  const [pairIdx, setPairIdx] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const pairIdxRef = useRef(0);
  const animatingRef = useRef(false);

  // Make sure lines are visible on mount
  useEffect(() => {
    if (line1Ref.current && line2Ref.current) {
      gsap.set([line1Ref.current, line2Ref.current], {
        y: "0%", opacity: 1, filter: "blur(0px)",
      });
    }
  }, []);

  const runTransition = useCallback(() => {
    if (animatingRef.current) return;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!l1 || !l2) return;

    animatingRef.current = true;
    const nextIdx = (pairIdxRef.current + 1) % PAIRS.length;

    const tl = gsap.timeline({
      onComplete: () => { animatingRef.current = false; },
    });

    // EXIT: slide up + blur
    tl.to(l1, { y: "-110%", opacity: 0, filter: "blur(8px)", duration: 0.6, ease: "power3.in" });
    tl.to(l2, { y: "-110%", opacity: 0, filter: "blur(8px)", duration: 0.6, ease: "power3.in" }, "-=0.54");

    // Swap text content while off-screen
    tl.call(() => {
      pairIdxRef.current = nextIdx;
      setPairIdx(nextIdx);
      const next = PAIRS[nextIdx];
      [l1, l2].forEach(el => { el.style.backgroundImage = next.gradient; });
      gsap.set([l1, l2], { y: "110%", opacity: 0, filter: "blur(10px)" });
    });

    // ENTER: slide up from below + unblur
    tl.to(l1, { y: "0%", opacity: 1, filter: "blur(0px)", duration: 0.75, ease: "power3.out" }, "+=0.05");
    tl.to(l2, { y: "0%", opacity: 1, filter: "blur(0px)", duration: 0.75, ease: "power3.out" }, "-=0.68");
  }, []);

  useEffect(() => {
    const id = setInterval(runTransition, 4000);
    return () => clearInterval(id);
  }, [runTransition]);

  // Typewriter
  useEffect(() => {
    const target = SUBTITLES[subtitleIndex];
    if (!isDeleting) {
      if (typedText.length < target.length) {
        const t = setTimeout(() => setTypedText(target.slice(0, typedText.length + 1)), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setIsDeleting(true), 1500);
        return () => clearTimeout(t);
      }
    } else {
      if (typedText.length > 0) {
        const t = setTimeout(() => setTypedText(s => s.slice(0, -1)), 25);
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setSubtitleIndex(i => (i + 1) % SUBTITLES.length);
      }
    }
  }, [typedText, subtitleIndex, isDeleting]);

  useEffect(() => {
    const handler = () => { if (window.scrollY > 100) setShowScroll(false); };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const pair = PAIRS[pairIdx];

  const lineStyle = (gradient: string): React.CSSProperties => ({
    display: "inline-block",
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontSize: FONT_SIZE,
    fontWeight: 800,
    lineHeight: 1,
    whiteSpace: "nowrap",
    willChange: "transform, opacity, filter",
  });

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center md:flex-row md:items-center pt-20 pb-12 md:pb-0"
      style={{ overflow: "visible" }}
    >
      {/* ── Vignette: darkens center-left so text always reads cleanly ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 28% 50%, hsl(var(--background) / 0.70) 0%, transparent 65%)",
        }}
      />

      {/* ── TERMINAL WINDOWS — strictly in the RIGHT 45% of the viewport ── */}
      {/* Desktop only */}
      <div
        className="absolute top-0 bottom-0 z-0 hidden md:block"
        style={{ left: "52%", right: "0", pointerEvents: "none" }}
      >
        {/* Terminal 1 — top area */}
        <div className="absolute w-[500px] -rotate-3" style={{ top: "8%", left: "2%" }}>
          <TerminalWindow title="sumedha@portfolio:~$" variant="typing" />
        </div>

        {/* Terminal 2 — lower area */}
        <div className="absolute w-[460px] rotate-2" style={{ top: "50%", right: "2%" }}>
          <TerminalWindow title="aithena-backend — FastAPI" variant="logs" />
        </div>

        {/* Decorative SVG connecting line with traveling dot */}
        <svg
          className="absolute opacity-[0.08]"
          style={{ top: "38%", left: "5%", width: "200px", height: "200px" }}
          viewBox="0 0 200 200"
        >
          <path
            d="M 20 40 Q 100 20 180 120"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="dash-animate"
          />
          <circle r="3" fill="hsl(var(--teal))">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 20 40 Q 100 20 180 120"
            />
          </circle>
        </svg>
      </div>

      {/* ── HERO TEXT — strictly in the LEFT 55% ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 mt-0 md:mt-0">
        {/*
          On desktop we constrain the content to 55% width so it can
          never drift into the terminal zone on the right.
          On mobile it takes full width (terminals are hidden anyway).
        */}
        <div className="w-full md:w-[55%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Label */}
            <p className="font-label text-[0.7rem] tracking-[0.2em] text-muted-foreground mb-6">
              SUMEDHA GUPTA — ASU CS · CLASS OF 2027
            </p>

            {/* ── Two-line rotating title ── */}
            <div style={{ position: "relative", zIndex: 10, overflow: "visible" }}>
              {/* Line 1 — overflow:hidden clips the slide animation */}
              <div style={{ overflow: "hidden", lineHeight: 1 }}>
                <div ref={line1Ref} className="font-display" style={lineStyle(pair.gradient)}>
                  {pair.line1}
                </div>
              </div>

              {/* Line 2 */}
              <div style={{ overflow: "hidden", lineHeight: 1 }}>
                <div ref={line2Ref} className="font-display" style={lineStyle(pair.gradient)}>
                  {pair.line2}
                </div>
              </div>
            </div>

            {/* Typewriter subtitle */}
            <div className="mt-5 h-7">
              <span
                className="font-code"
                style={{ fontSize: "1.05rem", color: "hsl(var(--amber))" }}
              >
                {typedText}
                <span
                  className="terminal-cursor"
                  style={{ color: "hsl(var(--amber))" }}
                >
                  |
                </span>
              </span>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 mt-7">
              {STATS.map(stat => (
                <span
                  key={stat}
                  className="font-label text-[0.65rem] tracking-wider px-3 py-1.5 rounded-full border border-border bg-surface text-foreground"
                >
                  {stat}
                </span>
              ))}
              <span className="font-label text-[0.65rem] tracking-wider px-3 py-1.5 rounded-full border border-border bg-surface text-foreground flex items-center gap-1.5">
                <Trophy size={11} color="#FFBE00" />
                HackASU 2026 Winner
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-4 mt-8">
              <a
                href="#projects"
                className="font-label text-[0.75rem] tracking-wider px-6 py-3 rounded-full text-primary-foreground transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--teal)), hsl(var(--primary)))",
                }}
              >
                View Work ↓
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[0.75rem] tracking-wider px-6 py-3 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Résumé ↗
              </a>
            </div>

            {/* Mobile terminal — in flow, below buttons, never overlaps */}
            <div className="mt-10 md:hidden">
              <TerminalWindow title="sumedha@portfolio:~$" variant="typing" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
        >
          <div className="w-px bg-foreground/30 scroll-indicator-line" />
          <span className="font-label text-[0.55rem] tracking-[0.2em] text-muted-foreground">
            SCROLL
          </span>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
