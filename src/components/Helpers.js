export const PC = {
  bg: "#1a1a2e",
  ground: "#2d2d3f",
  path: "#3a3a4a",
  grass: "#1e3a1e",
  building: "#4a4a5a",
  buildingDark: "#333344",
  roof: "#2a2a3a",
  g1: "#ff2a6d",
  g2: "#05d9e8",
  g3: "#d1f7ff",
  g4: "#ff6b35",
  g5: "#7b2ff7",
  neon: "#ff2a6d",
  neon2: "#05d9e8",
};

export function SmokeParticle({ x, y, delay, size = 8 }) {
  return (<div style={{
    position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,120,140,0.6) 0%, transparent 70%)",
    animation: `smokeRise 3s ease-out ${delay}s infinite`, pointerEvents: "none",
  }} />);
}

export function Graffiti({ x, y, text, color, rotation = 0, size = 14 }) {
  return (<div style={{
    position: "absolute", left: x, top: y,
    fontFamily: "'Permanent Marker', cursive", fontSize: size, color,
    transform: `rotate(${rotation}deg)`, textShadow: `0 0 8px ${color}44`,
    letterSpacing: 1, userSelect: "none",
  }}>{text}</div>);
}

export function NeonSign({ x, y, text, color }) {
  return (<div style={{
    position: "absolute", left: x, top: y,
    fontFamily: "'Permanent Marker', cursive", fontSize: 11, color,
    textShadow: `0 0 6px ${color}, 0 0 12px ${color}, 0 0 20px ${color}88`,
    animation: "neonFlicker 3s ease-in-out infinite", letterSpacing: 2, userSelect: "none",
  }}>{text}</div>);
}

export function WindowPane({ x, y, w = 8, h = 10, lit = true, flickering = false }) {
  return (<div style={{
    position: "absolute", left: x, top: y, width: w, height: h,
    background: lit ? "linear-gradient(180deg, #05d9e844, #05d9e822)" : "#1a1a2e",
    border: "1px solid #333",
    animation: flickering ? "windowFlicker 4s ease-in-out infinite" : undefined,
    boxShadow: lit ? "0 0 6px rgba(5,217,232,0.3), inset 0 0 4px rgba(5,217,232,0.2)" : "none",
  }} />);
}

export function Antenna({ x, y, height = 40 }) {
  return (<div style={{ position: "absolute", left: x, top: y }}>
    <div style={{ width: 2, height, background: "linear-gradient(to top, #666, #888)", margin: "0 auto" }} />
    <div style={{
      position: "absolute", top: -2, left: -2, width: 6, height: 6, borderRadius: "50%", background: "#ff0000",
      animation: "blink 2s ease-in-out infinite", boxShadow: "0 0 6px #ff0000, 0 0 12px #ff000066",
    }} />
    <div style={{ position: "absolute", top: 8, left: -6, width: 14, height: 1, background: "#777" }} />
    <div style={{ position: "absolute", top: 18, left: -4, width: 10, height: 1, background: "#777" }} />
  </div>);
}

export function WeedTuft({ x, y, size = 1 }) {
  return (<div style={{ position: "absolute", left: x, top: y }}>
    {[-8, -3, 2, 6].map((o, i) => (
      <div key={i} style={{
        position: "absolute", left: o * size, bottom: 0, width: 2 * size, height: (8 + i * 3) * size,
        background: i % 2 === 0 ? "#2a6a2a" : "#3a7a3a", borderRadius: "50% 50% 0 0",
        transformOrigin: "bottom center",
        animation: `grassSway ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite alternate`,
      }} />
    ))}
  </div>);
}

export function Boombox({ x, y }) {
  return (<div style={{ position: "absolute", left: x, top: y }}>
    <div style={{ width: 24, height: 14, background: "#333", borderRadius: 3, border: "1px solid #555", position: "relative" }}>
      <div style={{ position: "absolute", left: 2, top: 3, width: 8, height: 8, borderRadius: "50%", border: "1px solid #666", background: "radial-gradient(circle, #444, #222)", animation: "speakerPulse 0.5s ease-in-out infinite" }} />
      <div style={{ position: "absolute", right: 2, top: 3, width: 8, height: 8, borderRadius: "50%", border: "1px solid #666", background: "radial-gradient(circle, #444, #222)", animation: "speakerPulse 0.5s ease-in-out 0.25s infinite" }} />
    </div>
    {[0, 1, 2].map(i => (
      <div key={i} style={{
        position: "absolute", left: 26 + i * 4, top: 2 + i, width: 4, height: 10 - i * 2,
        border: `1px solid ${PC.g1}${i === 2 ? "44" : i === 1 ? "88" : "cc"}`,
        borderLeft: "none", borderRadius: "0 50% 50% 0",
        animation: `soundWave 0.8s ease-in-out ${i * 0.15}s infinite`,
      }} />
    ))}
  </div>);
}

export function FireBarrel({ x, y }) {
  return (<div style={{ position: "absolute", left: x, top: y }}>
    <div style={{ width: 20, height: 26, background: "linear-gradient(90deg, #5a3a2a, #7a4a3a, #5a3a2a)", borderRadius: "2px 2px 4px 4px", position: "relative", boxShadow: "0 0 20px rgba(255,107,53,0.4), 0 0 40px rgba(255,42,109,0.2)" }}>
      <div style={{ position: "absolute", top: 6, left: 0, right: 0, height: 2, background: "#3a2a1a" }} />
      <div style={{ position: "absolute", top: 16, left: 0, right: 0, height: 2, background: "#3a2a1a" }} />
    </div>
    {[0, 1, 2, 3, 4].map(i => (
      <div key={i} style={{
        position: "absolute", left: 3 + i * 3.5, top: -8, width: 6, height: 14,
        background: i % 2 === 0 ? "linear-gradient(to top, #ff6b35, #ff2a6d, transparent)" : "linear-gradient(to top, #ffaa35, #ff6b35, transparent)",
        borderRadius: "50% 50% 20% 20%", animation: `flame ${0.3 + i * 0.1}s ease-in-out ${i * 0.05}s infinite alternate`,
        transformOrigin: "bottom center", opacity: 0.9,
      }} />
    ))}
    {[0, 1, 2].map(i => (
      <div key={`s${i}`} style={{
        position: "absolute", left: 5 + i * 5, top: -4, width: 2, height: 2, borderRadius: "50%", background: "#ffdd44",
        animation: `spark 1.5s ease-out ${i * 0.5}s infinite`,
      }} />
    ))}
    <div style={{ position: "absolute", left: -15, top: -20, width: 50, height: 50, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)", animation: "fireGlow 0.5s ease-in-out infinite alternate", pointerEvents: "none" }} />
  </div>);
}

export function WoodenCrate({ x, y }) {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <div style={{
        width: 18, height: 18, background: "linear-gradient(135deg, #8b5a2b, #6b4226)",
        border: "1px solid #3e2723", borderRadius: 1, position: "relative", boxShadow: "2px 2px 5px rgba(0,0,0,0.4)"
      }}>
        {/* Wood planks lines */}
        <div style={{ position: "absolute", top: 5, left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", top: 11, left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.3)" }} />
        {/* Metal corners */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 3, background: "#444" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 3, height: 3, background: "#444" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 3, height: 3, background: "#444" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 3, height: 3, background: "#444" }} />
        {/* Cross brace */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.3) 48%, rgba(0,0,0,0.3) 52%, transparent 55%)" }} />
      </div>
    </div>
  );
}
