import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground, GridOverlay } from "@/components/ui/ambient";
import { HashScroll } from "@/components/ui/hash-scroll";
import { HeroSection } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/Projects";
import { ProcessSection } from "@/components/sections/Process";
import { ParadigmSection } from "@/components/sections/Paradigm";
import { ContactSection } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <HashScroll />
      <AmbientBackground />
      <GridOverlay />
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ProcessSection />
        <ParadigmSection />
      </main>
      <div className="relative overflow-hidden border-t border-[var(--glass-border-sm)] bg-[var(--glass-bg-sm)] shadow-[0_-12px_48px_rgba(0,0,0,0.05)] backdrop-blur-[24px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
        />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
