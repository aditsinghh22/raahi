import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { num: "01", title: "Compliance Map", desc: "Tell us about your business. We tell you exactly what you legally need — state by state.", tag: "Foundation" },
  { num: "02", title: "Financial Engine", desc: "GST, MCA, TDS — auto-tracked. Never miss a deadline or pay an avoidable penalty.", tag: "Core" },
  { num: "03", title: "Labour & HR", desc: "PF, ESIC, Professional Tax — fully automated for your headcount and location.", tag: "Core" },
  { num: "04", title: "License Manager", desc: "Industry-aware, state-specific license tracking. The piece nobody else built.", tag: "Differentiator" },
  { num: "05", title: "Schemes Finder", desc: "Billions in unclaimed government subsidies. We surface every rupee you qualify for.", tag: "Unique" },
  { num: "06", title: "Credit Score", desc: "Your compliance health score — the metric that makes investors and banks trust you.", tag: "Unique" },
  { num: "07", title: "Document Engine", desc: "Founders agreements, NDAs, Privacy Policies — AI-filled in under 5 minutes.", tag: "Core" },
  { num: "08", title: "Alert Center", desc: "Smart push alerts via WhatsApp, SMS & Email weeks before any deadline hits.", tag: "Core" },
];

const tagColors: Record<string, string> = {
  Foundation: "#E8621A",
  Core: "#FF9040",
  Differentiator: "#FF6800",
  Unique: "#FFB060",
};

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glow: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: dy * -8, y: dx * 8, glow: true });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0, glow: false });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.glow ? "transform 0.1s ease" : "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        background: tilt.glow ? "rgba(232,98,26,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${tilt.glow ? "rgba(232,98,26,0.3)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: tilt.glow ? "0 20px 60px -15px rgba(232,98,26,0.2)" : "none",
        cursor: "default",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner bracket top-left */}
      <div style={{ position: "absolute", top: 8, left: 8, width: 14, height: 14, borderTop: "1px solid rgba(232,98,26,0.4)", borderLeft: "1px solid rgba(232,98,26,0.4)" }} />
      {/* Corner bracket bottom-right */}
      <div style={{ position: "absolute", bottom: 8, right: 8, width: 14, height: 14, borderBottom: "1px solid rgba(232,98,26,0.4)", borderRight: "1px solid rgba(232,98,26,0.4)" }} />

      {/* Number + tag row */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs" style={{ color: "rgba(232,98,26,0.6)" }}>{pillar.num}</span>
        <span
          className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5"
          style={{ color: tagColors[pillar.tag], border: `1px solid ${tagColors[pillar.tag]}33` }}
        >
          {pillar.tag}
        </span>
      </div>

      <h3
        className="font-display font-black text-white mb-3 uppercase"
        style={{ fontSize: "1.05rem", letterSpacing: "0.02em" }}
      >
        {pillar.title}
      </h3>
      <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
        {pillar.desc}
      </p>
    </motion.div>
  );
}

export function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
          duration: 1.1,
          ease: "power4.out",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-32 relative overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Big ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none blur-[120px]"
        style={{ background: "rgba(232,98,26,0.04)" }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="label-tag mb-5">8 Core Pillars</div>
            <h2
              ref={titleRef}
              className="display-heading text-white"
              style={{
                fontSize: "clamp(2.8rem, 5vw, 5rem)",
                clipPath: "inset(100% 0% 0% 0%)",
                opacity: 0,
              }}
            >
              EVERYTHING<br />YOUR BUSINESS<br />NEEDS.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "400px" }}>
              Eight foundational pillars engineered into a single, intelligent platform. Enterprise-grade operations for every Indian startup.
            </p>
          </div>
        </div>

        {/* 4-column grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
