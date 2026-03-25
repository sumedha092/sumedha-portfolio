import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const COURSES = [
  "Data Structures & Algorithms", "Operating Systems", "Distributed Systems",
  "Database Systems", "Machine Learning", "Computer Networks",
];

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="noise-overlay rounded-2xl border border-border p-8 md:p-12 hover:shadow-xl transition-shadow"
          style={{ background: "hsl(var(--surface))" }}
        >
          <div className="relative z-10 grid md:grid-cols-[auto_1fr_1fr] gap-8 items-center">
            <div className="font-display text-7xl font-extrabold text-primary/20">A</div>

            <div>
              <p className="font-label text-[0.6rem] tracking-[0.2em] text-muted-foreground mb-2">EDUCATION</p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">ARIZONA STATE UNIVERSITY</h3>
              <p className="font-body text-sm text-muted-foreground mb-3">B.S. Computer Science</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="font-label text-[0.6rem] tracking-wider px-3 py-1 rounded-full border border-primary/30 text-primary">Expected May 2027</span>
                <span className="font-label text-[0.6rem] tracking-wider px-3 py-1 rounded-full border border-teal/30 text-teal">Dean's List · All Semesters</span>
              </div>
              <span className="font-display text-5xl font-extrabold text-amber">4.0<span className="text-xl text-muted-foreground font-body"> / 4.0</span></span>
            </div>

            <div>
              <p className="font-label text-[0.6rem] tracking-[0.2em] text-muted-foreground mb-3">KEY COURSEWORK</p>
              <div className="flex flex-wrap gap-2">
                {COURSES.map(course => (
                  <span key={course} className="font-code text-[0.65rem] px-3 py-1.5 rounded-md bg-terminal/10 border border-border text-foreground">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
