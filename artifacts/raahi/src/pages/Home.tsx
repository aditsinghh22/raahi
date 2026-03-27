import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { Pillars } from "@/components/sections/Pillars";
import { ComplianceDemo } from "@/components/sections/ComplianceDemo";
import { CreditScore } from "@/components/sections/CreditScore";
import { Schemes } from "@/components/sections/Schemes";
import { Architecture } from "@/components/sections/Architecture";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Pillars />
        <ComplianceDemo />
        <CreditScore />
        <Schemes />
        <Architecture />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
