import { useRef, useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "₹999",
    period: "/mo",
    desc: "Perfect for solopreneurs and 1-2 person startups.",
    cta: "Get Started",
    highlight: false,
    items: [
      "Compliance Map (up to 15 rules)",
      "GST & MCA deadline alerts",
      "3 legal documents / month",
      "Udyam registration support",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹3,999",
    period: "/mo",
    desc: "For funded startups scaling their operations across India.",
    cta: "Start Free Trial",
    highlight: true,
    items: [
      "Unlimited compliance rules",
      "Full Financial Engine (GST + TDS + MCA)",
      "Labour & HR automation (up to 50 employees)",
      "Unlimited legal documents",
      "Schemes Finder with auto-matching",
      "Compliance Credit Score",
      "WhatsApp + SMS + Email alerts",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large teams, holding companies, or multi-state operations.",
    cta: "Contact Sales",
    highlight: false,
    items: [
      "Multi-entity management",
      "Dedicated compliance manager",
      "Custom integrations (ERP / Tally / Zoho)",
      "SSO & RBAC",
      "SLA-backed uptime",
      "Custom reporting",
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      className="py-32 relative overflow-hidden section-divider"
      style={{ background: "#060606" }}
    >
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(232,98,26,0.06)" }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="label-tag mb-5">Transparent Pricing</div>
            <h2
              className="display-heading text-white"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
            >
              NO SURPRISES.<br />
              <span className="text-gradient">JUST VALUE.</span>
            </h2>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: annual ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)" }}>Monthly</span>
            <button
              className="w-12 h-6 relative transition-all"
              style={{ background: annual ? "#E8621A" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              onClick={() => setAnnual(!annual)}
            >
              <div
                className="absolute top-0.5 w-5 h-5 transition-all duration-300"
                style={{ left: annual ? "calc(100% - 22px)" : "2px", background: "white" }}
              />
            </button>
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: annual ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>
              Annual <span style={{ color: "#E8621A" }}>-20%</span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 flex flex-col"
              style={{
                border: plan.highlight ? "1px solid rgba(232,98,26,0.4)" : "1px solid rgba(255,255,255,0.07)",
                background: plan.highlight ? "rgba(232,98,26,0.04)" : "rgba(255,255,255,0.02)",
              }}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase px-3 py-1 text-black"
                  style={{ background: "#E8621A" }}
                >
                  Most Popular
                </div>
              )}

              {/* Corner brackets */}
              {plan.highlight && (
                <>
                  <div style={{ position: "absolute", top: 8, left: 8, width: 14, height: 14, borderTop: "1px solid rgba(232,98,26,0.5)", borderLeft: "1px solid rgba(232,98,26,0.5)" }} />
                  <div style={{ position: "absolute", bottom: 8, right: 8, width: 14, height: 14, borderBottom: "1px solid rgba(232,98,26,0.5)", borderRight: "1px solid rgba(232,98,26,0.5)" }} />
                </>
              )}

              <div className="mb-6">
                <div className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-black text-4xl text-white">
                    {plan.price === "Custom" ? plan.price : annual ? `₹${Math.round(parseInt(plan.price.replace("₹", "").replace(",", "")) * 0.8).toLocaleString("en-IN")}` : plan.price}
                  </span>
                  {plan.period && (
                    <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{plan.period}</span>
                  )}
                </div>
                <p className="font-sans text-sm mt-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {plan.desc}
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 flex-grow mb-8">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div
                      className="mt-1 w-3 h-3 shrink-0"
                      style={{ border: "1px solid rgba(232,98,26,0.4)", background: "rgba(232,98,26,0.08)" }}
                    />
                    <span className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3.5 font-mono text-xs tracking-widest uppercase font-bold transition-all duration-300"
                style={
                  plan.highlight
                    ? { background: "#E8621A", color: "#000" }
                    : { border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", background: "transparent" }
                }
                onMouseEnter={(e) => { if (!plan.highlight) e.currentTarget.style.borderColor = "rgba(232,98,26,0.4)"; }}
                onMouseLeave={(e) => { if (!plan.highlight) e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center mt-8 font-mono text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
