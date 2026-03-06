import { PC } from "../constants/colors";

/* ── SmokeParticle ── */
export function SmokeParticle({ x, y, delay, size = 8 }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(120,120,140,0.6) 0%, transparent 70%)",
      animation: `smokeRise 3s ease-out ${delay}s infinite`,
      pointerEvents: "none",
    }} />
  );
}

/* ── Graffiti ── */
export function Graffiti({ x, y, text, color, rotation = 0, size = 14, testId }) {
  return (
    <div
      data-testid={testId}
      style={{
        position: "absolute", left: x, top: y,
        fontFamily: "'Permanent Marker', cursive", fontSize: size, color,
        transform: `rotate(${rotation}deg)`,
        textShadow: `0 0 8px ${color}44`,
        letterSpacing: 1, userSelect: "none",
      }}
    >
      {text}
    </div>
  );
}

/* ── NeonSign ── */
export function NeonSign({ x, y, text, color }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      fontFamily: "'Permanent Marker', cursive", fontSize: 11, color,
      textShadow: `0 0 6px ${color}, 0 0 14px ${color}, 0 0 22px ${color}88`,
      animation: "neonFlicker 3s ease-in-out infinite",
      letterSpacing: 2, userSelect: "none",
    }}>
      {text}
    </div>
  );
}

/* ── WindowPane ── */
export function WindowPane({ x, y, w = 8, h = 10, lit = true, flickering = false }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      background: lit
        ? "linear-gradient(180deg, #05d9e844, #05d9e822)"
        : "#1a1a2e",
      border: "1px solid #333",
      animation: flickering ? "windowFlicker 4s ease-in-out infinite" : undefined,
      boxShadow: lit
        ? "0 0 6px rgba(5,217,232,0.3), inset 0 0 4px rgba(5,217,232,0.2)"
        : "none",
    }} />
  );
}

/* ── Antenna ── */
export function Antenna({ x, y, height = 40 }) {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <div style={{
        width: 2, height, margin: "0 auto",
        background: "linear-gradient(to top, #666, #888)",
      }} />
      <div style={{
        position: "absolute", top: -2, left: -2, width: 6, height: 6,
        borderRadius: "50%", background: "#ff0000",
        animation: "blink 2s ease-in-out infinite",
        boxShadow: "0 0 6px #ff0000, 0 0 12px #ff000066",
      }} />
      <div style={{ position: "absolute", top: 8, left: -6, width: 14, height: 1, background: "#777" }} />
      <div style={{ position: "absolute", top: 18, left: -4, width: 10, height: 1, background: "#777" }} />
    </div>
  );
}

/* ── WeedTuft ── */
export function WeedTuft({ x, y, size = 1 }) {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      {[-8, -3, 2, 6].map((o, i) => (
        <div key={i} style={{
          position: "absolute", left: o * size, bottom: 0,
          width: 2 * size, height: (8 + i * 3) * size,
          background: i % 2 === 0 ? "#2a6a2a" : "#3a7a3a",
          borderRadius: "50% 50% 0 0",
          transformOrigin: "bottom center",
          animation: `grassSway ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

/* ── Boombox ── */
export function Boombox({ x, y }) {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <div style={{
        width: 26, height: 15, background: "#2a2a2a",
        borderRadius: 3, border: "1px solid #555", position: "relative",
        boxShadow: "0 0 8px rgba(255,42,109,0.2)",
      }}>
        {/* Speakers */}
        {[2, 16].map(lx => (
          <div key={lx} style={{
            position: "absolute", left: lx, top: 3, width: 8, height: 8,
            borderRadius: "50%", border: "1px solid #666",
            background: "radial-gradient(circle, #444, #1a1a1a)",
            animation: "speakerPulse 0.5s ease-in-out infinite",
          }} />
        ))}
        {/* Centre display */}
        <div style={{
          position: "absolute", left: 10, top: 4, width: 6, height: 6,
          background: "#001a1a", border: "1px solid #05d9e822",
        }}>
          <div style={{ width: "100%", height: "100%", background: "rgba(5,217,232,0.15)" }} />
        </div>
      </div>
      {/* Sound waves */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute", left: 28 + i * 4, top: 2 + i,
          width: 4, height: 10 - i * 2,
          border: `1px solid ${PC.g1}${i === 2 ? "44" : i === 1 ? "88" : "cc"}`,
          borderLeft: "none", borderRadius: "0 50% 50% 0",
          animation: `soundWave 0.8s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── WoodenCrate ── */
export function WoodenCrate({ x, y, w = 20, h = 16, label, testId }) {
  const corners = [
    { left: 0, top: 0, borderRadius: "0 0 2px 0" },
    { right: 0, top: 0, borderRadius: "0 0 0 2px" },
    { left: 0, bottom: 0, borderRadius: "0 2px 0 0" },
    { right: 0, bottom: 0, borderRadius: "2px 0 0 0" },
  ];
  return (
    <div style={{ position: "absolute", left: x, top: y }} data-testid={testId}>
      <div style={{
        width: w, height: h,
        background: `linear-gradient(180deg, ${PC.wood}, ${PC.woodDark}, #7a5612)`,
        borderRadius: 2, border: `1px solid #5a3d0a`,
        position: "relative", boxShadow: "2px 2px 5px rgba(0,0,0,0.55)",
      }}>
        {/* Grain lines */}
        <div style={{ position: "absolute", top: Math.round(h * 0.33), left: 1, right: 1, height: 1, background: "#5a3d0a55" }} />
        <div style={{ position: "absolute", top: Math.round(h * 0.66), left: 1, right: 1, height: 1, background: "#5a3d0a33" }} />
        {/* Metal corners */}
        {corners.map((c, i) => (
          <div key={i} style={{ position: "absolute", width: 3, height: 3, background: "#888", ...c }} />
        ))}
        {label && (
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)", fontSize: 5,
            color: "#3a2a00", fontWeight: "bold", userSelect: "none",
          }}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
