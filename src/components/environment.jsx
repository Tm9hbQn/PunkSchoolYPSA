import { PC } from "../constants/colors";
import { SmokeParticle, WeedTuft } from "./primitives";

/* ── FireBarrel ── */
export function FireBarrel({ x, y }) {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      {/* Barrel body */}
      <div style={{
        width: 20, height: 26,
        background: "linear-gradient(90deg, #5a3a2a, #7a4a3a, #5a3a2a)",
        borderRadius: "2px 2px 4px 4px",
        position: "relative",
        boxShadow: "0 0 20px rgba(255,107,53,0.4), 0 0 40px rgba(255,42,109,0.2)",
      }}>
        <div style={{ position: "absolute", top: 6,  left: 0, right: 0, height: 2, background: "#3a2a1a" }} />
        <div style={{ position: "absolute", top: 16, left: 0, right: 0, height: 2, background: "#3a2a1a" }} />
      </div>
      {/* Flames */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          position: "absolute", left: 2 + i * 3.5, top: -9,
          width: 6, height: 14,
          background: i % 2 === 0
            ? "linear-gradient(to top, #ff6b35, #ff2a6d, transparent)"
            : "linear-gradient(to top, #ffaa35, #ff6b35, transparent)",
          borderRadius: "50% 50% 20% 20%",
          animation: `flame ${0.28 + i * 0.1}s ease-in-out ${i * 0.06}s infinite alternate`,
          transformOrigin: "bottom center", opacity: 0.9,
        }} />
      ))}
      {/* Sparks */}
      {[0, 1, 2].map(i => (
        <div key={`s${i}`} style={{
          position: "absolute", left: 5 + i * 5, top: -4,
          width: 2, height: 2, borderRadius: "50%", background: "#ffdd44",
          animation: `spark 1.5s ease-out ${i * 0.5}s infinite`,
        }} />
      ))}
      {/* Glow */}
      <div style={{
        position: "absolute", left: -15, top: -20, width: 50, height: 50,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)",
        animation: "fireGlow 0.5s ease-in-out infinite alternate",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ── Campfire ── */
export function Campfire({ x, y }) {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      {/* Stones ring */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <div key={i} style={{
            position: "absolute",
            left: 10 + Math.cos(a) * 14, top: 4 + Math.sin(a) * 8,
            width: 6, height: 5, borderRadius: "50%",
            background: i % 2 === 0 ? "#555" : "#666", border: "1px solid #444",
          }} />
        );
      })}
      {/* Logs */}
      <div style={{ position: "absolute", left: 5,  top: 5, width: 22, height: 4, background: "#4a2a1a", borderRadius: 2, transform: "rotate(15deg)" }} />
      <div style={{ position: "absolute", left: 8,  top: 6, width: 20, height: 4, background: "#3a2010", borderRadius: 2, transform: "rotate(-20deg)" }} />
      {/* Flames */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={`f${i}`} style={{
          position: "absolute", left: 6 + i * 3, top: -15 + (i % 2) * 4,
          width: 7, height: 18 - (i % 3) * 3,
          background: i % 3 === 0
            ? "linear-gradient(to top, #ff6b35, #ffaa35, transparent)"
            : i % 3 === 1
              ? "linear-gradient(to top, #ff2a6d, #ff6b35, transparent)"
              : "linear-gradient(to top, #ffdd44, #ff6b35, transparent)",
          borderRadius: "50% 50% 20% 20%",
          animation: `flame ${0.22 + i * 0.08}s ease-in-out ${i * 0.04}s infinite alternate`,
          transformOrigin: "bottom center", opacity: 0.9,
        }} />
      ))}
      {/* Glow halo */}
      <div style={{
        position: "absolute", left: -32, top: -42, width: 108, height: 96,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,140,50,0.2) 0%, rgba(255,42,109,0.07) 50%, transparent 70%)",
        animation: "fireGlow 0.5s ease-in-out infinite alternate",
        pointerEvents: "none",
      }} />
      {/* Sparks */}
      {[0, 1, 2, 3].map(i => (
        <div key={`cs${i}`} style={{
          position: "absolute", left: 10 + i * 5, top: -8,
          width: 2, height: 2, borderRadius: "50%", background: "#ffdd44",
          animation: `spark 2s ease-out ${i * 0.4}s infinite`,
        }} />
      ))}
      {/* Smoke */}
      {[0, 1, 2, 3].map(i => (
        <SmokeParticle key={`cfs${i}`} x={12 + i * 3} y={-22 - i * 4} delay={i * 0.7} size={6 + i * 2} />
      ))}
    </div>
  );
}

/* ── NightSky ── */
const STARS = Array.from({ length: 65 }, (_, i) => ({
  x: (i * 137.5) % 100,
  y: ((i * 73) % 30),
  size: 0.5 + (i % 3) * 0.8,
  delay: (i * 0.37) % 5,
  dur: 2 + (i % 4),
}));

