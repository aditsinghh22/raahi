import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldAlert, Clock, CheckCircle2, TrendingUp, FileText, BellRing } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { icon: ShieldAlert, title: "GST Registration", status: "Critical", detail: "Due in 7 days", color: "#E8621A", bg: "rgba(232,98,26,0.12)" },
  { icon: Clock, title: "Founders Agreement", status: "In Progress", detail: "AI drafting…", color: "#FF9040", bg: "rgba(255,144,64,0.1)" },
  { icon: CheckCircle2, title: "Udyam Certificate", status: "Complete", detail: "Filed & verified", color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  { icon: TrendingUp, title: "MSME Scheme Claim", status: "Eligible", detail: "₹8,40,000 available", color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  { icon: FileText, title: "NDA — Vendor Co.", status: "Ready", detail: "Awaiting signature", color: "#FF9040", bg: "rgba(255,144,64,0.08)" },
  { icon: BellRing, title: "TDS Filing Alert", status: "Upcoming", detail: "Due in 18 days", color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
];

export function ComplianceDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Auto-cycle through items
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          duration: 0.8,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden section-divider"
      style={{ background: "#060606" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="label-tag mb-5">Platform Demo</div>
            <h2
              className="display-heading text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
            >
              YOUR COMPLIANCE<br />MAP. LIVE.
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "380px" }}>
              Every obligation surfaced. Every deadline tracked. Every document ready. All in one dashboard that learns your business.
            </p>

            <div className="space-y-3 max-w-xs">
              {["Auto-classifies your business type", "State-specific rule mapping", "Real-time deadline alerts"].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 flex items-center justify-center" style={{ border: "1px solid rgba(232,98,26,0.5)" }}>
                    <div className="w-1.5 h-1.5" style={{ background: "#E8621A" }} />
                  </div>
                  <span className="font-mono text-xs tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated dashboard mockup */}
          <div className="relative">
            {/* Glow backdrop */}
            <div
              className="absolute -inset-10 rounded-full blur-[60px] pointer-events-none"
              style={{ background: "rgba(232,98,26,0.08)" }}
            />

            <div
              className="relative"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0c0c0c" }}
            >
              {/* Window bar */}
              <div
                className="flex items-center gap-2 px-5 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                {["#E8621A", "#FF9040", "#34d399"].map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
                <span className="ml-3 font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                  Raahi — Compliance Map
                </span>
              </div>

              {/* Header row */}
              <div
                className="grid grid-cols-3 px-5 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                {["Task", "Status", "Action"].map((h) => (
                  <div key={h} className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {h}
                  </div>
                ))}
              </div>

              {/* Items */}
              <div className="px-5 py-4 space-y-2">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      background: i === active ? "rgba(232,98,26,0.06)" : "transparent",
                      borderColor: i === active ? "rgba(232,98,26,0.25)" : "rgba(255,255,255,0.03)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-3 items-center py-3 px-3 cursor-pointer"
                    style={{ border: "1px solid rgba(255,255,255,0.03)" }}
                    onClick={() => setActive(i)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center" style={{ background: item.bg }}>
                        <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                      </div>
                      <span className="font-sans text-xs text-white/80 font-medium">{item.title}</span>
                    </div>
                    <span
                      className="font-mono text-[10px] tracking-wide"
                      style={{ color: item.color }}
                    >
                      {item.status}
                    </span>
                    <span className="font-sans text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {item.detail}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                  6 of 23 items shown
                </span>
                <div className="flex gap-1">
                  {items.map((_, i) => (
                    <div
                      key={i}
                      className="h-0.5 transition-all duration-300"
                      style={{
                        width: i === active ? "16px" : "6px",
                        background: i === active ? "#E8621A" : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
