import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Database, Users, MapPin, Calendar } from "lucide-react";

interface WorkItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "internship" | "traineeship" | "leadership";
  current?: boolean;
  tech: string[];
  metric: string;
  metricLabel: string;
  metricColor?: string;
  bullets: string[];
}

const WORK: WorkItem[] = [
  {
    company: "Allergy Voyage",
    role: "Software Development Intern",
    period: "Jan 2026 – Present",
    location: "Remote",
    type: "internship",
    current: true,
    tech: ["C#", ".NET", "MongoDB", "Docker", "Microsoft Graph API", "Event-Driven Architecture"],
    metric: "40%",
    metricLabel: "reduction in manual review workflows",
    metricColor: "hsl(var(--amber))",
    bullets: [
      "Engineered scalable C#/.NET backend services supporting 1K+ production records with emphasis on concurrency and data integrity",
      "Designed async event-driven pipelines from 50+ external partners via webhooks and Microsoft Graph API, reducing manual review by 40%",
      "Implemented human-in-the-loop review systems and rule-based safeguards for responsible AI usage in production",
      "Containerized services with Docker and deployed in Linux-based cloud environments",
    ],
  },
  {
    company: "MPC Cloud Pvt. Ltd.",
    role: "Software Engineer Intern",
    period: "May 2025 – Aug 2025",
    location: "Gurugram, India",
    type: "internship",
    tech: ["Java", "Spring Boot", "PostgreSQL", "JUnit", "CI/CD", "Agile"],
    metric: "25%",
    metricLabel: "improvement in backend reliability",
    metricColor: "hsl(var(--amber))",
    bullets: [
      "Developed 5+ RESTful microservices using Java and Spring Boot handling high-volume concurrent ticketing workflows",
      "Implemented transactional seat-booking logic ensuring data consistency under concurrent requests",
      "Optimized PostgreSQL queries and indexing strategies improving reliability by 25%",
      "Contributed to Agile CI/CD pipelines with JUnit unit testing and peer code reviews",
    ],
  },
  {
    company: "Arizona State University",
    role: "ASU 101 Section Leader (Undergraduate TA)",
    period: "Aug 2024 – Dec 2025",
    location: "Tempe, AZ",
    type: "leadership",
    tech: [],
    metric: "200+",
    metricLabel: "first-year students mentored",
    metricColor: "hsl(var(--primary))",
    bullets: [
      "Mentored 200+ first-year CS students in academic planning, course selection, and university transition",
      "Led structured weekly sessions on study skills, campus resources, and professional development",
      "Served as primary point of contact connecting students with appropriate university support",
    ],
  },
  {
    company: "The Global Tech Experience",
    role: "SQL & Python Data Analyst Trainee",
    period: "Jan 2024 – Apr 2024",
    location: "Remote",
    type: "traineeship",
    tech: ["SQL", "Python", "Pandas", "NumPy", "Tableau", "Excel", "EDA"],
    metric: "100K+",
    metricLabel: "records analyzed — Grammy & Intel datasets",
    metricColor: "hsl(var(--amber))",
    bullets: [
      "Analyzed 100K+ record datasets using SQL and Python applying EDA and statistical techniques to derive actionable insights",
      "Worked on Intel Sustainability Analytics — curated environmental datasets and built regression models forecasting emissions trends",
      "Analyzed Grammy Awards data identifying multi-decade trends across large structured sets",
      "Built Tableau dashboards communicating model predictions and sustainability insights",
    ],
  },
];

const TYPE_CONFIG = {
  internship: { icon: <Briefcase size={12} />, label: "Internship", color: "hsl(var(--muted-foreground))" },
  traineeship: { icon: <Database size={12} />, label: "Traineeship", color: "hsl(var(--muted-foreground))" },
  leadership: { icon: <Users size={12} />, label: "Leadership", color: "hsl(var(--teal))" },
};

const WorkCard = ({ item, index }: { item: WorkItem; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const typeConf = TYPE_CONFIG[item.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="rounded-2xl border border-border p-8 relative"
      style={{ background: "hsl(var(--surface))" }}
    >
      {/* CURRENT badge */}
      {item.current && (
        <div className="absolute top-6 right-6 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full status-dot" style={{ backgroundColor: "hsl(var(--teal))" }} />
          <span className="font-label text-[0.55rem] tracking-wider" style={{ color: "hsl(var(--teal))" }}>CURRENT</span>
        </div>
      )}

      {/* Header row */}
      <div className="flex flex-wrap items-start gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl font-bold text-foreground mb-0.5">{item.company}</h3>
          <p className="font-body text-sm text-muted-foreground">{item.role}</p>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        {/* Type badge */}
        <span
          className="flex items-center gap-1.5 font-label text-[0.6rem] tracking-wider px-2.5 py-1 rounded-full border"
          style={{
            color: typeConf.color,
            borderColor: item.type === "leadership" ? "hsl(var(--teal) / 0.4)" : "hsl(var(--border))",
            background: item.type === "leadership" ? "hsl(var(--teal) / 0.08)" : "transparent",
          }}
        >
          {typeConf.icon}
          {typeConf.label}
        </span>

        <span className="flex items-center gap-1 font-label text-[0.6rem] text-muted-foreground">
          <Calendar size={11} />
          {item.period}
        </span>

        <span className="flex items-center gap-1 font-label text-[0.6rem] text-muted-foreground">
          <MapPin size={11} />
          {item.location}
        </span>
      </div>

      {/* Tech pills */}
      {item.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {item.tech.map(t => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
      )}

      {/* Metric */}
      <div className="mb-5">
        <span className="font-display text-4xl font-extrabold" style={{ color: item.metricColor }}>
          {item.metric}
        </span>
        <span className="font-body text-sm text-muted-foreground ml-2">{item.metricLabel}</span>
      </div>

      {/* Bullets */}
      <ul className="space-y-2">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-3 font-body text-sm text-muted-foreground leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "hsl(var(--primary))", marginTop: "0.45rem" }} />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const WorkExperience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-label text-[0.65rem] tracking-[0.2em] text-muted-foreground mb-3">WORK EXPERIENCE</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Where I've shipped.</h2>
          <p className="font-body text-sm text-muted-foreground mb-12">Real companies. Real code. Real impact.</p>
        </motion.div>

        <div className="space-y-6">
          {WORK.map((item, i) => (
            <WorkCard key={item.company + item.role} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
