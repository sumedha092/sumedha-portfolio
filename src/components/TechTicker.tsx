import { useState } from "react";

const ROW1 = ["JAVA", "PYTHON", "C#", "JAVASCRIPT", "TYPESCRIPT", "SPRING BOOT", "FASTAPI", "REACT", "NEXT.JS", "NODE.JS", "DOCKER", "AWS", "CLAUDE API", "GEMINI"];
const ROW2 = ["POSTGRESQL", "MONGODB", "FIREBASE", "MEDIAPIPE", "WEBSOCKETS", "MAPBOX GL", "TINYFISH AGENTS", "RESEND", "TAILWINDCSS", "FRAMER MOTION", "GSAP"];

const TickerRow = ({
  items,
  direction,
  paused,
}: {
  items: string[];
  direction: "left" | "right";
  paused: boolean;
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={direction === "left" ? "marquee-left" : "marquee-right"}
        style={{
          display: "flex",
          width: "max-content",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 px-3 shrink-0">
            <span className="font-label text-[0.6rem] tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors cursor-default">
              {item}
            </span>
            <span className="text-[8px]" style={{ color: "hsl(var(--teal))" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const TechTicker = () => {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="py-3 border-y border-border overflow-hidden"
      style={{ background: "hsl(var(--surface) / 0.8)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <TickerRow items={ROW1} direction="left" paused={paused} />
      <div className="h-2" />
      <TickerRow items={ROW2} direction="right" paused={paused} />
    </div>
  );
};

export default TechTicker;
