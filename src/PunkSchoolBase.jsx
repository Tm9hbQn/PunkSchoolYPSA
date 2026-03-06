import { useState, useEffect, useRef } from "react";
import { PC } from "./constants/colors";
import { Graffiti, NeonSign, Boombox } from "./components/primitives";
import { PunkStudent } from "./components/characters";
import { FireBarrel, NightSky, GroundLayer, Rat, Bird } from "./components/environment";
import {
  CampfireScene,
  BasketballCourt,
  Armory,
  MainBuilding,
  Workshop,
  Watchtower,
  Cafeteria,
  SkateRamp,
  SchoolBus,
} from "./components/scenes";

/* ─────────────────────────────────────────────────────────
   PunkSchoolBase — main composition
   Scene canvas: 1050 × 660 px (scrollable)
   ───────────────────────────────────────────────────────── */
export default function PunkSchoolBase() {
  const [showRat, setShowRat]   = useState(false);
  const [showBird, setShowBird] = useState(false);
  const [birdY, setBirdY]       = useState(50);
  const [tick, setTick]         = useState(0);
  const scrollRef = useRef(null);

  /* Timers */
  useEffect(() => {
    const ratTimer = setInterval(() => {
      setShowRat(true);
      setTimeout(() => setShowRat(false), 2200);
    }, 7000 + Math.random() * 5000);

    const birdTimer = setInterval(() => {
      setBirdY(20 + Math.random() * 65);
      setShowBird(true);
      setTimeout(() => setShowBird(false), 8200);
    }, 10000 + Math.random() * 8000);

    const tickTimer = setInterval(() => setTick(v => v + 1), 100);

    return () => {
      clearInterval(ratTimer);
      clearInterval(birdTimer);
      clearInterval(tickTimer);
    };
  }, []);

  /* Initial scroll to show the interesting centre of the scene */
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.3;
      el.scrollTop  = (el.scrollHeight - el.clientHeight) * 0.25;
    }
  }, []);

  /* Drag-to-pan */
  const handleMouseDown = e => {
    const el = scrollRef.current;
    if (!el) return;
    const sx = e.pageX, sy = e.pageY, sl = el.scrollLeft, st = el.scrollTop;
    const mv = ev => {
      el.scrollLeft = sl - (ev.pageX - sx);
      el.scrollTop  = st - (ev.pageY - sy);
    };
    const up = () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", up);
  };

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "#0a0a14", overflow: "hidden", position: "relative",
    }}>
      <div
        ref={scrollRef}
        className="scroll-container"
        data-testid="punk-school-base"
        onMouseDown={handleMouseDown}
      >
        {/* ── Scene canvas ── */}
        <div style={{
          position: "relative",
          width: 1060, height: 660,
          minWidth: 1060, minHeight: 660,
          fontFamily: "monospace",
          overflow: "visible",
        }}>
          {/* Sky & ground */}
          <NightSky />
          <GroundLayer />

          {/* ── Buildings & structures ── */}
          <Watchtower />
          <SchoolBus />
          <MainBuilding />
          <Workshop />
          <BasketballCourt tick={tick} />
          <SkateRamp />
          <Cafeteria />
          <Armory />

          {/* ── Campfire hangout ── */}
          <CampfireScene />

          {/* ── Scattered fire barrels ── */}
          <FireBarrel x={258} y={262} />
          <FireBarrel x={508} y={266} />
          <FireBarrel x={718} y={408} />
          <FireBarrel x={918} y={398} />

          {/* ── Boombox near path ── */}
          <Boombox x={458} y={278} />

          {/* ── Patrol punks ── */}
          <div style={{ position: "absolute", top: 236, animation: "patrolWalk 20s linear infinite" }}>
            <PunkStudent x={0} y={0} color="#443344" mohawkColor={PC.g2} walking variant={0} />
          </div>
          <div style={{ position: "absolute", top: 240, left: 500, animation: "patrolWalk 26s linear 5s infinite" }}>
            <PunkStudent x={0} y={0} color="#334444" mohawkColor="#ffdd00" walking direction={-1} variant={1} />
          </div>

          {/* ── Lone punk hanging by the path ── */}
          <div style={{ position: "absolute", left: 438, top: 263, animation: "gentleBob 3.2s ease-in-out infinite" }}>
            <PunkStudent x={0} y={0} color="#553322" mohawkColor={PC.g1} variant={0} />
          </div>

          {/* ── Ground graffiti (path-level, stylised as floor art) ── */}
          <Graffiti x={350} y={298} text="ANARCHY"  color={PC.g5} size={9}  rotation={-2} />
          <Graffiti x={628} y={294} text="¡REVOLT!"  color={PC.g4} size={10} rotation={3}  />
          <Graffiti x={68}  y={278} text="☮"         color={PC.g2} size={16} rotation={-5} />
          <Graffiti x={878} y={258} text="DIY"        color={PC.g1} size={11} rotation={8}  />
          <Graffiti x={948} y={308} text="CHAOS"      color={PC.g5} size={9}  rotation={-4} />

          {/* ── Critters ── */}
          <Rat  startX={300} startY={298} visible={showRat} />
          <Bird y={birdY} visible={showBird} />

          {/* ── Rope / wire SVG overlay ── */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 60 }}>
            <path d="M 48 30 Q 200 52, 340 102"   stroke="#444" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 500 132 Q 540 157, 577 198" stroke="#444" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 690 202 Q 722 182, 762 147" stroke="#444" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>

          {/* ── Scene title banner ── */}
          <div style={{
            position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
            fontFamily: "'Permanent Marker', cursive", fontSize: 22, color: PC.g1,
            textShadow: `0 0 10px ${PC.g1}, 0 0 22px ${PC.g1}66, 2px 2px 0 #000`,
            letterSpacing: 4, zIndex: 70,
            animation: "neonFlicker 5s ease-in-out infinite",
            userSelect: "none", whiteSpace: "nowrap",
          }}>
            ★ REBEL BASE ★
          </div>
        </div>
      </div>

      {/* Drag hint — fades after 5 s */}
      <div style={{
        position: "fixed", bottom: 22, right: 22,
        fontFamily: "'Permanent Marker', cursive", fontSize: 12,
        color: "rgba(255,255,255,0.35)",
        animation: "fadeHint 5s ease-in-out forwards",
        zIndex: 200, pointerEvents: "none",
      }}>
        ↔ drag to explore ↕
      </div>
    </div>
  );
}
