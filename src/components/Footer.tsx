import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

const NAV_LINKS = ["About", "Work", "Projects", "Skills", "Contact"];

const Footer = () => {
  const [tempeTime, setTempeTime] = useState("");
  const [copied, setCopied] = useState(false);

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
    <footer className="border-t border-border px-6" style={{ background: "hsl(var(--background))", paddingTop: "48px", paddingBottom: "32px" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left */}
        <div>
          <span className="font-display text-3xl font-extrabold text-primary">SG</span>
          <p className="font-body text-sm text-muted-foreground mt-2">Sumedha Gupta</p>
          <p className="font-body text-xs text-muted-foreground">CS @ Arizona State University · 2027</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2 h-2 rounded-full status-dot" style={{ backgroundColor: "#3FB950" }} />
            <span className="font-label text-[0.55rem] tracking-wider text-muted-foreground">OPEN TO INTERNSHIPS 2026</span>
          </div>
        </div>

        {/* Center */}
        <div>
          <p className="font-label text-[0.6rem] tracking-[0.2em] text-muted-foreground mb-3">NAVIGATE</p>
          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors w-fit" style={{ transitionDuration: "150ms" }}>
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <p className="font-label text-[0.6rem] tracking-[0.2em] text-muted-foreground mb-3">CONNECT</p>
          <div className="flex flex-col gap-2">
            <button onClick={copyEmail} className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors group text-left">
              <Mail size={14} className="shrink-0" />
              <span>sgupt354@asu.edu</span>
              <span className="font-label text-[0.5rem] ml-1 text-muted-foreground group-hover:text-primary transition-colors">
                {copied ? "Copied! ✓" : ""}
              </span>
              <span className="inline-block group-hover:translate-x-1 transition-transform ml-auto">↗</span>
            </button>
            <a href="https://linkedin.com/in/sumedha092" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors group">
              <Linkedin size={14} className="shrink-0" />
              <span>LinkedIn</span>
              <span className="inline-block group-hover:translate-x-1 transition-transform ml-auto">↗</span>
            </a>
            <a href="https://github.com/sumedha092" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors group">
              <Github size={14} className="shrink-0" />
              <span>GitHub</span>
              <span className="inline-block group-hover:translate-x-1 transition-transform ml-auto">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <span className="font-body text-[0.7rem] text-muted-foreground">Designed & engineered by Sumedha Gupta</span>
        <span className="font-code text-[0.7rem] text-muted-foreground flex items-center gap-1.5">
          <MapPin size={11} />
          {tempeTime} MST
        </span>
        <span className="font-body text-[0.7rem] text-muted-foreground">Built with React · Framer Motion · GSAP</span>
      </div>
    </footer>
  );
};

export default Footer;
