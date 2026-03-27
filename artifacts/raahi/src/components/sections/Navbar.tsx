import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const NAV_LINKS = ["Why Raahi", "Features", "Pricing", "About"];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 30));
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{ border: "1px solid rgba(232,98,26,0.6)" }}
            >
              <div className="w-2.5 h-2.5" style={{ background: "#E8621A" }} />
            </div>
            <span
              className="font-display font-black text-xl tracking-widest uppercase text-white"
            >
              RAAHI
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8621A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="font-mono text-xs tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
            >
              Login
            </button>
            <button
              className="font-mono text-xs tracking-widest uppercase px-6 py-2.5 text-black font-bold transition-all duration-300 hover:brightness-110"
              style={{ background: "#E8621A" }}
            >
              Get Access
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-5 h-[1px] bg-white/60 transition-all"
                style={{ opacity: menuOpen && i === 1 ? 0 : 1 }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden px-6 pb-6"
          style={{ background: "rgba(8,8,8,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-mono text-xs tracking-widest uppercase text-white/40 hover:text-orange-500 transition-colors border-b"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              {link}
            </a>
          ))}
          <button
            className="mt-4 w-full py-3 font-mono text-xs tracking-widest uppercase text-black font-bold"
            style={{ background: "#E8621A" }}
          >
            Get Access
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
