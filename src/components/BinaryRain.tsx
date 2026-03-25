import { useEffect, useRef } from "react";

const CHARS = "01アイウエオ10110100FF3E2A9C";

interface Drop {
  x: number;       // column x in px
  y: number;       // current head y in px
  speed: number;
  fontSize: number;
  length: number;  // trail length in characters
  chars: string[]; // randomized character per cell
  opacity: number;
}

export default function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let drops: Drop[] = [];
    const COL_GAP = 28;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = [];

      const cols = Math.floor(canvas.width / COL_GAP);
      for (let i = 0; i < cols; i++) {
        drops.push({
          x: i * COL_GAP + Math.random() * 10,
          y: -Math.random() * canvas.height,
          speed: 1.2 + Math.random() * 2.5,
          fontSize: 11 + Math.floor(Math.random() * 5),
          length: 6 + Math.floor(Math.random() * 14),
          chars: Array.from({ length: 20 }, () =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
          ),
          opacity: 0.08 + Math.random() * 0.1,
        });
      }
    };

    init();
    window.addEventListener("resize", init);

    const isDark = () => document.documentElement.classList.contains("dark");

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = isDark();

      drops.forEach((d) => {
        d.y += d.speed;
        if (d.y - d.length * d.fontSize > canvas.height) {
          d.y = -d.length * d.fontSize;
          d.chars = d.chars.map(() => CHARS[Math.floor(Math.random() * CHARS.length)]);
        }

        // Randomly mutate one char per drop per few frames
        if (t % 8 === 0) {
          const ri = Math.floor(Math.random() * d.chars.length);
          d.chars[ri] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        ctx.font = `${d.fontSize}px 'Fira Code', monospace`;

        for (let i = 0; i < d.length; i++) {
          const cy = d.y - i * d.fontSize;
          if (cy < 0 || cy > canvas.height) continue;

          // Head char is brightest, trail fades
          const trailFade = i === 0 ? 1 : Math.max(0, 1 - i / d.length);
          const alpha = d.opacity * trailFade;

          const char = d.chars[i % d.chars.length];

          if (dark) {
            // Teal head, dimmer teal trail
            const g = i === 0 ? 240 : Math.floor(160 * trailFade);
            ctx.fillStyle = `rgba(0,${g},${i === 0 ? 200 : 140},${alpha})`;
          } else {
            // Blue in light mode
            const b = i === 0 ? 255 : Math.floor(200 * trailFade);
            ctx.fillStyle = `rgba(0,80,${b},${alpha})`;
          }

          ctx.fillText(char, d.x, cy);
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", init);
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
