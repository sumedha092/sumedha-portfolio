import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);
  const [tempeTime, setTempeTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTempeTime(new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Phoenix",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("sgupt354@asu.edu");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h2 className="font-display text-[clamp(2rem,7vw,6rem)] font-extrabold leading-none mb-6 px-2" style={{ color: "hsl(var(--foreground))" }}>
            {"LET'S BUILD"}
            <br />
            <span style={{
              backgroundImage: "linear-gradient(135deg, #00F0C8, #58A6FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
              paddingBottom: "0.1em",
            }}>
              SOMETHING.
            </span>
          </h2>

          <p className="font-body text-sm mb-12" style={{ color: "hsl(var(--muted-foreground))" }}>
            Open to SWE · AI/ML · Data · Research roles
          </p>

          <div
            className="inline-block rounded-2xl p-8 backdrop-blur-xl dark:bg-white/5 bg-black/[0.04] dark:border-white/10 border-black/10"
            style={{ position: "relative", zIndex: 20, border: "1px solid" }}
          >
            <div className="space-y-3 text-left">
              <button onClick={copyEmail} className="flex items-center gap-3 font-code text-sm group w-full transition-colors hover:text-primary" style={{ color: "hsl(var(--foreground))" }}>
                <Mail size={15} className="shrink-0 text-muted-foreground" />
                <span>sgupt354@asu.edu</span>
                <span className="font-label text-[0.55rem] ml-auto text-muted-foreground group-hover:text-primary">
                  {copied ? "COPIED ✓" : "CLICK TO COPY"}
                </span>
              </button>
              <a href="https://linkedin.com/in/sumedha092" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-code text-sm transition-colors hover:text-primary" style={{ color: "hsl(var(--foreground))" }}>
                <Linkedin size={15} className="shrink-0 text-muted-foreground" />
                <span>linkedin.com/in/sumedha092</span>
              </a>
              <a href="https://github.com/sumedha092" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-code text-sm transition-colors hover:text-primary" style={{ color: "hsl(var(--foreground))" }}>
                <Github size={15} className="shrink-0 text-muted-foreground" />
                <span>github.com/sumedha092</span>
              </a>
              <div className="flex items-center gap-3 font-code text-sm pt-2 border-t border-border text-muted-foreground">
                <MapPin size={15} className="shrink-0" />
                <span>Tempe, AZ · {tempeTime}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
