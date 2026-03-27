import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pains = [
  { num: "01", text: "What licenses do I even need?", sub: "300+ government portals. No single source of truth." },
  { num: "02", text: "Am I filing everything correctly?", sub: "Missing deadlines means instant, compounding penalties." },
  { num: "03", text: "Am I following labour laws?", sub: "One inspection visit can shut your entire operation." },
  { num: "04", text: "What government benefits am I missing?", sub: "₹14 lakh crore in schemes go unclaimed every year." },
  { num: "05", text: "Are my contracts & IP protected?", sub: "One unprotected deal can cost your whole company." },
];

export function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title clip reveal
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

      // Horizontal line expand
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Pain items stagger
      const items = itemsRef.current?.querySelectorAll(".pain-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.09,
            scrollTrigger: { trigger: itemsRef.current, start: "top 80%" },
            duration: 0.7,
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
      className="py-32 relative overflow-hidden section-divider"
      style={{ background: "#060606" }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="label-tag mb-5">The Problem Space</div>
            <div
              ref={titleRef}
              style={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
            >
              <h2
                className="display-heading text-white"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
              >
                RUNNING<br />BLIND.
              </h2>
            </div>
          </div>
          <div className="flex items-end">
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)", maxWidth: "400px" }}
            >
              Indian founders spend 40% of their first year navigating regulatory overhead instead of building their product. The system is broken by design.
            </p>
          </div>
        </div>

        {/* Full-width divider line */}
        <div
          ref={lineRef}
          className="w-full h-[1px] mb-0"
          style={{ background: "rgba(255,255,255,0.08)", transform: "scaleX(0)" }}
        />

        {/* Pain list */}
        <div ref={itemsRef}>
          {pains.map((pain, i) => (
            <div
              key={i}
              className="pain-item group grid grid-cols-12 items-center py-7 opacity-0 cursor-default"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(232,98,26,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Number */}
              <div className="col-span-1 font-mono text-xs" style={{ color: "rgba(232,98,26,0.5)" }}>
                {pain.num}
              </div>

              {/* Question */}
              <div className="col-span-7 lg:col-span-6">
                <span
                  className="font-display font-semibold text-lg md:text-xl text-white transition-colors duration-300 group-hover:text-orange-400"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {pain.text}
                </span>
              </div>

              {/* Sub */}
              <div className="col-span-4 lg:col-span-5 text-right hidden md:block">
                <span className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {pain.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Resolution card */}
        <div
          className="mt-20 p-12 lg:p-16 relative overflow-hidden"
          style={{ border: "1px solid rgba(232,98,26,0.2)", background: "rgba(232,98,26,0.04)" }}
        >
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
            style={{ background: "rgba(232,98,26,0.15)" }}
          />
          <div className="label-tag mb-6">The Solution</div>
          <h3
            className="display-heading text-white mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
          >
            ONE PLATFORM.<br />
            <span className="text-gradient">ALL 5 SOLVED.</span>
          </h3>
          <p className="font-sans text-base" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "480px" }}>
            Stop stitching together 5 different vendors. Raahi handles every regulatory dimension of your business in a single unified dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}
