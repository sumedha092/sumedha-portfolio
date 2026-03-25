import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const STATUS_ROWS = [
  { label: "STATUS", value: "● ACTIVE", dot: true },
  { label: "LOCATION", value: "Tempe, AZ" },
  { label: "STUDYING", value: "Computer Science" },
  { label: "SEEKING", value: "AI SDE / AI Ops / SWE Internships" },
  { label: "GPA", value: "4.0 / 4.0" },
];

const INTERESTS = [
  { tag: "AI/ML", desc: "Building intelligent systems that learn and adapt" },
  { tag: "Backend Systems", desc: "Distributed services, APIs, microservices" },
  { tag: "Data Analysis", desc: "SQL, Pandas, large-scale EDA and insights" },
  { tag: "Real-time Architecture", desc: "WebSockets, event-driven systems" },
  { tag: "Civic Tech", desc: "Technology that empowers communities" },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  return (
    <section id="about" className="py-24 px-6">
      <div ref={ref} className="max-w-7xl mx-auto grid md:grid-cols-[45fr_55fr] gap-12 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Profile photo with decorative offset border */}
          <div
            className="photo-frame relative mx-auto mb-8"
            style={{ width: "clamp(220px, 100%, 340px)" }}
          >
            {/* Decorative teal border offset behind photo */}
            <div className="photo-frame-border absolute rounded-[20px] border-2 border-primary" />
            {/* Photo */}
            <img
              src="/images/sumedha_headshot.jpeg"
              alt="Sumedha Gupta"
              className="photo-img relative block w-full rounded-[20px] object-cover object-top"
              style={{ aspectRatio: "3/4", zIndex: 1 }}
            />
          </div>

          {/* Status card */}
          <div className="rounded-lg border border-border overflow-hidden" style={{ background: "hsl(var(--terminal))" }}>
            <div className="px-4 py-2 border-b border-foreground/5">
              <span className="font-code text-[10px] text-[#7D8590]">status.sh</span>
            </div>
            <div className="p-4 space-y-1.5">
              {STATUS_ROWS.map(row => (
                <div key={row.label} className="flex gap-4 font-code text-[12px]">
                  <span className="text-[#7D8590] w-20 shrink-0">{row.label}</span>
                  <span className={row.dot ? "text-green" : "text-primary-foreground/90"}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-label text-[0.65rem] tracking-[0.2em] text-muted-foreground mb-3">ABOUT</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            I build systems that work<br />in the real world.
          </h2>

          <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
            <p>
              Hi, I'm Sumedha — a junior at ASU studying CS with a 4.0 GPA, building production AI pipelines — multi-model Claude architectures, autonomous agent systems, and full-stack products that reach real users. Currently shipping backend systems,
              AI products, and data pipelines.
            </p>
            <p>
              I'm drawn to problems with real stakes: helping people file civic complaints that actually reach
              officials, detecting developer fatigue before burnout hits, connecting students who study better
              together. I care about systems that scale, code that is clean, and products people actually use.
            </p>
            <p>
              When I'm not building: I mentor 200+ first-year students as an ASU Section Leader and run backend
              workshops at Google DSC. I believe the best engineers also teach.
            </p>
          </div>

          {/* Interest tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {INTERESTS.map(interest => (
              <div
                key={interest.tag}
                className="relative"
                onMouseEnter={() => setHoveredTag(interest.tag)}
                onMouseLeave={() => setHoveredTag(null)}
              >
                <span className="font-label text-[0.6rem] tracking-wider px-3 py-1.5 rounded-full border border-border bg-surface text-foreground cursor-default hover:border-primary hover:text-primary transition-colors">
                  {interest.tag}
                </span>
                {hoveredTag === interest.tag && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-30 bottom-full mb-2 left-0 px-3 py-2 rounded-md bg-terminal text-primary-foreground/80 text-[11px] font-code whitespace-nowrap shadow-xl"
                  >
                    {interest.desc}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
