import { useEffect, useRef } from "react";

interface Cursor {
  x: number; // % of viewport width
  y: number; // % of viewport height
  phase: number; // blink offset
  speed: number; // blink speed multiplier
  opacity: number; // max opacity
  size: number;
}

const COUNT = 40;

export default function CursorField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark = () => document.documentElement.classList.contains("dark");

    // Create cursor elements
    const cursors: { el: HTMLSpanElement; phase: number; speed: number; opacity: number }[] = [];

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("span");
      el.textContent = "|";
      const x = Math.random() * 98;
      const y = Math.random() * 98;
      const size = 12 + Math.floor(Math.random() * 10);
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.2;
      const opacity = 0.12 + Math.random() * 0.18;

      el.style.cssText = `
        position: fixed;
        left: ${x}%;
        top: ${y}%;
        font-family: 'Fira Code', monospace;
        font-size: ${size}px;
        font-weight: 400;
        pointer-events: none;
        user-select: none;
        line-height: 1;
        color: ${isDark() ? "rgba(0,240,200,1)" : "rgba(0,102,255,1)"};
        opacity: 0;
        z-index: 1;
      `;

      container.appendChild(el);
      cursors.push({ el, phase, speed, opacity });
    }

    let t = 0;
    let rafId: number;

    const tick = () => {
      t += 0.025;
      const dark = isDark();
      cursors.forEach(({ el, phase, speed, opacity }) => {
        // Smooth sine blink
        const val = (Math.sin(t * speed + phase) + 1) / 2;
        el.style.opacity = String(val * opacity);
        el.style.color = dark ? "rgba(0,240,200,1)" : "rgba(0,102,255,1)";
      });
      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      cursors.forEach(({ el }) => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}
    />
  );
}