export function NightSky() {
  return (
    <>
      {STARS.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "#fff", opacity: 0.6,
          animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}
      {/* Moon */}
      <div style={{
        position: "absolute", right: 80, top: 25, width: 42, height: 42,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #ffffdd, #ddddaa)",
        boxShadow: "0 0 22px rgba(255,255,200,0.35), 0 0 65px rgba(255,255,200,0.1)",
      }}>
        <div style={{ position: "absolute", top: 8,  left: 12, width: 8, height: 8, borderRadius: "50%", background: "rgba(200,200,180,0.3)" }} />
        <div style={{ position: "absolute", top: 20, left: 22, width: 6, height: 5, borderRadius: "50%", background: "rgba(200,200,180,0.2)" }} />
      </div>
    </>
  );
}

/* ── GroundLayer ── */
export function GroundLayer() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `
        radial-gradient(ellipse at 30% 50%, #1e3a1e 0%, transparent 40%),
        radial-gradient(ellipse at 70% 35%, #1e3a1e 0%, transparent 40%),
        radial-gradient(ellipse at 50% 75%, #1a3a1a 0%, transparent 35%),
        radial-gradient(ellipse at 20% 85%, #1a3a1a 0%, transparent 30%),
        radial-gradient(ellipse at 80% 80%, #1e3a1e 0%, transparent 35%),
        #1a1a2e
      `,
    }}>
      {/* Paths & ground markings */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* Main horizontal path */}
        <rect x="0"   y="265" width="1050" height="30" fill="#3a3a4a" rx="2" opacity="0.7" />
        <rect x="0"   y="267" width="1050" height="26" fill="#444455" rx="2" opacity="0.4" />
        {/* Vertical paths / pillars */}
        <rect x="150" y="285" width="25" height="40"  fill="#3a3a4a" rx="2" opacity="0.6" />
        <rect x="580" y="285" width="25" height="110" fill="#3a3a4a" rx="2" opacity="0.6" />
        <rect x="780" y="210" width="25" height="60"  fill="#3a3a4a" rx="2" opacity="0.5" />
        <rect x="200" y="290" width="20" height="210" fill="#3a3a4a" rx="2" opacity="0.4" />
        {/* Cracks */}
        <path d="M 100 267 L 105 278 L 98 290"  stroke="#2a2a3a" strokeWidth="1" fill="none" />
        <path d="M 300 270 L 310 280 L 305 293" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        <path d="M 500 268 L 495 275 L 502 290" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        <path d="M 700 270 L 698 278 L 705 290" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        <path d="M 900 268 L 895 276 L 902 288" stroke="#2a2a3a" strokeWidth="1" fill="none" />
      </svg>

      {/* Weeds scattered around */}
      {[
        [50,200],[180,170],[270,305],[520,180],[680,320],[380,440],
        [130,460],[700,460],[460,500],[600,165],[760,280],[15,360],
        [200,520],[850,200],[920,350],[870,470],[950,260],
      ].map(([wx, wy], i) => (
        <WeedTuft key={`w${i}`} x={wx} y={wy} size={0.5 + (i % 4) * 0.2} />
      ))}

      {/* Puddles */}
      {[
        { l: 220, t: 275, w: 30, h: 12, dur: 4, delay: 0 },
        { l: 480, t: 273, w: 20, h: 8,  dur: 5, delay: 1 },
        { l: 830, t: 270, w: 25, h: 10, dur: 6, delay: 2 },
      ].map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: p.l, top: p.t, width: p.w, height: p.h,
          background: "radial-gradient(ellipse, rgba(5,217,232,0.08) 0%, transparent 70%)",
          borderRadius: "50%", animation: `puddle ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── Rat ── */
export function Rat({ startX, startY, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "absolute", left: startX, top: startY,
      animation: "ratRun 2s linear forwards", zIndex: 50,
    }}>
      <div style={{ width: 10, height: 5, background: "#5a4a3a", borderRadius: "40% 60% 50% 50%" }} />
      <div style={{ position: "absolute", left: -6, top: 1, width: 8, height: 2, background: "#7a6a5a", borderRadius: 4, animation: "tailWag 0.2s ease-in-out infinite alternate" }} />
      <div style={{ position: "absolute", right: 1, top: 1, width: 2, height: 2, background: "#111", borderRadius: "50%" }} />
    </div>
  );
}

/* ── Bird ── */
export function Bird({ y, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "absolute", left: -20, top: y,
      animation: "birdFly 8s linear forwards", zIndex: 100,
    }}>
      <div style={{ width: 12, height: 3, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, width: 6, height: 3, borderTop: "2px solid #222", borderRadius: "50% 50% 0 0", animation: "wingFlap 0.3s ease-in-out infinite alternate", transformOrigin: "right center" }} />
        <div style={{ position: "absolute", left: 6, width: 6, height: 3, borderTop: "2px solid #222", borderRadius: "50% 50% 0 0", animation: "wingFlap 0.3s ease-in-out 0.15s infinite alternate", transformOrigin: "left center" }} />
      </div>
    </div>
  );
}
