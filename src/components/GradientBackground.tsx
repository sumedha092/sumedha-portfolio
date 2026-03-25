import { useEffect, useRef } from "react";

// Each blob animates independently on its own path
const BLOBS = [
  { color: "rgba(0,240,200,VAL)", size: 700, x: 10, y: 8,  dx: 25, dy: 20, speed: 14 },
  { color: "rgba(123,97,255,VAL)", size: 580, x: 82, y: 6,  dx: 20, dy: 25, speed: 18 },
  { color: "rgba(255,190,0,VAL)",  size: 660, x: 48, y: 92, dx: 22, dy: 18, speed: 22 },
  { color: "rgba(0,102,255,VAL)",  size: 480, x: 88, y: 55, dx: 18, dy: 22, speed: 16 },
];

const LIGHT_OPACITY = 0.22;
const DARK_OPACITY  = 0.13;

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Track blob positions with smooth sine-wave motion
    const state = BLOBS.map((b, i) => ({
      ...b,
      px: b.x, py: b.y,
      phase: (i * Math.PI * 0.7),
    }));

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isDark = () => document.documentElement.classList.contains("dark");

    let t = 0;
    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const opacity = isDark() ? DARK_OPACITY : LIGHT_OPACITY;

      state.forEach((b) => {
        // Smooth Lissajous-style drift
        const nx = b.x + Math.sin(t * (10 / b.speed) + b.phase)       * b.dx;
        const ny = b.y + Math.cos(t * (10 / b.speed) + b.phase * 1.3) * b.dy;

        const cx = (nx / 100) * canvas.width;
        const cy = (ny / 100) * canvas.height;
        const r  = (b.size / 1440) * canvas.width;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0,   b.color.replace("VAL", String(opacity)));
        grad.addColorStop(0.5, b.color.replace("VAL", String(opacity * 0.4)));
        grad.addColorStop(1,   b.color.replace("VAL", "0"));

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
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
        zIndex: 0,
      }}
    />
  );
}
