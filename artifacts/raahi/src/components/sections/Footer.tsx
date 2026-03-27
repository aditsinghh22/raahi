import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden section-divider"
      style={{ background: "#050505" }}
    >
      {/* Big CTA section */}
      <div
        className="relative py-32 overflow-hidden"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Orange haze */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "rgba(232,98,26,0.07)" }}
        />

        {/* Dot grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(rgba(232,98,26,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="label-tag mb-6">Own What's Next</div>
            <h2
              className="display-heading text-white mb-6"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              STOP FLYING<br />
              <span className="text-gradient">BLIND.</span>
            </h2>
            <p className="text-base mb-12" style={{ color: "rgba(255,255,255,0.4)", maxWidth: "380px", margin: "0 auto 3rem" }}>
              Join 500+ Indian founders who have automated their regulatory overhead and reclaimed their time.
            </p>

            {submitted ? (
              <div
                className="max-w-xs mx-auto p-6 text-center"
                style={{ border: "1px solid rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.05)" }}
              >
                <div className="font-display font-black text-white text-lg uppercase mb-1">You're In.</div>
                <div className="font-mono text-xs" style={{ color: "rgba(52,211,153,0.7)" }}>We'll be in touch soon.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="YOUR@EMAIL.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 font-mono text-xs tracking-widest uppercase text-white placeholder-white/20 focus:outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,98,26,0.5)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 font-mono text-xs tracking-widest uppercase font-bold text-black transition-all"
                  style={{ background: "#E8621A" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px -5px rgba(232,98,26,0.7)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  Get Access
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-6 h-6 flex items-center justify-center"
                style={{ border: "1px solid rgba(232,98,26,0.5)" }}
              >
                <div className="w-2 h-2" style={{ background: "#E8621A" }} />
              </div>
              <span className="font-display font-black text-lg tracking-widest uppercase text-white">RAAHI</span>
            </div>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.3)", maxWidth: "240px" }}>
              The Complete Business Operating System for Indian startups and SMBs.
            </p>
          </div>

          {/* Nav columns */}
          {[
            { title: "Product", links: ["Compliance Map", "Financial Engine", "Credit Score", "Schemes Finder", "Pricing"] },
            { title: "Company", links: ["About Us", "Careers", "Contact", "Blog"] },
            { title: "Legal", links: ["Terms", "Privacy Policy", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[10px] tracking-widest uppercase mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#E8621A")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="font-mono text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} RAAHI TECHNOLOGIES PVT LTD. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] text-center" style={{ color: "rgba(255,255,255,0.15)" }}>
            Not a law firm. Always verify critical decisions with certified professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
