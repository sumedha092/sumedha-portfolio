import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";

interface Station {
  name: string;
  year: string;
  x: number;
  tracks: TrackKey[];
  details: string;
  tech: string[];
  metric?: string;
  winner?: boolean;
  leadership?: boolean;
}

type TrackKey = "green" | "purple" | "amber" | "blue";

const LEADERSHIP_Y = 200; // below the amber (160) track line

const STATIONS: Station[] = [
  { name: "Finance Bot", year: "2023", x: 2, tracks: ["blue", "purple"], details: "Conversational AI for financial queries using OpenAI and NLP", tech: ["Python", "NLP", "OpenAI"], metric: "NLP-powered" },
  { name: "Grammy+Intel EDA", year: "Jan–Apr 2024", x: 14, tracks: ["amber"], details: "Data Analysis Traineeship — EDA on Grammy Award records and Intel Sustainability data. 100K+ records, SQL, Python, Pandas, Tableau", tech: ["SQL", "Python", "Pandas", "Tableau", "NumPy"], metric: "100K+ records" },
  { name: "Skillify", year: "Sep 2024", x: 30, tracks: ["blue", "green"], details: "Skill-sharing marketplace with live lifecycle", tech: ["Next.js", "Node.js", "MongoDB"], metric: "Real-time" },
  { name: "BreathePulse", year: "Apr 2025", x: 48, tracks: ["purple", "blue"], details: "Full-stack computer vision wellness app — fatigue detection at 30 FPS, FastAPI backend, React frontend", tech: ["MediaPipe", "FastAPI", "React", "TypeScript", "Firebase"], metric: "30+ FPS" },
  { name: "MPC Cloud", year: "May–Aug 2025", x: 55, tracks: ["green"], details: "Software Engineer Intern — Spring Boot microservices", tech: ["Spring Boot", "PostgreSQL", "Docker"], metric: "Production" },
  { name: "Aithena", year: "Sep 2025", x: 68, tracks: ["purple", "blue"], details: "AI study partner matching in real time", tech: ["React", "FastAPI", "WebSockets"], metric: "100+ users" },
  { name: "StudyMap", year: "Nov 2025", x: 76, tracks: ["purple", "blue"], details: "Adaptive quizzes powered by Claude", tech: ["React", "Claude Haiku", "Zustand"], metric: "20+ topics" },
  { name: "Allergy Voyage", year: "Jan 2026–Present", x: 85, tracks: ["green", "blue"], details: "Software Development Intern — C#/.NET backend", tech: [".NET", "MongoDB", "Docker"], metric: "1K+ records" },
  { name: "Credit Risk", year: "Spring 2026", x: 90, tracks: ["amber", "purple"], details: "ML models for borrower default probability", tech: ["scikit-learn", "PyTorch", "Pandas"], metric: "4 models" },
  { name: "Civilian", year: "Mar 2026", x: 97, tracks: ["purple", "blue"], details: "Multi-model Claude pipeline — classifies complaints, researches real officials, generates letters, moderates, translates 70+ languages, autonomously follows up via TinyFish agents", tech: ["Next.js", "Claude Sonnet 4.6", "Claude Haiku", "TinyFish Agents", "Mapbox GL", "InsForge", "Resend"], metric: "70+ languages", winner: true },
];

const TRACK_COLORS: Record<TrackKey, string> = {
  green: "#3FB950",
  purple: "#BC8CFF",
  amber: "#FFBE00",
  blue: "#58A6FF",
};

const TRACK_Y: Record<TrackKey, number> = {
  blue: 28,
  green: 72,
  purple: 116,
  amber: 160,
};

const TRACK_LABELS: Record<TrackKey, string> = {
  green: "BE",
  purple: "AI",
  amber: "DATA",
  blue: "FS",
};

const LEGEND = [
  { key: "green" as TrackKey, label: "Backend & Systems" },
  { key: "purple" as TrackKey, label: "AI / ML / LLMs" },
  { key: "amber" as TrackKey, label: "Data Analysis" },
  { key: "blue" as TrackKey, label: "Full-Stack Product" },
];

const LEADERSHIP_COLOR = "#94A3B8";

