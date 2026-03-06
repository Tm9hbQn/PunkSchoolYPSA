import { PC, WeedTuft } from "./Helpers";

export function Rat({ startX, startY, visible }) {
  if (!visible) return null;
  return (<div style={{ position: "absolute", left: startX, top: startY, animation: "ratRun 2s linear forwards", zIndex: 50 }}>
    <div style={{ width: 10, height: 5, background: "#5a4a3a", borderRadius: "40% 60% 50% 50%" }} />
    <div style={{ position: "absolute", left: -6, top: 1, width: 8, height: 2, background: "#7a6a5a", borderRadius: 4, animation: "tailWag 0.2s ease-in-out infinite alternate" }} />
    <div style={{ position: "absolute", right: 1, top: 1, width: 2, height: 2, background: "#111", borderRadius: "50%" }} />
  </div>);
}

export function Bird({ y, visible }) {
  if (!visible) return null;
  return (<div style={{ position: "absolute", left: -20, top: y, animation: "birdFly 8s linear forwards", zIndex: 100 }}>
    <div style={{ width: 12, height: 3, position: "relative" }}>
      <div style={{ position: "absolute", left: 0, width: 6, height: 3, borderTop: "2px solid #222", borderRadius: "50% 50% 0 0", animation: "wingFlap 0.3s ease-in-out infinite alternate", transformOrigin: "right center" }} />
      <div style={{ position: "absolute", left: 6, width: 6, height: 3, borderTop: "2px solid #222", borderRadius: "50% 50% 0 0", animation: "wingFlap 0.3s ease-in-out 0.15s infinite alternate", transformOrigin: "left center" }} />
    </div>
  </div>);
}

const STARS = Array.from({ length: 60 }, () => ({
  x: Math.random() * 100, y: Math.random() * 25,
  size: Math.random() * 2 + 0.5, delay: Math.random() * 5, dur: 2 + Math.random() * 3,
}));

export function NightSky() {
  return (<>
    {STARS.map((s, i) => <div key={i} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: "50%", background: "#fff", opacity: 0.6, animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />)}
    <div style={{ position: "absolute", right: 80, top: 25, width: 40, height: 40, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffffdd, #ddddaa)", boxShadow: "0 0 20px rgba(255,255,200,0.3), 0 0 60px rgba(255,255,200,0.1)" }}>
      <div style={{ position: "absolute", top: 8, left: 12, width: 8, height: 8, borderRadius: "50%", background: "rgba(200,200,180,0.3)" }} />
      <div style={{ position: "absolute", top: 20, left: 22, width: 5, height: 5, borderRadius: "50%", background: "rgba(200,200,180,0.2)" }} />
    </div>
  </>);
}

export function GroundLayer() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(ellipse at 30% 50%, #1e3a1e 0%, transparent 40%),
        radial-gradient(ellipse at 70% 35%, #1e3a1e 0%, transparent 40%),
        radial-gradient(ellipse at 50% 75%, #1a3a1a 0%, transparent 35%),
        radial-gradient(ellipse at 20% 85%, #1a3a1a 0%, transparent 30%),
        radial-gradient(ellipse at 80% 80%, #1e3a1e 0%, transparent 35%),
        #1a1a2e`,
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect x="0" y="265" width="1050" height="30" fill="#3a3a4a" rx="2" opacity="0.7" />
        <rect x="0" y="267" width="1050" height="26" fill="#444455" rx="2" opacity="0.4" />
        <rect x="400" y="240" width="30" height="30" fill="#3a3a4a" rx="2" opacity="0.7" />
        <rect x="150" y="285" width="25" height="40" fill="#3a3a4a" rx="2" opacity="0.6" />
        <rect x="580" y="285" width="25" height="110" fill="#3a3a4a" rx="2" opacity="0.6" />
        <rect x="780" y="210" width="25" height="60" fill="#3a3a4a" rx="2" opacity="0.5" />
        <rect x="200" y="290" width="20" height="210" fill="#3a3a4a" rx="2" opacity="0.4" />
        <path d="M 100 267 L 105 278 L 98 290" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        <path d="M 300 270 L 310 280 L 305 293" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        <path d="M 500 268 L 495 275 L 502 290" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        <path d="M 700 270 L 698 278 L 705 290" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        <path d="M 900 268 L 895 276 L 902 288" stroke="#2a2a3a" strokeWidth="1" fill="none" />
      </svg>
      {[[50,200],[180,170],[270,305],[520,180],[680,320],[380,440],[130,460],
        [700,460],[460,500],[600,165],[760,280],[15,360],[200,520],
        [850,200],[920,350],[870,470],[950,260]].map(([wx,wy],i) => (
        <WeedTuft key={`w${i}`} x={wx} y={wy} size={0.5+(i%4)*0.2} />
      ))}
      <div style={{ position: "absolute", left: 220, top: 275, width: 30, height: 12, background: "radial-gradient(ellipse, rgba(5,217,232,0.08) 0%, transparent 70%)", borderRadius: "50%", animation: "puddle 4s ease-in-out infinite" }} />
      <div style={{ position: "absolute", left: 480, top: 273, width: 20, height: 8, background: "radial-gradient(ellipse, rgba(5,217,232,0.06) 0%, transparent 70%)", borderRadius: "50%", animation: "puddle 5s ease-in-out 1s infinite" }} />
      <div style={{ position: "absolute", left: 830, top: 270, width: 25, height: 10, background: "radial-gradient(ellipse, rgba(5,217,232,0.06) 0%, transparent 70%)", borderRadius: "50%", animation: "puddle 6s ease-in-out 2s infinite" }} />
    </div>
  );
}
