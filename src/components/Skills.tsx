import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillNode {
  name: string;
  track: "green" | "purple" | "amber" | "blue";
}

interface SkillLayer {
  label: string;
  items: SkillNode[];
}

const LAYERS: SkillLayer[] = [
  {
    label: "LANGUAGES",
    items: [
      { name: "Java", track: "green" }, { name: "Python", track: "purple" },
      { name: "C#", track: "green" }, { name: "C++", track: "green" },
      { name: "JavaScript", track: "blue" }, { name: "TypeScript", track: "blue" },
      { name: "SQL", track: "amber" }, { name: "R", track: "amber" },
    ],
  },
  {
    label: "FRAMEWORKS",
    items: [
      { name: "Spring Boot", track: "green" }, { name: ".NET", track: "green" },
      { name: "FastAPI", track: "green" }, { name: "React", track: "blue" },
      { name: "Next.js", track: "blue" }, { name: "Node.js", track: "green" },
      { name: "Express.js", track: "green" }, { name: "NumPy", track: "amber" },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "Claude Sonnet 4.6", track: "purple" }, { name: "Claude Haiku", track: "purple" }, { name: "Multi-model Pipeline", track: "purple" }, { name: "Gemini", track: "purple" },
      { name: "MediaPipe", track: "purple" }, { name: "TinyFish Agents", track: "purple" },
      { name: "Computer Vision", track: "purple" }, { name: "TensorFlow", track: "purple" },
      { name: "PyTorch", track: "purple" }, { name: "scikit-learn", track: "purple" },
      { name: "Prompt Engineering", track: "purple" }, { name: "RAG", track: "purple" },
      { name: "NLP", track: "purple" }, { name: "Zustand", track: "blue" },
    ],
  },
  {
    label: "DATA & STORAGE",
    items: [
      { name: "PostgreSQL", track: "amber" }, { name: "MongoDB", track: "amber" },
      { name: "Firebase", track: "amber" }, { name: "Pandas", track: "amber" },
      { name: "SQL Analytics", track: "amber" }, { name: "Tableau", track: "amber" },
      { name: "Excel", track: "amber" },
    ],
  },
  {
    label: "INFRASTRUCTURE",
    items: [
      { name: "Docker", track: "green" }, { name: "AWS", track: "green" },
      { name: "Vercel", track: "blue" }, { name: "Mapbox", track: "blue" },
      { name: "Resend", track: "green" }, { name: "InsForge", track: "green" }, { name: "WebSockets", track: "green" },
      { name: "Microsoft Graph API", track: "green" }, { name: "Railway", track: "green" },
      { name: "Databutton", track: "blue" },
    ],
  },
];

const TRACK_COLORS: Record<string, string> = {
  green: "#3FB950",
  purple: "#BC8CFF",
  amber: "#FFBE00",
  blue: "#58A6FF",
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="font-label text-[0.65rem] tracking-[0.2em] text-muted-foreground mb-3">THE STACK</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Technologies. Connected by context.</h2>
        <p className="font-body text-sm text-muted-foreground mb-12">Every edge is a project. Every node earned.</p>

        <div ref={ref} className="space-y-6">
          {LAYERS.map((layer, layerIdx) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: layerIdx * 0.15 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="font-label text-[0.6rem] tracking-[0.2em] text-muted-foreground w-28 shrink-0">
                  {layer.label}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="flex flex-wrap gap-2 ml-0 md:ml-32">
                {layer.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: layerIdx * 0.15 + i * 0.04, type: "spring", stiffness: 300 }}
                    className="noise-overlay px-4 py-2 rounded-lg border border-border hover:scale-105 transition-transform cursor-default group"
                    style={{ background: "hsl(var(--surface))", borderColor: `${TRACK_COLORS[item.track]}20` }}
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TRACK_COLORS[item.track] }} />
                      <span className="font-code text-sm text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