interface TooltipState {
  station: Station;
  x: number;
  y: number;
}

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const getStationCx = (x: number) => x * 9.6 + 25;

  const isHoveredTrack = (track: TrackKey) => {
    if (!hovered) return true;
    const s = STATIONS.find(s => s.name === hovered);
    return s ? s.tracks.includes(track) : true;
  };

  const handleMouseEnter = useCallback((station: Station, e: React.MouseEvent) => {
    setHovered(station.name);
    const rect = (e.currentTarget as SVGElement).closest("svg")!.getBoundingClientRect();
    const cx = getStationCx(station.x);
    const markerY = Math.min(...station.tracks.map(t => TRACK_Y[t]));
    const svgW = rect.width;
    const svgH = rect.height;
    const scaleX = svgW / 1000;
    const scaleY = svgH / 240;
    const screenX = rect.left + cx * scaleX;
    const screenY = rect.top + markerY * scaleY;
    setTooltip({ station, x: screenX, y: screenY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  const technicalStations = STATIONS.filter(s => !s.leadership);
  const leadershipStations = STATIONS.filter(s => s.leadership);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="font-label text-[0.65rem] tracking-[0.2em] text-muted-foreground mb-3">THE TRAJECTORY</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Not a list. A deliberate arc.
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-12 max-w-xl">
          From building tools to production backends to agentic AI that wins hackathons.
        </p>

        {/* Metro map — desktop */}
        <div ref={ref} className="relative hidden md:block overflow-x-auto pb-4 pr-16">
          <svg
            viewBox="0 0 1000 240"
            className="w-full min-w-[800px] h-auto"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            {/* Track lines */}
            {(Object.entries(TRACK_Y) as [TrackKey, number][]).map(([track, y], idx) => (
              <motion.line
                key={track}
                x1="25" y1={y} x2="975" y2={y}
                stroke={TRACK_COLORS[track]}
                strokeWidth="2.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: hovered ? (isHoveredTrack(track) ? 0.9 : 0.12) : 0.35 } : {}}
                transition={{ pathLength: { duration: 1.4, delay: idx * 0.2, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
              />
            ))}

            {/* Track labels */}
            {(Object.entries(TRACK_Y) as [TrackKey, number][]).map(([track, y]) => (
              <text key={`label-${track}`} x="6" y={y + 4} fill={TRACK_COLORS[track]} fontSize="8" fontFamily="Space Mono" opacity="0.7">
                {TRACK_LABELS[track]}
              </text>
            ))}

            {/* Leadership row label */}
            <text x="6" y={LEADERSHIP_Y + 4} fill={LEADERSHIP_COLOR} fontSize="8" fontFamily="Space Mono" opacity="0.7">
              ★
            </text>

            {/* Technical stations */}
            {technicalStations.map((station, i) => {
              const cx = getStationCx(station.x);
              const isActive = hovered === station.name;
              const minY = Math.min(...station.tracks.map(t => TRACK_Y[t]));
              const maxY = Math.max(...station.tracks.map(t => TRACK_Y[t]));

              return (
                <motion.g
                  key={station.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={e => handleMouseEnter(station, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {station.tracks.length > 1 && (
                    <line x1={cx} y1={minY} x2={cx} y2={maxY} stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity={isActive ? 0.4 : 0.12} />
                  )}

                  {station.winner && (
                    <circle cx={cx} cy={minY} r="14" fill="none" stroke="#FFBE00" strokeWidth="1.5" style={{ animation: "winnerPulse 3s ease-in-out infinite" }} />
                  )}

                  {station.tracks.map(track => (
                    <circle
                      key={`${station.name}-${track}`}
                      cx={cx} cy={TRACK_Y[track]}
                      r={isActive ? 8 : station.tracks.length > 1 ? 6.5 : 5.5}
                      fill={TRACK_COLORS[track]}
                      stroke="hsl(var(--background))"
                      strokeWidth="2"
                      style={{ transition: "r 0.2s ease" }}
                    />
                  ))}

                  {station.winner && (
                    <text x={cx} y={minY - 22} textAnchor="middle" fontSize="7" fontFamily="Space Mono" fill="#FFBE00" fontWeight="bold">
                      HackASU 2026
                    </text>
                  )}

                  <text x={cx} y={maxY + 18} textAnchor="middle" fontSize="7.5" fontFamily="DM Mono" fill="hsl(var(--foreground))" opacity={isActive ? 1 : 0.75}>
                    {station.name}
                  </text>
                  <text x={cx} y={maxY + 27} textAnchor="middle" fontSize="6" fontFamily="Space Mono" fill="hsl(var(--muted-foreground))" opacity="0.6">
                    {station.year}
                  </text>
                </motion.g>
              );
            })}

            {/* Leadership stations — rendered below all track lines */}
            {leadershipStations.map((station, i) => {
              const cx = getStationCx(station.x);
              const isActive = hovered === station.name;

              return (
                <motion.g
                  key={station.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={e => handleMouseEnter(station, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Star marker */}
                  <text
                    x={cx} y={LEADERSHIP_Y + 4}
                    textAnchor="middle"
                    fontSize={isActive ? 16 : 13}
                    fill={LEADERSHIP_COLOR}
                    opacity={isActive ? 1 : 0.75}
                    style={{ transition: "font-size 0.2s ease" }}
                  >
                    ★
                  </text>

                  <text x={cx} y={LEADERSHIP_Y + 18} textAnchor="middle" fontSize="7.5" fontFamily="DM Mono" fill={LEADERSHIP_COLOR} opacity={isActive ? 1 : 0.75}>
                    {station.name}
                  </text>
                  <text x={cx} y={LEADERSHIP_Y + 27} textAnchor="middle" fontSize="6" fontFamily="Space Mono" fill={LEADERSHIP_COLOR} opacity="0.6">
                    {station.year}
                  </text>
                </motion.g>
              );
            })}
          </svg>

          {/* Time axis */}
          <div className="flex justify-between mt-2 px-8">
            <span className="font-label text-[0.55rem] tracking-wider text-muted-foreground">2023</span>
            <span className="font-label text-[0.55rem] tracking-wider text-muted-foreground opacity-30">────────────────────────────────────────</span>
            <span className="font-label text-[0.55rem] tracking-wider text-muted-foreground">2026</span>
          </div>
        </div>

        {/* Fixed tooltip — rendered outside SVG so it's never clipped */}
        {tooltip && (
          <div
            style={{
              position: "fixed",
              left: tooltip.x,
              top: tooltip.y - 8,
              transform: "translate(-50%, -100%)",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <div
              className="rounded-lg border p-3 shadow-2xl min-w-[160px]"
              style={{
                background: "hsl(240 24% 10%)",
                borderColor: tooltip.station.winner ? "#FFBE00" : tooltip.station.leadership ? LEADERSHIP_COLOR : "hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {tooltip.station.winner && <Trophy size={10} color="#FFBE00" />}
                {tooltip.station.leadership && <span style={{ color: LEADERSHIP_COLOR, fontSize: 10 }}>★</span>}
                <span className="font-display text-[11px] font-bold text-white">{tooltip.station.name}</span>
              </div>
              <span className="font-label text-[9px] text-[#7D8590] block mb-1">{tooltip.station.year}</span>
              {tooltip.station.winner && (
                <span className="font-label text-[9px] block mb-1" style={{ color: "#FFBE00" }}>HackASU 2026 Winner</span>
              )}
              {tooltip.station.metric && (
                <span className="font-code text-[10px] block mb-2" style={{ color: tooltip.station.leadership ? LEADERSHIP_COLOR : "hsl(var(--teal))" }}>{tooltip.station.metric}</span>
              )}
              <div className="flex flex-wrap gap-1">
                {tooltip.station.tech.slice(0, 3).map(t => (
                  <span key={t} className="font-code text-[8px] px-1.5 py-0.5 rounded" style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-3">
          {STATIONS.map((station, i) => (
            <motion.div
              key={station.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="rounded-lg border border-border p-4"
              style={{ background: "hsl(var(--surface))" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {station.leadership
                      ? <span style={{ color: LEADERSHIP_COLOR }}>★</span>
                      : station.tracks.map(t => (
                          <div key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TRACK_COLORS[t] }} />
                        ))
                    }
                    <span className="font-display text-sm font-bold text-foreground">{station.name}</span>
                    {station.winner && <Trophy size={12} color="#FFBE00" />}
                  </div>
                  <p className="font-body text-xs text-muted-foreground">{station.details}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {station.tech.map(t => (
                      <span key={t} className="font-code text-[0.55rem] px-1.5 py-0.5 rounded bg-terminal/60 text-green/80">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-label text-[0.55rem] text-muted-foreground block">{station.year}</span>
                  {station.metric && <span className="font-display text-sm font-bold text-amber">{station.metric}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-8 justify-center">
          {LEGEND.map(item => (
            <div key={item.key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: TRACK_COLORS[item.key] }} />
              <span className="font-label text-[0.6rem] tracking-wider text-muted-foreground">{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span style={{ color: LEADERSHIP_COLOR, fontSize: 12 }}>★</span>
            <span className="font-label text-[0.6rem] tracking-wider text-muted-foreground">Leadership</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
