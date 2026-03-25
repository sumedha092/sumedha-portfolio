import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import TechTicker from "@/components/TechTicker";
import Leadership from "@/components/Leadership";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import GradientBackground from "@/components/GradientBackground";
import FloatingGlyphs from "@/components/FloatingGlyphs";

const Index = () => {
  useEffect(() => {
    // Console easter egg
    console.log(
      "%c  ____   ____ \n / ___| / ___|\n \\___ \\| |  _ \n  ___) | |_| |\n |____/ \\____|\n",
      "color: #0066FF; font-weight: bold; font-size: 14px;"
    );
    console.log(
      "%c👋 Hey devtools explorer.\nThe terminal in the background is running real code from my projects.\nsgupt354@asu.edu",
      "color: #22C55E; font-size: 12px;"
    );

    // Tab title change
    const originalTitle = "Sumedha Gupta — Software Engineer";
    document.title = originalTitle;
    const handleVisibility = () => {
      document.title = document.hidden ? "Come back! 👀 — Sumedha Gupta" : originalTitle;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div className="text-foreground min-h-screen relative" style={{ background: "transparent" }}>
      <GradientBackground />
      <FloatingGlyphs />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <WorkExperience />
      <Experience />
      <Projects />
      <Skills />
      <TechTicker />
      <Leadership />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
