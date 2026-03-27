import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animated dot grid canvas
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouse);

    const spacing = 30;
    let t = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.015;

      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          // Distance from mouse
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 180);

          // Wave ripple
          const wave = Math.sin(i * 0.4 + t) * Math.cos(j * 0.4 + t) * 0.5 + 0.5;

          const r = (0.5 + influence * 2.5 + wave * 1) * window.devicePixelRatio;
          const alpha = 0.06 + influence * 0.5 + wave * 0.04;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = influence > 0.15
            ? `rgba(232, 98, 26, ${alpha})`
            : `rgba(180, 180, 180, ${alpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const layers = [
  { label: "Frontend Layer", items: ["React App", "Compliance Dashboard", "Document Engine UI"], num: "04" },
  { label: "Intelligence Layer", items: ["AI Rule Classifier", "Scheme Matcher", "Credit Scorer"], num: "03" },
  { label: "Data Layer", items: ["Govt. API Hub", "State Rules DB", "Company Registry"], num: "02" },
  { label: "Security Layer", items: ["SOC2 Compliance", "Data Encryption", "Audit Logs"], num: "01" },
];

export function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = sectionRef.current?.querySelectorAll(".arch-block");
      if (blocks) {
        gsap.fromTo(
          blocks,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ background: "#080808" }}
    >
      <DotGrid />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Copy */}
          <div>
            <div className="label-tag mb-5">Platform Architecture</div>
            <h2
              className="display-heading text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
            >
              BUILT FOR<br />ENTERPRISE.<br />
              <span className="text-gradient">PRICED FOR<br />FOUNDERS.</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "380px" }}>
              Four layers of intelligent infrastructure — from raw government data ingestion to a beautiful real-time compliance dashboard — so you can focus on building your company.
            </p>
          </div>

          {/* Stack visualization */}
          <div className="relative">
            {/* Connector line */}
            <div
              className="absolute left-7 top-0 bottom-0 w-[1px]"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(232,98,26,0.3) 20%, rgba(232,98,26,0.3) 80%, transparent)" }}
            />

            <div className="space-y-0">
              {layers.map((layer, i) => (
                <motion.div
                  key={i}
                  className="arch-block relative pl-16 py-8 opacity-0"
                  style={{ borderBottom: i < layers.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  whileHover={{
                    x: 8,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Dot on connector */}
                  <div
                    className="absolute left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center"
                    style={{ border: "1px solid rgba(232,98,26,0.5)", background: "#080808" }}
                  >
                    <div className="w-1.5 h-1.5" style={{ background: "#E8621A" }} />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[10px]" style={{ color: "rgba(232,98,26,0.6)" }}>{layer.num}</span>
                        <span className="font-display font-bold text-sm text-white uppercase tracking-wide">{layer.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="font-mono text-[10px] tracking-wide px-2.5 py-1 uppercase"
                            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
