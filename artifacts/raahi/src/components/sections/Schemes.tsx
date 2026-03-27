import { useRef } from "react";
import { motion } from "framer-motion";

const schemes = [
  { name: "PMEGP", amount: "₹25 Lakh", category: "Manufacturing", desc: "Credit-linked subsidy for micro-enterprises up to ₹25L." },
  { name: "Startup India Seed Fund", amount: "₹20 Lakh", category: "Tech & Innovation", desc: "Non-dilutive government seed funding for early-stage startups." },
  { name: "MSME Credit Guarantee", amount: "₹2 Crore", category: "Finance", desc: "Collateral-free loans up to ₹2Cr with government guarantee." },
  { name: "Digital MSME Scheme", amount: "₹1 Lakh", category: "Digital Tools", desc: "Subsidy on cloud & ERP adoption for Udyam-registered businesses." },
  { name: "CLCSS", amount: "15% Subsidy", category: "Technology", desc: "Capital subsidy for technology upgradation in small industries." },
  { name: "GeM Portal Scheme", amount: "Unlimited", category: "Government Sales", desc: "Direct access to sell products/services to all government bodies." },
];

export function Schemes() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden section-divider"
      style={{ background: "#060606" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="label-tag mb-5">Govt. Schemes Finder</div>
            <h2
              className="display-heading text-white"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
            >
              MONEY WAITING<br />
              <span className="text-gradient">TO BE CLAIMED.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", maxWidth: "300px" }}>
            ₹14 lakh crore in government schemes go unclaimed every year. Raahi matches your business profile to every scheme you qualify for — automatically.
          </p>
        </div>

        {/* Scheme grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.map((scheme, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 cursor-pointer transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,98,26,0.3)";
                e.currentTarget.style.background = "rgba(232,98,26,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2 py-1"
                  style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {scheme.category}
                </span>
                <span
                  className="font-display font-black text-lg"
                  style={{ color: "#E8621A" }}
                >
                  {scheme.amount}
                </span>
              </div>

              <h3
                className="font-display font-black text-white mb-3 uppercase tracking-wide"
                style={{ fontSize: "1rem" }}
              >
                {scheme.name}
              </h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                {scheme.desc}
              </p>

              <div
                className="mt-5 pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#E8621A" }}>
                  Check Eligibility
                </div>
                <div className="flex-1 h-[1px]" style={{ background: "rgba(232,98,26,0.3)" }} />
                <div style={{ color: "#E8621A", fontSize: "0.65rem" }}>→</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <div
          className="mt-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            AND 40+ MORE SCHEMES TRACKED AUTOMATICALLY
          </div>
          <button
            className="font-mono text-xs tracking-widest uppercase px-6 py-3 text-black font-bold transition-all"
            style={{ background: "#E8621A" }}
          >
            Find My Schemes
          </button>
        </div>
      </div>
    </section>
  );
}
