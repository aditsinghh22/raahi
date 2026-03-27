import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 3D Spiral Sphere using pure WebGL / Canvas
function SpiralSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0;
    const setSize = () => {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Mouse tracking for parallax
    let mouseX = 0, mouseY = 0;
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    // Generate spiral sphere points
    const N = 600;
    const points: { phi: number; theta: number; size: number }[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const phi = Math.atan2(r * Math.sin(theta), y);
      points.push({ phi, theta, size: Math.random() * 2 + 0.8 });
    }

    let t = 0;
    let raf: number;

    const draw = () => {
      const W = width / window.devicePixelRatio;
      const H = height / window.devicePixelRatio;
      ctx.clearRect(0, 0, W, H);

      t += 0.003;

      const cx = W / 2;
      const cy = H / 2;
      const radius = Math.min(W, H) * 0.35;

      // Rotation axes with mouse parallax
      const rotY = t + mouseX * 0.4;
      const rotX = mouseY * 0.3;

      // Project and sort by depth
      const projected: { x: number; y: number; z: number; size: number }[] = [];

      for (const pt of points) {
        const { phi, theta } = pt;
        // Cartesian from spherical
        let px = Math.sin(phi) * Math.cos(theta);
        let py = Math.cos(phi);
        let pz = Math.sin(phi) * Math.sin(theta);

        // RotateY
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        let tmp = px * cosY - pz * sinY;
        pz = px * sinY + pz * cosY;
        px = tmp;

        // RotateX
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        tmp = py * cosX - pz * sinX;
        pz = py * sinX + pz * cosX;
        py = tmp;

        // Perspective
        const fov = 1.8;
        const scale = fov / (fov + pz);
        const sx = cx + px * radius * scale;
        const sy = cy + py * radius * scale;

        projected.push({ x: sx, y: sy, z: pz, size: pt.size * scale });
      }

      // Sort by z (back to front)
      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        const depth = (p.z + 1) / 2; // 0..1
        const alpha = 0.15 + depth * 0.75;
        const r = p.size * (0.5 + depth * 0.8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        // Orange hue for front dots, dim white for back
        if (depth > 0.5) {
          ctx.fillStyle = `rgba(232, 98, 26, ${alpha * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(200, 200, 200, ${alpha * 0.6})`;
        }
        ctx.fill();
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
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "#080808" }}
    >
      {/* Full-screen sphere canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ width: "min(90vw, 90vh)", height: "min(90vw, 90vh)", opacity: 0.85 }}>
          <SpiralSphere />
        </div>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 30%, #080808 80%), " +
            "linear-gradient(to bottom, #080808 0%, transparent 12%, transparent 88%, #080808 100%)",
        }}
      />

      {/* LEFT text - "SIMPLIFY YOUR" */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute left-0 bottom-[25%] pl-6 sm:pl-10 lg:pl-16 z-10"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="label-tag mb-4">01 / Raahi</div>
        <h1
          className="display-heading text-white"
          style={{ fontSize: "clamp(3rem, 6vw, 6.5rem)" }}
        >
          SIMPLIFY<br />YOUR
        </h1>
      </motion.div>

      {/* RIGHT text - "ENTIRE BUSINESS" */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute right-0 top-[25%] pr-6 sm:pr-10 lg:pr-16 z-10 text-right"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          className="display-heading"
          style={{
            fontSize: "clamp(3rem, 6vw, 6.5rem)",
            background: "linear-gradient(135deg, #E8621A, #FF9848)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ENTIRE<br />BUSINESS
        </h1>
        <div className="label-tag mt-4 text-right">COMPLIANCE. LEGAL. FINANCE.</div>
      </motion.div>

      {/* Bottom center CTA */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-4">
          <button
            className="font-mono text-xs tracking-widest uppercase px-8 py-3.5 text-black font-bold transition-all duration-300"
            style={{
              background: "#E8621A",
              boxShadow: "0 0 30px -5px rgba(232,98,26,0.65)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 50px -5px rgba(232,98,26,0.9)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 30px -5px rgba(232,98,26,0.65)"; }}
          >
            Get Early Access
          </button>
          <button
            className="font-mono text-xs tracking-widest uppercase px-8 py-3.5 text-white/60 hover:text-white transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          >
            See How It Works
          </button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/20" />
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20">Scroll</div>
        </motion.div>
      </motion.div>

      {/* Stats bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-center gap-12 md:gap-20">
          {[
            ["200+", "Compliance Rules"],
            ["28", "States Covered"],
            ["₹0", "To Get Started"],
            ["500+", "Founders Onboard"],
          ].map(([val, label]) => (
            <div key={label} className="text-center hidden sm:block">
              <div className="font-display font-black text-xl text-white">{val}</div>
              <div className="font-mono text-[9px] uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
