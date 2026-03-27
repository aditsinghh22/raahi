import { useRef } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "We were about to get shut down over a license we didn't even know we needed. Raahi flagged it 3 weeks before an inspection. Saved ₹40,000 in penalties.",
    name: "Arjun Mehta",
    role: "Co-Founder",
    company: "EcoStack Technologies",
    num: "01",
  },
  {
    quote: "Our CA was charging ₹25,000/month just to track deadlines. Raahi does it automatically, better, and for a fraction of the cost. It's not even close.",
    name: "Priya Sharma",
    role: "CEO",
    company: "HealthBridge Labs",
    num: "02",
  },
  {
    quote: "The schemes finder alone paid for the subscription 20x over. It found a MSME subsidy scheme we had never heard of. ₹8.4L straight to our bank account.",
    name: "Kabir Nair",
    role: "Founder",
    company: "Nair Agri Solutions",
    num: "03",
  },
];

export function Testimonials() {
  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{ background: "#080808" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="label-tag mb-5">Social Proof</div>
            <h2
              className="display-heading text-white"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)" }}
            >
              FOUNDERS<br />
              <span className="text-gradient">TRUST RAAHI.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", maxWidth: "340px" }}>
              500+ Indian startups have automated their regulatory overhead. Here's what they say.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-px">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-12 gap-6 items-start py-10 cursor-default transition-all duration-300"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "12px"; }}
              onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0px"; }}
            >
              {/* Number */}
              <div className="col-span-1 pt-1">
                <span className="font-mono text-xs" style={{ color: "rgba(232,98,26,0.45)" }}>{t.num}</span>
              </div>

              {/* Quote */}
              <div className="col-span-12 md:col-span-8">
                <p
                  className="font-display font-bold text-xl md:text-2xl text-white leading-snug"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="col-span-12 md:col-span-3 flex items-start gap-4 md:justify-end">
                <div
                  className="w-10 h-10 flex items-center justify-center text-xs font-black font-display text-white"
                  style={{ border: "1px solid rgba(232,98,26,0.4)", background: "rgba(232,98,26,0.08)" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white uppercase tracking-wide">{t.name}</div>
                  <div className="font-mono text-[10px] tracking-wide mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {t.role} — {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Closing line */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />
        </div>
      </div>
    </section>
  );
}
