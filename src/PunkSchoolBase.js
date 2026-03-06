import { useState, useEffect, useRef } from "react";
import { PC, Boombox, Graffiti, FireBarrel, NeonSign } from "./components/Helpers";
import { PunkStudent, Smoker, Painter } from "./components/Characters";
import { Armory, MainBuilding, BasketballCourt, CampfireScene } from "./components/Buildings";
import { NightSky, GroundLayer, Rat, Bird } from "./components/Environment";

/* ─── WORKSHOP ─── */
function Workshop() {
  return (
    <div style={{ position: "absolute", left: 560, top: 200 }}>
      <div style={{ width: 130, height: 90, background: "linear-gradient(180deg, #3a3a4a, #2a2a3a)", border: "2px solid #333", borderRadius: 2, position: "relative", boxShadow: "3px 3px 15px rgba(0,0,0,0.5)" }}>
        <div style={{ position: "absolute", top: -12, left: -5, width: 140, height: 16, background: "repeating-linear-gradient(90deg, #3a3a4a 0px, #4a4a5a 3px, #3a3a4a 6px)", clipPath: "polygon(0% 100%, 3% 0%, 97% 0%, 100% 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 10, width: 50, height: 55, background: "repeating-linear-gradient(180deg, #333 0px, #444 4px, #333 5px)", borderRadius: "4px 4px 0 0", border: "1px solid #555" }} />
        <div style={{ position: "absolute", top: -22, left: 55, width: 20, height: 20, animation: "gearSpin 8s linear infinite" }}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="7" fill="none" stroke="#888" strokeWidth="2" />
            <circle cx="10" cy="10" r="3" fill="#666" />
            {[0,45,90,135].map(a => <rect key={a} x="9" y="1" width="2" height="6" fill="#888" transform={`rotate(${a} 10 10)`} />)}
          </svg>
        </div>
        <Graffiti x={70} y={55} text="RAID" color={PC.g4} size={12} rotation={-5} />
      </div>
      <FireBarrel x={-20} y={55} />
      <Smoker x={65} y={60} color="#333" mohawkColor={PC.g4} />
    </div>
  );
}

/* ─── WATCHTOWER ─── */
function Watchtower() {
  return (
    <div style={{ position: "absolute", left: 30, top: 130 }}>
      <div style={{ width: 35, height: 30, background: "linear-gradient(180deg, #4a4a5a, #3a3a4a)", border: "2px solid #333", position: "relative" }} />
      <div style={{ position: "absolute", left: 5, top: -70, width: 25, height: 70, background: "linear-gradient(90deg, #3a3a4a, #4a4a5a, #3a3a4a)", border: "1px solid #333" }}>
        {[0,1,2,3,4,5,6].map(i => <div key={i} style={{ position: "absolute", left: 3, top: 5+i*9, width: 8, height: 1, background: "#666" }} />)}
      </div>
      <div style={{ position: "absolute", left: -5, top: -82, width: 45, height: 15, background: "#4a4a5a", border: "2px solid #333", borderRadius: "2px 2px 0 0" }}>
        <div style={{ position: "absolute", top: -8, left: 0, right: 0, height: 8, borderLeft: "2px solid #555", borderRight: "2px solid #555", borderTop: "2px solid #555" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#555" }} />
        </div>
      </div>
      <PunkStudent x={5} y={-100} color="#1a1a2e" mohawkColor={PC.g5} variant={0} />
      <div style={{ position: "absolute", left: 30, top: -75, width: 40, height: 80, background: "linear-gradient(170deg, rgba(255,255,200,0.06) 0%, transparent 70%)", clipPath: "polygon(0% 0%, 100% 80%, 60% 100%)", animation: "searchLight 6s ease-in-out infinite", transformOrigin: "top left", pointerEvents: "none" }} />
    </div>
  );
}

/* ─── CAFETERIA ─── */
function Cafeteria() {
  return (
    <div style={{ position: "absolute", left: 550, top: 370 }}>
      <div style={{ width: 120, height: 70, background: "linear-gradient(180deg, #4a4a5a, #3a3a4a)", border: "2px solid #333", borderRadius: 3, position: "relative", boxShadow: "3px 3px 15px rgba(0,0,0,0.4)" }}>
        <div style={{ position: "absolute", top: -6, left: -3, width: 126, height: 8, background: "#3a3a4a", borderRadius: "2px 2px 0 0" }} />
        {[0,1].map(i => <div key={i} style={{ position: "absolute", top: -14, left: 20+i*60, width: 16, height: 10, background: "#555", borderRadius: "2px 2px 0 0" }}>
          <div style={{ position: "absolute", top: 0, left: 2, right: 2, height: "100%", background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, #444 2px, #444 3px)" }} />
        </div>)}
        <div style={{ position: "absolute", bottom: 0, left: 45, width: 28, height: 35, background: "#2a2a3a", borderRadius: "4px 4px 0 0", border: "1px solid #444" }} />
        <Graffiti x={5} y={42} text="EAT" color={PC.g3} size={14} />
      </div>
      <PunkStudent x={-45} y={25} color="#553355" mohawkColor="#ffdd00" variant={0} />
    </div>
  );
}

/* ─── SKATE RAMP ─── */
function SkateRamp() {
  return (
    <div style={{ position: "absolute", left: 280, top: 360 }}>
      <svg width="100" height="60" viewBox="0 0 100 60">
        <path d="M 0 60 Q 0 10, 40 10 L 60 10 Q 100 10, 100 60 Z" fill="#5a5a6a" stroke="#444" strokeWidth="1" />
        <path d="M 5 60 Q 5 15, 40 15 L 60 15 Q 95 15, 95 60 Z" fill="#4a4a5a" />
        <line x1="38" y1="8" x2="62" y2="8" stroke="#999" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <Graffiti x={25} y={25} text="SKATE" color={PC.g5} size={10} />
      <div style={{ position: "absolute", left: 35, top: -5, animation: "skaterMove 3s ease-in-out infinite" }}>
        <PunkStudent x={0} y={0} color="#2a2a4a" mohawkColor={PC.g1} variant={1} />
        <div style={{ position: "absolute", left: -2, top: 30, width: 16, height: 3, background: "#5a3a2a", borderRadius: 3 }}>
          <div style={{ position: "absolute", left: 2, bottom: -2, width: 3, height: 2, borderRadius: "50%", background: "#888", animation: "wheelSpin 0.3s linear infinite" }} />
          <div style={{ position: "absolute", right: 2, bottom: -2, width: 3, height: 2, borderRadius: "50%", background: "#888", animation: "wheelSpin 0.3s linear infinite" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── SCHOOL BUS ─── */
function SchoolBus() {
  return (
    <div style={{ position: "absolute", left: 100, top: 140 }}>
      <div style={{ width: 80, height: 30, background: "linear-gradient(180deg, #aa8822, #886611)", borderRadius: "4px 8px 2px 2px", border: "1px solid #665500", position: "relative", opacity: 0.8, transform: "rotate(-3deg)" }}>
        {[0,1,2,3].map(i => <div key={i} style={{ position: "absolute", left: 8+i*18, top: 4, width: 12, height: 10, background: i===1?"transparent":"rgba(100,150,200,0.2)", border: `1px solid ${i===1?"#665500":"#555"}`, clipPath: i===2?"polygon(0% 0%, 70% 0%, 100% 60%, 80% 100%, 0% 100%)":undefined }} />)}
        <div style={{ position: "absolute", bottom: -6, left: 8, width: 12, height: 8, background: "#222", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -6, right: 8, width: 12, height: 10, background: "#222", borderRadius: "50% 50% 30% 50%" }} />
        <Graffiti x={15} y={14} text="PUNX" color={PC.g1} size={8} rotation={5} />
      </div>
    </div>
  );
}

export default function PunkSchoolBase() {
  const [showRat, setShowRat] = useState(false);
  const [showBird, setShowBird] = useState(false);
  const [birdY, setBirdY] = useState(50);
  const [tick, setTick] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const r = setInterval(() => { setShowRat(true); setTimeout(() => setShowRat(false), 2000); }, 7000 + Math.random() * 5000);
    const b = setInterval(() => { setBirdY(20 + Math.random() * 60); setShowBird(true); setTimeout(() => setShowBird(false), 8000); }, 10000 + Math.random() * 8000);
    const t = setInterval(() => setTick(v => v + 1), 100);
    return () => { clearInterval(r); clearInterval(b); clearInterval(t); };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTop = (el.scrollHeight - el.clientHeight) * 0.3;
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0a14", overflow: "hidden", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes smokeRise{0%{transform:translateY(0) scale(1);opacity:.5}50%{transform:translateY(-20px) scale(1.8) translateX(5px);opacity:.3}100%{transform:translateY(-45px) scale(2.5) translateX(-3px);opacity:0}}
        @keyframes flame{0%{transform:scaleY(1) scaleX(1);opacity:.8}100%{transform:scaleY(1.3) scaleX(.8);opacity:1}}
        @keyframes spark{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-25px) translateX(8px);opacity:0}}
        @keyframes fireGlow{0%{opacity:.3;transform:scale(1)}100%{opacity:.5;transform:scale(1.1)}}
        @keyframes flagWave{0%{transform:scaleX(1) skewY(0)}25%{transform:scaleX(.95) skewY(2deg)}50%{transform:scaleX(1.02) skewY(-1deg)}75%{transform:scaleX(.97) skewY(1deg)}100%{transform:scaleX(1) skewY(0)}}
        @keyframes grassSway{0%{transform:rotate(-4deg)}100%{transform:rotate(4deg)}}
        @keyframes neonFlicker{0%,19%,21%,23%,25%,54%,56%,100%{opacity:1}20%,24%,55%{opacity:.3}}
        @keyframes blink{0%,45%,55%,100%{opacity:1}50%{opacity:.2}}
        @keyframes gearSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes windowFlicker{0%,90%,94%,98%,100%{opacity:1}92%,96%{opacity:.3}}
        @keyframes twinkle{0%,100%{opacity:.3}50%{opacity:1}}
        @keyframes studentWalk{0%{transform:translateX(0)}50%{transform:translateX(30px)}100%{transform:translateX(0)}}
        @keyframes legMove{0%{transform:rotate(-10deg)}100%{transform:rotate(10deg)}}
        @keyframes ratRun{0%{transform:translateX(0)}100%{transform:translateX(200px)}}
        @keyframes tailWag{0%{transform:rotate(-10deg)}100%{transform:rotate(10deg)}}
        @keyframes birdFly{0%{transform:translateX(0)}100%{transform:translateX(1100px)}}
        @keyframes wingFlap{0%{transform:rotateX(0)}100%{transform:rotateX(60deg)}}
        @keyframes searchLight{0%,100%{transform:rotate(-10deg);opacity:.4}50%{transform:rotate(15deg);opacity:.7}}
        @keyframes doorLight{0%,100%{opacity:.7}50%{opacity:1}}
        @keyframes puddle{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.1);opacity:.7}}
        @keyframes speakerPulse{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}
        @keyframes soundWave{0%{opacity:0;transform:scaleY(.5)}50%{opacity:1;transform:scaleY(1)}100%{opacity:0;transform:scaleY(.5)}}
        @keyframes skaterMove{0%,100%{transform:translateX(0) translateY(0)}25%{transform:translateX(-15px) translateY(-5px)}50%{transform:translateX(0) translateY(-10px)}75%{transform:translateX(15px) translateY(-5px)}}
        @keyframes wheelSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes patrolWalk{0%{left:60px}50%{left:850px}100%{left:60px}}
        @keyframes gentleBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes massageMove{0%,100%{transform:translateY(0)}50%{transform:translateY(-1px)}}
        @keyframes massageArm{0%{transform:rotate(12deg)}50%{transform:rotate(20deg)}100%{transform:rotate(12deg)}}
        @keyframes fadeHint{0%,60%{opacity:1}100%{opacity:0}}
        .scroll-container{overflow:auto;width:100vw;height:100vh;cursor:grab}
        .scroll-container:active{cursor:grabbing}
        .scroll-container::-webkit-scrollbar{width:8px;height:8px}
        .scroll-container::-webkit-scrollbar-track{background:rgba(20,20,40,0.8)}
        .scroll-container::-webkit-scrollbar-thumb{background:rgba(255,42,109,0.4);border-radius:4px}
        .scroll-container::-webkit-scrollbar-thumb:hover{background:rgba(255,42,109,0.6)}
      `}</style>

      <div ref={scrollRef} className="scroll-container"
        onMouseDown={e => {
          const el = scrollRef.current; if (!el) return;
          const sx = e.pageX, sy = e.pageY, sl = el.scrollLeft, st = el.scrollTop;
          const mv = ev => { el.scrollLeft = sl-(ev.pageX-sx); el.scrollTop = st-(ev.pageY-sy); };
          const up = () => { window.removeEventListener("mousemove",mv); window.removeEventListener("mouseup",up); };
          window.addEventListener("mousemove",mv); window.addEventListener("mouseup",up);
        }}
      >
        <div style={{ position: "relative", width: 1050, height: 650, minWidth: 1050, minHeight: 650, fontFamily: "monospace" }}>
          <NightSky />
          <GroundLayer />
          <Watchtower />
          <SchoolBus />
          <MainBuilding />
          <Workshop />
          <BasketballCourt tick={tick} />
          <SkateRamp />
          <Cafeteria />
          <Armory />
          <CampfireScene />

          <FireBarrel x={260} y={263} />
          <FireBarrel x={510} y={267} />
          <FireBarrel x={720} y={410} />
          <FireBarrel x={920} y={400} />

          <Boombox x={460} y={280} />

          <div style={{ position: "absolute", top: 237, animation: "patrolWalk 20s linear infinite" }}>
            <PunkStudent x={0} y={0} color="#443344" mohawkColor={PC.g2} walking variant={0} animatedArms />
          </div>
          <div style={{ position: "absolute", top: 241, left: 500, animation: "patrolWalk 25s linear 5s infinite" }}>
            <PunkStudent x={0} y={0} color="#334444" mohawkColor="#ffdd00" walking direction={-1} variant={1} animatedArms />
          </div>

          <div style={{ position: "absolute", left: 440, top: 265, animation: "gentleBob 3s ease-in-out infinite" }}>
            <PunkStudent x={0} y={0} color="#553322" mohawkColor={PC.g1} variant={0} animatedArms />
          </div>

          <Painter x={350} y={150} color="#222" mohawkColor={PC.g5} direction={-1} />

          <Graffiti x={630} y={295} text="¡REVOLT!" color={PC.g4} size={10} rotation={3} />
          <Graffiti x={70} y={280} text="☮" color={PC.g2} size={16} rotation={-5} />
          <Graffiti x={880} y={260} text="DIY" color={PC.g1} size={11} rotation={8} />
          <Graffiti x={950} y={310} text="CHAOS" color={PC.g5} size={9} rotation={-4} />

          <Rat startX={300} startY={300} visible={showRat} />
          <Bird y={birdY} visible={showBird} />

          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 60 }}>
            <path d="M 48 30 Q 200 50, 340 100" stroke="#444" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 500 130 Q 540 155, 575 195" stroke="#444" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 690 200 Q 720 180, 760 145" stroke="#444" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>

          <div style={{
            position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
            fontFamily: "'Permanent Marker', cursive", fontSize: 22, color: PC.g1,
            textShadow: `0 0 10px ${PC.g1}, 0 0 20px ${PC.g1}66, 2px 2px 0 #000`,
            letterSpacing: 4, zIndex: 70, animation: "neonFlicker 5s ease-in-out infinite",
            userSelect: "none", whiteSpace: "nowrap",
          }}>
            ★ REBEL BASE ★
          </div>
        </div>
      </div>

      <div style={{
        position: "fixed", bottom: 20, right: 20,
        fontFamily: "'Permanent Marker', cursive", fontSize: 12, color: "rgba(255,255,255,0.35)",
        animation: "fadeHint 5s ease-in-out forwards", zIndex: 200, pointerEvents: "none",
      }}>
        ↔ drag to explore ↕
      </div>
    </div>
  );
}
