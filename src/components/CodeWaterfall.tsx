import { useEffect, useRef } from "react";

// Real-ish code lines pulled from your project stack
const CODE_LINES = [
  "const model = await claude.messages.create({",
  "  model: 'claude-3-5-sonnet',",
  "  max_tokens: 1024,",
  "});",
  "router.get('/api/analyze', async (req, res) => {",
  "  const { userId } = req.params;",
  "  return res.json({ status: 'ok' });",
  "});",
  "SELECT COUNT(*) FROM grammys WHERE year > 2015;",
  "df = pd.read_csv('dataset.csv')",
  "model.fit(X_train, y_train)",
  "accuracy = model.score(X_test, y_test)",
  "@app.route('/infer', methods=['POST'])",
  "def predict(payload: InferRequest):",
  "    return {'label': model.predict(payload.data)}",
  "git commit -m 'feat: add real-time matching'",
  "docker build -t aithena:latest .",
  "kubectl apply -f deployment.yaml",
  "npm run build && vercel deploy",
  "export default function Hero() {",
  "  const [active, setActive] = useState(false);",
  "  return <motion.div animate={active} />;",
  "}",
  "async function fetchMatches(userId: string) {",
  "  const res = await fetch(`/api/match/${userId}`);",
  "  return res.json();",
  "}",
  "CREATE TABLE users (id UUID PRIMARY KEY,",
  "  email TEXT UNIQUE NOT NULL,",
  "  created_at TIMESTAMPTZ DEFAULT now());",
  "EAR = (A + B) / (2.0 * C)",
  "if EAR < THRESHOLD: trigger_alert()",
  "ws.emit('match_found', { partners })",
];

const COLUMNS = 4;
const COLUMN_POSITIONS = [0.06, 0.28, 0.57, 0.78]; // % of canvas width

interface Column {
  lines: string[];
  y: number;       // current top y in px
  speed: number;
  lineHeight: number;
  opacity: number;
  colorIdx: number;
}

const COLORS = [
  "0,240,200",   // teal
  "123,97,255",  // purple
  "88,166,255",  // blue
  "255,190,0",   // amber
];

export default function CodeWaterfall() {
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

    const isDark = () => document.documentElement.classList.contains("dark");

    // Shuffle lines and split into columns
    const shuffled = [...CODE_LINES].sort(() => Math.random() - 0.5);
    const chunkSize = Math.ceil(shuffled.length / COLUMNS);

    const columns: Column[] = Array.from({ length: COLUMNS }, (_, i) => ({
      lines: [
        ...shuffled.slice(i * chunkSize, (i + 1) * chunkSize),
        ...shuffled.slice(i * chunkSize, (i + 1) * chunkSize), // repeat so scroll is seamless
      ],
      y: -(Math.random() * 400), // stagger start positions
      speed: 0.25 + Math.random() * 0.2,
      lineHeight: 22,
      opacity: 0.1 + Math.random() * 0.08,
      colorIdx: i % COLORS.length,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark();

      columns.forEach((col, ci) => {
        col.y += col.speed;

        const totalHeight = col.lines.length * col.lineHeight;
        // Seamless loop
        if (col.y > totalHeight / 2) col.y -= totalHeight / 2;

        const cx = COLUMN_POSITIONS[ci] * canvas.width;
        const color = dark ? COLORS[col.colorIdx] : "30,30,60";

        ctx.font = "11px 'Fira Code', monospace";

        col.lines.forEach((line, li) => {
          const ly = col.y + li * col.lineHeight;
          // Only draw if on screen
          if (ly < -col.lineHeight || ly > canvas.height + col.lineHeight) return;

          // Fade near top and bottom edges
          const edgeFade = Math.min(ly / 120, 1) * Math.min((canvas.height - ly) / 120, 1);
          const alpha = col.opacity * Math.max(0, edgeFade);

          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fillText(line, cx, ly);
        });
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
