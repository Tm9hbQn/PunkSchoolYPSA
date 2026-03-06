import { PC, WindowPane, Graffiti, NeonSign, Antenna, SmokeParticle, Boombox, WoodenCrate } from "./Helpers";
import { PunkStudent, PunkGirl } from "./Characters";

export function Armory() {
  return (
    <div style={{ position: "absolute", left: 750, top: 140 }}>
      <div style={{
        width: 110, height: 75, background: "linear-gradient(180deg, #3a3a3a, #2a2a2a)",
        border: "2px solid #444", borderRadius: 2, position: "relative",
        boxShadow: "3px 3px 15px rgba(0,0,0,0.6)",
      }}>
        <div style={{ position: "absolute", top: -8, left: -4, width: 118, height: 12, background: "linear-gradient(180deg, #333, #3a3a3a)", borderRadius: "2px 2px 0 0" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "repeating-linear-gradient(90deg, transparent 0px, transparent 20px, rgba(100,100,100,0.1) 20px, rgba(100,100,100,0.1) 22px)", pointerEvents: "none" }} />
        {[8, 28, 48, 68, 88].map(lx => [6, 30, 55].map(ly => (
          <div key={`r${lx}${ly}`} style={{ position: "absolute", left: lx, top: ly, width: 3, height: 3, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #777, #444)" }} />
        )))}
        <div style={{ position: "absolute", bottom: 0, left: 10, width: 35, height: 45, background: "linear-gradient(90deg, #333, #3a3a3a, #333)", border: "2px solid #555", borderRadius: "2px 2px 0 0" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line x1="2" y1="2" x2="31" y2="41" stroke="#555" strokeWidth="1" />
            <line x1="31" y1="2" x2="2" y2="41" stroke="#555" strokeWidth="1" />
          </svg>
          <div style={{ position: "absolute", top: 18, left: 12, width: 10, height: 8, background: "#aa8833", borderRadius: 2, border: "1px solid #886622" }}>
            <div style={{ position: "absolute", top: -5, left: 2, width: 6, height: 6, borderRadius: "50% 50% 0 0", border: "2px solid #886622", borderBottom: "none", background: "transparent" }} />
          </div>
        </div>
        <div style={{ position: "absolute", right: 15, top: 12, width: 20, height: 5, background: "rgba(5,217,232,0.15)", border: "1px solid #555" }} />
        <div style={{ position: "absolute", right: 15, top: 28, width: 20, height: 5, background: "rgba(5,217,232,0.1)", border: "1px solid #555" }} />
        <div style={{ position: "absolute", right: 10, top: 42, fontSize: 10, userSelect: "none" }}>☠️</div>
      </div>
      <div style={{ position: "absolute", left: 115, top: 30 }}>
        <div style={{ width: 22, height: 18, background: "linear-gradient(180deg, #5a4a2a, #4a3a1a)", border: "1px solid #6a5a3a", borderRadius: 1, position: "relative" }}>
          <div style={{ position: "absolute", top: 8, left: 2, right: 2, height: 1, background: "#6a5a3a" }} />
          <div style={{ position: "absolute", left: 10, top: 2, bottom: 2, width: 1, background: "#6a5a3a" }} />
        </div>
        <div style={{ position: "absolute", top: -14, left: 4, width: 18, height: 15, background: "linear-gradient(180deg, #4a5a2a, #3a4a1a)", border: "1px solid #5a6a3a", borderRadius: 1 }}>
          <div style={{ position: "absolute", top: 7, left: 2, right: 2, height: 1, background: "#5a6a3a" }} />
        </div>
      </div>

      <WoodenCrate x={-20} y={55} />
      <WoodenCrate x={-10} y={65} />
      <WoodenCrate x={0} y={58} />

      <Graffiti x={50} y={48} text="ARMS" color={PC.g1} size={10} />
      <NeonSign x={52} y={-14} text="ARMORY" color="#ff4444" />
      <PunkStudent x={-25} y={40} color="#222" mohawkColor="#ff0000" direction={1} variant={1} />
    </div>
  );
}

export function MainBuilding() {
  return (
    <div style={{ position: "absolute", left: 320, top: 120 }}>
      <div style={{ width: 180, height: 120, background: "linear-gradient(180deg, #4a4a5a, #3a3a4a)", border: "2px solid #333", borderRadius: "4px 4px 0 0", position: "relative", boxShadow: "4px 4px 20px rgba(0,0,0,0.5)" }}>
        <div style={{ position: "absolute", top: -20, left: -10, width: 200, height: 24, background: "linear-gradient(180deg, #2a2a3a, #3a3a4a)", clipPath: "polygon(5% 100%, 0% 0%, 100% 0%, 95% 100%)", borderBottom: `3px solid ${PC.g1}` }} />
        {[0,1,2,3,4,5].map(i => <WindowPane key={`a${i}`} x={12+i*28} y={16} lit={i!==2} flickering={i===4} />)}
        {[0,1,2,3,4,5].map(i => <WindowPane key={`b${i}`} x={12+i*28} y={40} lit={i!==0&&i!==5} flickering={i===1} />)}
        <div style={{ position: "absolute", bottom: 0, left: 70, width: 40, height: 50, background: "linear-gradient(180deg, #2a2a3a, #1a1a2e)", borderRadius: "8px 8px 0 0", border: "2px solid #444" }}>
          <div style={{ position: "absolute", top: 20, right: 6, width: 4, height: 4, borderRadius: "50%", background: "#aa8844" }} />
          <div style={{ position: "absolute", top: -8, left: 14, width: 12, height: 6, background: "#ffaa44", borderRadius: "50%", boxShadow: "0 0 15px #ffaa44, 0 0 30px #ffaa4444", animation: "doorLight 5s ease-in-out infinite" }} />
        </div>
        <Graffiti x={8} y={65} text="NO RULES" color={PC.g1} size={11} rotation={-3} />
        <Graffiti x={120} y={70} text="FREE" color={PC.g2} size={13} rotation={2} />
        <Graffiti x={12} y={10} text="ANARCHY" color={PC.g5} size={9} rotation={-2} />

        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <path d="M 30 0 L 35 20 L 28 35" stroke="#2a2a3a" strokeWidth="1" fill="none" />
          <path d="M 150 10 L 145 30 L 152 45 L 148 50" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div style={{ position: "absolute", top: -55, left: 85 }}>
        <div style={{ width: 2, height: 40, background: "#666" }} />
        <div style={{ position: "absolute", top: 2, left: 2, width: 30, height: 18, background: "#111", animation: "flagWave 2s ease-in-out infinite", transformOrigin: "left center", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: PC.g1, fontFamily: "'Permanent Marker', cursive", fontSize: 8 }}>☠</span>
        </div>
      </div>
      <Antenna x={20} y={-50} height={35} />
      <Antenna x={155} y={-45} height={30} />
      {[0,1,2,3,4].map(i => <SmokeParticle key={`ms${i}`} x={40+i*3} y={-25-i*5} delay={i*0.6} size={6+i*2} />)}
      <NeonSign x={55} y={-28} text="HQ" color={PC.neon} />
    </div>
  );
}

export function BasketballCourt({ tick }) {
  const cycle = 120;
  const phase = tick % cycle;
  const pAx = 30, pAy = 55, pBx = 110, pBy = 50;
  const dribbleY = (t) => Math.abs(Math.sin(t * 0.5)) * -10;
  let ballX, ballY, ballScale = 1;

  if (phase < 15) {
    ballX = pAx + 8; ballY = pAy + 22 + dribbleY(phase); ballScale = 1 - Math.abs(Math.sin(phase * 0.5)) * 0.15;
  } else if (phase < 50) {
    const t = (phase - 15) / 35;
    ballX = pAx + 8 + (pBx - pAx) * t;
    ballY = (pAy + 22) + (pBy + 22 - pAy - 22) * t + Math.sin(t * Math.PI) * -30;
    ballScale = 1 - Math.sin(t * Math.PI) * 0.2;
  } else if (phase < 65) {
    ballX = pBx; ballY = pBy + 22 + dribbleY(phase); ballScale = 1 - Math.abs(Math.sin(phase * 0.5)) * 0.15;
  } else if (phase < 100) {
    const t = (phase - 65) / 35;
    ballX = pBx + (pAx + 8 - pBx) * t;
    ballY = (pBy + 22) + (pAy + 22 - pBy - 22) * t + Math.sin(t * Math.PI) * -30;
    ballScale = 1 - Math.sin(t * Math.PI) * 0.2;
  } else {
    ballX = pAx + 8; ballY = pAy + 22 + dribbleY(phase); ballScale = 1 - Math.abs(Math.sin(phase * 0.5)) * 0.15;
  }

  const aD = phase < 15 || phase >= 100;
  const bD = phase >= 50 && phase < 65;

  return (
    <div style={{ position: "absolute", left: 80, top: 300 }}>
      <div style={{ width: 160, height: 100, background: "linear-gradient(135deg, #5a4a3a, #4a3a2a)", border: "2px solid #6a5a4a", borderRadius: 4, position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.15)" }} />
        <div style={{ position: "absolute", left: "25%", top: "25%", width: "50%", height: "50%", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <path d="M 20 0 L 25 30 L 18 60" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      {/* Hoops */}
      <div style={{ position: "absolute", left: -8, top: 25 }}>
        <div style={{ width: 3, height: 55, background: "#888", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: 0, left: 3, width: 16, height: 2, background: "#999" }} />
        <div style={{ position: "absolute", top: 2, left: 10, width: 14, height: 10, border: "2px solid #ff4444", borderRadius: "50%", borderTop: "none" }} />
      </div>
      <div style={{ position: "absolute", right: -8, top: 25 }}>
        <div style={{ width: 3, height: 55, background: "#888", borderRadius: 2, marginLeft: "auto" }} />
        <div style={{ position: "absolute", top: 0, right: 3, width: 16, height: 2, background: "#999" }} />
        <div style={{ position: "absolute", top: 2, right: 10, width: 14, height: 10, border: "2px solid #ff4444", borderRadius: "50%", borderTop: "none" }} />
      </div>
      <div style={{ animation: aD ? "gentleBob 0.5s ease-in-out infinite" : undefined, zIndex: 5, position: "relative" }}>
        <PunkStudent x={pAx} y={pAy} color="#222" mohawkColor={PC.g1} direction={1} variant={0} animatedArms />
      </div>
      <div style={{ animation: bD ? "gentleBob 0.5s ease-in-out infinite" : undefined, zIndex: 5, position: "relative" }}>
        <PunkStudent x={pBx} y={pBy} color="#444" mohawkColor={PC.g2} direction={-1} variant={1} animatedArms />
      </div>
      <div style={{
        position: "absolute", left: ballX, top: ballY,
        transform: `scale(${ballScale})`,
        transition: "left 0.08s linear, top 0.08s linear", zIndex: 20,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #ff8844, #cc5500)",
          border: "1px solid #aa4400", boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}>
          <div style={{ position: "absolute", top: 4, left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.2)" }} />
          <div style={{ position: "absolute", left: 4, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.2)" }} />
        </div>
        <div style={{ position: "absolute", left: -2, top: 14, width: 14, height: 4, borderRadius: "50%", background: "rgba(0,0,0,0.15)", transform: `scale(${ballScale})` }} />
      </div>
    </div>
  );
}

export function CampfireScene() {
  return (
    <div style={{ position: "absolute", left: 150, top: 460 }}>
      <Campfire x={50} y={20} />

      {/* Dude 1 (left) with girl on lap */}
      <div style={{ position: "absolute", left: 10, top: 10 }}>
        <PunkStudent x={5} y={0} color="#3a2244" mohawkColor={PC.g1} direction={1} sitting variant={0} />
        <PunkGirl x={0} y={-8} hairColor="#aa2255" topColor={PC.g1} direction={1} sitting zIndex={10} />
      </div>

      {/* Dude 2 (right) with girl on lap + masseuse behind */}
      <div style={{ position: "absolute", left: 90, top: 10 }}>
        <PunkStudent x={5} y={0} color="#224433" mohawkColor={PC.g2} direction={-1} sitting variant={1} />
        <PunkGirl x={0} y={-8} hairColor="#ddaa44" topColor={PC.g5} direction={-1} sitting zIndex={10} />
      </div>
      <PunkGirl x={100} y={-18} hairColor="#111" topColor={PC.g4} direction={-1} massaging />

      {/* Beer cans */}
      {[30, 78, 55].map((lx, i) => (
        <div key={`beer${i}`} style={{
          position: "absolute", left: lx, top: 38 + i * 3,
          width: 4, height: 7, background: "linear-gradient(180deg, #888, #aaa)",
          borderRadius: "1px 1px 0 0", border: "1px solid #666",
          transform: i === 1 ? "rotate(70deg)" : "none",
        }} />
      ))}
      <Boombox x={-15} y={35} />
      <Graffiti x={30} y={55} text="SQUAD" color={PC.g3} size={8} rotation={-3} />
    </div>
  );
}

export function Campfire({ x, y }) {
  return (<div style={{ position: "absolute", left: x, top: y }}>
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
      const a = (i / 8) * Math.PI * 2;
      return (<div key={i} style={{
        position: "absolute", left: 10 + Math.cos(a) * 14, top: 4 + Math.sin(a) * 8,
        width: 6, height: 5, borderRadius: "50%", background: i % 2 === 0 ? "#555" : "#666", border: "1px solid #444",
      }} />);
    })}
    <div style={{ position: "absolute", left: 6, top: 5, width: 22, height: 4, background: "#4a2a1a", borderRadius: 2, transform: "rotate(15deg)" }} />
    <div style={{ position: "absolute", left: 8, top: 6, width: 20, height: 4, background: "#3a2010", borderRadius: 2, transform: "rotate(-20deg)" }} />
    {[0, 1, 2, 3, 4, 5, 6].map(i => (
      <div key={`f${i}`} style={{
        position: "absolute", left: 6 + i * 3, top: -14 + (i % 2) * 4, width: 7, height: 18 - (i % 3) * 3,
        background: i % 3 === 0 ? "linear-gradient(to top, #ff6b35, #ffaa35, transparent)" : i % 3 === 1 ? "linear-gradient(to top, #ff2a6d, #ff6b35, transparent)" : "linear-gradient(to top, #ffdd44, #ff6b35, transparent)",
        borderRadius: "50% 50% 20% 20%", animation: `flame ${0.25 + i * 0.08}s ease-in-out ${i * 0.04}s infinite alternate`,
        transformOrigin: "bottom center", opacity: 0.9,
      }} />
    ))}
    <div style={{ position: "absolute", left: -30, top: -40, width: 100, height: 90, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,140,50,0.18) 0%, rgba(255,42,109,0.06) 50%, transparent 70%)", animation: "fireGlow 0.5s ease-in-out infinite alternate", pointerEvents: "none" }} />
    {[0, 1, 2, 3].map(i => (
      <div key={`cs${i}`} style={{
        position: "absolute", left: 10 + i * 5, top: -8, width: 2, height: 2, borderRadius: "50%", background: "#ffdd44",
        animation: `spark 2s ease-out ${i * 0.4}s infinite`,
      }} />
    ))}
    {[0, 1, 2, 3].map(i => <SmokeParticle key={`cfs${i}`} x={12 + i * 3} y={-20 - i * 4} delay={i * 0.7} size={6 + i * 2} />)}
  </div>);
}
