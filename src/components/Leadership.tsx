import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Users, Wrench, BarChart2 } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  {
    icon: <BookOpen size={32} color="hsl(var(--primary))" />,
    value: "200+",
    numericValue: 200,
    suffix: "+",
    label: "Students mentored — ASU 101 Section Leader",
  },
  {
    icon: <Users size={32} color="hsl(var(--primary))" />,
    value: "20+",
    numericValue: 20,
    suffix: "+",
    label: "WiCS mentees — career & technical guidance",
  },
  {
    icon: <Wrench size={32} color="hsl(var(--primary))" />,
    value: "∞",
    label: "GDSC backend workshops & hackathons led",
  },
  {
    icon: <BarChart2 size={32} color="hsl(var(--primary))" />,
    value: "100K+",
    label: "Records analyzed — Grammy + Intel EDA",
  },
];

const CountUp = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = 1500 / target;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{count}{suffix}</>;
};

const Leadership = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="leadership" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="font-label text-[0.65rem] tracking-[0.2em] text-muted-foreground mb-3">LEADERSHIP & IMPACT</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">The best engineers also teach.</h2>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="noise-overlay rounded-xl border border-border p-6 text-center"
              style={{ background: "hsl(var(--surface))" }}
            >
              <div className="relative z-10">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <span className="font-display text-3xl md:text-4xl font-extrabold text-primary block mb-2">
                  {stat.numericValue ? (
                    <CountUp target={stat.numericValue} suffix={stat.suffix || ""} inView={inView} />
                  ) : stat.value}
                </span>
                <span className="font-body text-xs text-muted-foreground">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
