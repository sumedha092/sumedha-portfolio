import { useEffect, useRef } from "react";

// A hand-crafted git graph: main + two feature branches + merges
// All coordinates are in a 200x400 local viewBox, scaled on render
const BRANCHES = [
  { id: "main",    color: "0,240,200",  x: 40 },   // teal
  { id: "feat/ai", color: "123,97,255", x: 90 },   // purple
  { id: "feat/db", color: "255,190,0",  x: 140 },  // amber
];

// [fromNode, toNode] — indices into COMMITS
const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 9], [9, 10], [10, 11],
  [1, 6], [6, 7], [7, 5],         // feat/ai branch + merge
  [2, 8], [8, 3],                 // feat/db branch (short)
];

const COMMITS = [
  { x: 40,  y: 20,  branch: 0, label: "init" },
  { x: 40,  y: 70,  branch: 0, label: "feat: auth" },
  { x: 40,  y: 120, branch: 0, label: "fix: cors" },
  { x: 40,  y: 190, branch: 0, label: "merge feat/db" },
  { x: 40,  y: 240, branch: 0, label: "refactor" },
  { x: 40,  y: 300, branch: 0, label: "merge feat/ai" },
  { x: 90,  y: 110, branch: 1, label: "feat: model" },
  { x: 90,  y: 170, branch: 1, label: "feat: infer" },  // merges into main at y300
  { x: 140, y: 150, branch: 2, label: "feat: schema" }, // short branch
  { x: 40,  y: 340, branch: 0, label: "v1.0.0" },
  { x: 40,  y: 370, branch: 0, label: "hotfix" },
  { x: 40,  y: 395, branch: 0, label: "HEAD" },
];

export default function GitGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const W = 200;
    const H = 420;
    let scale = 1;

    const resize = () => {
      // Pin to bottom-left, fixed pixel size — just handle DPR
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      scale = dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const isDark = () => document.documentElement.classList.contains("dark");

    // Traveling dot state — moves along edge list
    let edgeIdx = 0;
    let edgeT   = 0; // 0→1 progress along current edge

    const getPos = (i: number) => ({ x: COMMITS[i].x, y: COMMITS[i].y });

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);

      const dark = isDark();
      const lineOpacity  = dark ? 0.55 : 0.45;
      const nodeOpacity  = dark ? 0.75 : 0.65;
      const labelOpacity = dark ? 0.55 : 0.45;

      // Draw edges
      EDGES.forEach(([a, b]) => {
        const ca = COMMITS[a];
        const cb = COMMITS[b];
        const branchIdx = ca.branch;
        const col = BRANCHES[branchIdx].color;

        ctx.beginPath();
        ctx.moveTo(ca.x, ca.y);

        // If branch changes x, draw an angled connector
        if (ca.x !== cb.x) {
          const midY = (ca.y + cb.y) / 2;
          ctx.bezierCurveTo(ca.x, midY, cb.x, midY, cb.x, cb.y);
        } else {
          ctx.lineTo(cb.x, cb.y);
        }

        ctx.strokeStyle = `rgba(${col},${lineOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw commit nodes
      COMMITS.forEach((c) => {
        const col = BRANCHES[c.branch].color;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.label === "HEAD" ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${nodeOpacity})`;
        ctx.fill();

        // Label
        ctx.font = "9px 'Fira Code', monospace";
        ctx.fillStyle = `rgba(${col},${labelOpacity})`;
        ctx.fillText(c.label, c.x + 9, c.y + 3);
      });

      // Traveling dot
      const edge = EDGES[edgeIdx];
      const from = getPos(edge[0]);
      const to   = getPos(edge[1]);
      const dotX = from.x + (to.x - from.x) * edgeT;
      const dotY = from.y + (to.y - from.y) * edgeT;

      const dotBranch = COMMITS[edge[0]].branch;
      const dotCol = BRANCHES[dotBranch].color;

      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dotCol},1)`;
      ctx.fill();

      // Glow ring
      ctx.beginPath();
      ctx.arc(dotX, dotY, 5 + Math.sin(t * 4) * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${dotCol},${dark ? 0.25 : 0.18})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Advance dot
      edgeT += 0.012;
      if (edgeT >= 1) {
        edgeT = 0;
        edgeIdx = (edgeIdx + 1) % EDGES.length;
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width:  "200px",
        height: "420px",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 1,
      }}
    />
  );
}
