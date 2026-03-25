import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";

interface Project {
  name: string;
  tagline: string;
  stack: string[];
  metric: string;
  metricLabel?: string;
  links: { label: string; url: string }[];
  featured?: boolean;
  winner?: boolean;
  badge?: string;
  subMetrics?: string;
}

const PROJECTS: Project[] = [
  {
    name: "CIVILIAN",
    tagline: "Multi-model Claude pipeline — classifies complaints, finds real officials via web_search, generates formal letters, moderates & translates 70+ languages, autonomously follows up via TinyFish agents",
    stack: ["Next.js", "Claude Sonnet 4.6", "Claude Haiku", "Claude Vision", "TinyFish", "Mapbox GL", "InsForge", "Resend", "Framer Motion"],
    metric: "70+",
    metricLabel: "languages supported",
    featured: true,
    winner: true,
    badge: "HackASU 2026 — Governance Track Winner",
    subMetrics: "9 API routes · 7-day AI follow-up · Real officials · Real ordinances",
    links: [
      { label: "Live Demo ↗", url: "https://civic-app-nine.vercel.app" },
      { label: "GitHub ↗", url: "https://github.com/sgupt354/ClaudeHacks" },
    ],
  },
  {
    name: "AITHENA",
    tagline: "AI-powered study partner matching in real time",
    stack: ["React", "FastAPI", "Firebase", "WebSockets", "Python", "Gemini API"],
    metric: "100+",
    metricLabel: "concurrent users",
    links: [{ label: "GitHub ↗", url: "https://github.com/Aaxhirrr/Aithena" }],
  },
  {
    name: "BREATHEPULSE",
    tagline: "Computer vision that detects fatigue before burnout hits",
    stack: ["MediaPipe", "FastAPI", "Python", "RL", "React", "TypeScript"],
    metric: "<1s",
    metricLabel: "response · 30+ FPS",
    links: [
      { label: "GitHub ↗", url: "https://github.com/sumedha092/breathe-pulse" },
    ],
  },
  {
    name: "STUDYMAP",
    tagline: "Adaptive quizzes powered by Claude that learn how you learn",
    stack: ["React", "TypeScript", "Claude Haiku API", "Vite", "Recharts", "Zustand"],
    metric: "20+",
    metricLabel: "topics tracked per course",
    links: [{ label: "GitHub ↗", url: "https://github.com/anasm266/studymap" }],
  },
  {
    name: "SKILLIFY",
    tagline: "Skill-sharing marketplace with live request lifecycle management",
    stack: ["Next.js", "Node.js", "Express", "MongoDB Atlas", "Firebase"],
    metric: "Real-time",
    metricLabel: "state transitions",
    links: [{ label: "GitHub ↗", url: "https://github.com/sumedha092/SunHacks2024" }],
  },
  {
    name: "FINANCE CHATBOT",
    tagline: "Conversational AI for financial query resolution",
    stack: ["Python", "NLP", "REST APIs", "OpenAI"],
    metric: "NLP",
    metricLabel: "powered",
    links: [{ label: "GitHub ↗", url: "https://github.com/sumedha092/Financial-Chatbot" }],
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`noise-overlay rounded-xl border border-border overflow-hidden group transition-colors relative ${
        project.featured ? "md:col-span-2" : ""
      }`}
      style={{ background: "hsl(var(--surface))" }}
    >
      {/* Winner animated gradient bg */}
      {project.winner && (
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #FFBE00, #FF8C42, #00F0C8, #FFBE00)",
            backgroundSize: "300% 300%",
            animation: "shimmer-bg 6s ease infinite",
          }}
        />
      )}

      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full min-h-[320px]">
        {/* Badge */}
        {project.badge && (
          <div className="mb-4 flex items-center gap-1.5">
            <Trophy size={13} color="#FFBE00" />
            <span className="shimmer font-label text-[0.65rem] tracking-wider font-bold">{project.badge}</span>
          </div>
        )}

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map(tech => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>

        {/* Name & tagline */}
        <h3 className={`font-display text-2xl md:text-3xl font-bold text-foreground mb-2 transition-colors ${
          project.winner ? "group-hover:text-amber" : "group-hover:text-primary"
        }`}>
          {project.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-3 max-w-md">{project.tagline}</p>

        {project.subMetrics && (
          <p className="font-code text-[0.65rem] text-muted-foreground mb-3">{project.subMetrics}</p>
        )}

        <div className="mt-auto">
          <div className="mb-5">
            <span className="font-display text-4xl font-extrabold text-amber">{project.metric}</span>
            {project.metricLabel && (
              <span className="font-body text-sm text-muted-foreground ml-2">{project.metricLabel}</span>
            )}
          </div>

          {project.links.length > 0 && (
            <div className="flex gap-3">
              {project.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-label text-[0.65rem] tracking-wider px-4 py-2 rounded-full border border-border text-foreground transition-colors ${
                    project.winner ? "hover:border-amber hover:text-amber" : "hover:border-primary hover:text-primary"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Winner amber border glow */}
      {project.winner && (
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-amber/50 transition-colors pointer-events-none" />
      )}
    </motion.div>
  );
};

const Projects = () => (
  <section id="projects" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <p className="font-label text-[0.65rem] tracking-[0.2em] text-muted-foreground mb-3">PROJECTS</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Built. Shipped. Proven.</h2>
      <p className="font-body text-sm text-muted-foreground mb-12">Every project solves a real problem.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
