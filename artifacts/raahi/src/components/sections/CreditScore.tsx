import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView.current) {
        inView.current = true;
        const controls = animate(0, target, {
          duration,
          ease: "easeOut",
          onUpdate: (v) => setCount(Math.round(v)),
        });
        stopRef.current = () => controls.stop();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      stopRef.current?.();
    };
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function ScoreArc({ score }: { score: number }) {
  const radius = 90;
  const circumference = Math.PI * radius; // semicircle
  const progress = (score / 850) * circumference;

  return (
    <svg width="240" height="140" viewBox="0 0 240 140">
      {/* Track */}
      <path
        d={`M 20 120 A ${radius} ${radius} 0 0 1 220 120`}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Progress */}
      <motion.path
        d={`M 20 120 A ${radius} ${radius} 0 0 1 220 120`}
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${circumference}`}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: circumference - progress }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
      />
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8621A" />
          <stop offset="100%" stopColor="#FF9040" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const levels = [
  { range: "0–300", label: "At Risk", color: "#ef4444" },
  { range: "301–550", label: "Fair", color: "#f59e0b" },
  { range: "551–700", label: "Good", color: "#E8621A" },
  { range: "701–850", label: "Excellent", color: "#34d399" },
];

export function CreditScore() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Orange haze */}
      <div
        className="absolute -bottom-20 right-0 w-[500px] h-[400px] blur-[100px] pointer-events-none"
        style={{ background: "rgba(232,98,26,0.07)" }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Score visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Arc meter */}
            <div className="relative">
              <ScoreArc score={742} />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <div
                  className="font-display font-black text-5xl text-white"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  <AnimatedCounter target={742} duration={1.8} />
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  / 850
                </div>
                <div
                  className="font-mono text-xs tracking-widest uppercase mt-1"
                  style={{ color: "#34d399" }}
                >
                  Excellent
                </div>
              </div>
            </div>

            {/* Level bars */}
            <div className="grid grid-cols-4 gap-2 w-full mt-6 max-w-xs">
              {levels.map((l, i) => (
                <div key={i} className="text-center">
                  <div
                    className="h-1 rounded-full mb-2"
                    style={{ background: l.color, opacity: i === 3 ? 1 : 0.35 }}
                  />
                  <div className="font-mono text-[9px] tracking-wide" style={{ color: l.color, opacity: i === 3 ? 1 : 0.5 }}>
                    {l.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Score breakdown */}
            <div className="mt-8 w-full max-w-xs space-y-3">
              {[
                { label: "GST Compliance", value: 95, w: "95%" },
                { label: "Labour Filings", value: 88, w: "88%" },
                { label: "License Coverage", value: 82, w: "82%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: "#E8621A" }}>{item.value}%</span>
                  </div>
                  <div className="h-[2px]" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      className="h-full"
                      style={{ background: "linear-gradient(90deg, #E8621A, #FF9040)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: item.w }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <div className="label-tag mb-5">Unique Feature</div>
            <h2
              className="display-heading text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
            >
              YOUR COMPLIANCE<br />
              <span className="text-gradient">CREDIT SCORE.</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "380px" }}>
              The world's first regulatory health score for Indian businesses. Banks check it. Investors check it. Now you can build it.
            </p>

            <div className="space-y-5">
              {[
                ["Real-time score updates", "Recalculated every time you complete a task"],
                ["Bank & investor ready", "Verified by leading financial institutions"],
                ["Actionable breakdown", "Know exactly what to improve and how"],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-4">
                  <div
                    className="mt-1 w-3 h-3 shrink-0"
                    style={{ border: "1px solid rgba(232,98,26,0.5)", background: "rgba(232,98,26,0.08)" }}
                  />
                  <div>
                    <div className="font-display font-bold text-sm text-white uppercase tracking-wide">{title}</div>
                    <div className="font-sans text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
