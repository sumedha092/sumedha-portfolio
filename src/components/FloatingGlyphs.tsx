import { useEffect, useRef } from "react";

const GLYPHS = [
  "git commit", "fn()", "{}", "</>", "=>", "&&", "||", "0x1F",
  "npm run", "SELECT *", "curl", "ssh", "sudo", "def ", "import",
  "async", "await", "::", "[]", "null", "push()", "docker run",
  "ls -la", "grep -r", "cd ..", "chmod", "export", "return",
];

interface Glyph {
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
  drift: number; // horizontal sway amplitude
  phase: number; // sine phase offset
}

const isDark = () => document.documentElement.classList.contains("dark");

export default function FloatingGlyphs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed glyphs spread across the full page height (2x viewport so they feel continuous)
    const count = 28;
    const arr: Glyph[] = [];

    for (let i = 0; i < count; i++) {
      arr.push({
        text: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        x: Math.random() * 100,          // % of canvas width
        y: Math.random() * 200 - 100,    // start scattered, some off-screen
        speed: 0.06 + Math.random() * 0.08,
        opacity: 0.03 + Math.random() * 0.04,
        size: 11 + Math.floor(Math.random() * 7),
        drift: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = isDark();
      const baseColor = dark ? "255,255,255" : "20,20,40";

      ctx.font = `400 ${12}px 'Fira Code', monospace`;

      arr.forEach((g) => {
        // Drift upward
        g.y -= g.speed;
        // Wrap around when off top
        if (g.y < -5) {
          g.y = 105;
          g.x = Math.random() * 100;
          g.text = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }

        const cx = (g.x / 100) * canvas.width + Math.sin(t + g.phase) * g.drift;
        const cy = (g.y / 100) * canvas.height;

        ctx.font = `400 ${g.size}px 'Fira Code', monospace`;
        ctx.fillStyle = `rgba(${baseColor},${g.opacity})`;
        ctx.fillText(g.text, cx, cy);
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
