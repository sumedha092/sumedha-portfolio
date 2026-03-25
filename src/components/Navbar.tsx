import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const NAV_LINKS = [
  { label: "ABOUT",    href: "#about" },
  { label: "WORK",     href: "#work" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS",   href: "#skills" },
  { label: "CONTACT",  href: "#contact" },
];

// Section ids to watch for active highlighting
const SECTION_IDS = ["about", "work", "projects", "skills", "contact"];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId]     = useState("");
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add("dark");    localStorage.setItem("theme", "dark"); }
    else       { root.classList.remove("dark"); localStorage.setItem("theme", "light"); }
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section: find the last section whose top is above 40% of viewport
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "bg-surface/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-2xl font-extrabold text-primary hover:rotate-[360deg] transition-transform duration-500"
          >
            SG
          </a>

          {/* Center nav — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const id = link.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-label text-[0.7rem] tracking-[0.15em] transition-colors relative group"
                  style={{ color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-200 origin-left"
                    style={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
                  />
                  {/* hover underline for non-active */}
                  {!isActive && (
                    <span className="absolute -bottom-0.5 left-0 h-px bg-primary w-0 group-hover:w-full transition-all duration-200 origin-left" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDark(d => !d)}
              className="flex items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-colors"
              style={{ width: 36, height: 36, background: "hsl(var(--surface))", cursor: "pointer" }}
              aria-label="Toggle theme"
            >
              {dark
                ? <Sun size={15} className="text-muted-foreground" />
                : <Moon size={15} className="text-muted-foreground" />
              }
            </button>

            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-label text-[0.7rem] tracking-wider border border-border rounded-full px-4 py-1.5 text-muted-foreground hover:text-primary hover:border-primary transition-colors">
              RESUME ↗
            </a>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green status-dot" />
              <span className="font-label text-[0.6rem] tracking-wider text-muted-foreground">OPEN TO INTERNSHIPS 2026</span>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setDark(d => !d)}
              className="flex items-center justify-center rounded-full border border-border"
              style={{ width: 32, height: 32, background: "hsl(var(--surface))" }}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={13} className="text-muted-foreground" /> : <Moon size={13} className="text-muted-foreground" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Menu">
              <span className={`block w-5 h-0.5 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 font-display text-2xl text-muted-foreground hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              ×
            </button>
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-bold text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
