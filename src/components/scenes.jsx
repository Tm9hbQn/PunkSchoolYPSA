import { PC } from "../constants/colors";
import { SmokeParticle, Graffiti, NeonSign, WindowPane, Antenna, WeedTuft, Boombox, WoodenCrate } from "./primitives";
import { PunkStudent, PunkGirl, LapCouple, GraffitiPainter } from "./characters";
import { FireBarrel, Campfire } from "./environment";

/* ────────────────────────────────────────────────────────
   CampfireScene
   Two LapCouples around a campfire; boombox; beers; squad tag
   ──────────────────────────────────────────────────────── */
export function CampfireScene() {
  return (
    <div data-testid="campfire-scene" style={{ position: "absolute", left: 140, top: 455 }}>
      {/* ── Boombox ── */}
      <Boombox x={-28} y={28} />

      {/* ── Left couple: guy (mohawk pink) + girl (red hair) on lap ── */}
      <LapCouple
        testId="lap-couple-left"
        x={0} y={2}
        guyColor="#3a2244" guyMohawk={PC.g1} guyVariant={0}
        hairColor="#aa2255" topColor={PC.g1}
        direction={1}
      />

      {/* ── Campfire centrepiece ── */}
      <Campfire x={58} y={18} />

      {/* ── Right couple: guy (mohawk cyan) + girl (blonde) + masseuse ── */}
      <LapCouple
        testId="lap-couple-right"
        x={105} y={2}
        guyColor="#224433" guyMohawk={PC.g2} guyVariant={1}
        hairColor="#ddaa44" topColor={PC.g5}
        direction={-1}
        extraMasseuse={{ hairColor: "#111", topColor: PC.g4 }}
      />

      {/* ── Beer cans on the ground ── */}
      {[32, 80, 56].map((lx, i) => (
        <div key={`beer${i}`} style={{
          position: "absolute", left: lx, top: 34 + i * 2,
          width: 4, height: 7,
          background: "linear-gradient(180deg, #888, #aaa)",
          borderRadius: "1px 1px 0 0", border: "1px solid #666",
          transform: i === 1 ? "rotate(68deg)" : "none",
        }} />
      ))}

      {/* ── "SQUAD" tag on implied ground surface ── */}
      {/* Rendered on a dark concrete slab so it looks intentionally placed */}
      <div style={{
        position: "absolute", left: 8, top: 52,
        width: 120, height: 14,
        background: "rgba(30,30,40,0.55)",
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.04)",
        overflow: "hidden",
      }}>
        <Graffiti x={22} y={0} text="SQUAD" color={PC.g3} size={10} rotation={-2} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   BasketballCourt  (tick → frame counter from main)
   Overflow visible so players + ball never get clipped.
   ──────────────────────────────────────────────────────── */
export function BasketballCourt({ tick }) {
  const cycle = 120;
  const phase = tick % cycle;

  const pAx = 22, pAy = 50, pBx = 102, pBy = 46;
  const dribbleY = t => Math.abs(Math.sin(t * 0.5)) * -10;

  let ballX, ballY, ballScale = 1;
  if (phase < 15) {
    ballX = pAx + 8; ballY = pAy + 20 + dribbleY(phase);
    ballScale = 1 - Math.abs(Math.sin(phase * 0.5)) * 0.15;
  } else if (phase < 50) {
    const t = (phase - 15) / 35;
    ballX = pAx + 8 + (pBx - pAx) * t;
    ballY = pAy + 20 + (pBy + 20 - pAy - 20) * t + Math.sin(t * Math.PI) * -34;
    ballScale = 1 - Math.sin(t * Math.PI) * 0.2;
  } else if (phase < 65) {
    ballX = pBx; ballY = pBy + 20 + dribbleY(phase);
    ballScale = 1 - Math.abs(Math.sin(phase * 0.5)) * 0.15;
  } else if (phase < 100) {
    const t = (phase - 65) / 35;
    ballX = pBx + (pAx + 8 - pBx) * t;
    ballY = pBy + 20 + (pAy + 20 - pBy - 20) * t + Math.sin(t * Math.PI) * -34;
    ballScale = 1 - Math.sin(t * Math.PI) * 0.2;
  } else {
    ballX = pAx + 8; ballY = pAy + 20 + dribbleY(phase);
    ballScale = 1 - Math.abs(Math.sin(phase * 0.5)) * 0.15;
  }

  const aD = phase < 15 || phase >= 100;
  const bD = phase >= 50 && phase < 65;

  return (
    <div
      data-testid="basketball-court"
      style={{ position: "absolute", left: 78, top: 300, overflow: "visible" }}
    >
      {/* Court surface */}
      <div style={{
        width: 162, height: 100,
        background: "linear-gradient(135deg, #5a4a3a, #4a3a2a)",
        border: "2px solid #6a5a4a", borderRadius: 4, position: "relative",
        overflow: "visible",
      }}>
        {/* Centre line */}
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.15)" }} />
        {/* Centre circle */}
        <div style={{ position: "absolute", left: "25%", top: "25%", width: "50%", height: "50%", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%" }} />
        {/* Paint lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
          <rect x="0" y="30" width="28" height="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <rect x="134" y="30" width="28" height="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </svg>
      </div>

      {/* Hoops */}
      <div style={{ position: "absolute", left: -10, top: 22, overflow: "visible" }}>
        <div style={{ width: 3, height: 58, background: "#888", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: 0, left: 3, width: 18, height: 2, background: "#999" }} />
        <div style={{ position: "absolute", top: 2, left: 11, width: 14, height: 10, border: "2px solid #ff4444", borderRadius: "50%", borderTop: "none" }} />
        {/* Backboard */}
        <div style={{ position: "absolute", top: -8, left: 4, width: 14, height: 10, background: "#555", border: "1px solid #777" }} />
      </div>
      <div style={{ position: "absolute", right: -10, top: 22, overflow: "visible" }}>
        <div style={{ width: 3, height: 58, background: "#888", borderRadius: 2, marginLeft: "auto" }} />
        <div style={{ position: "absolute", top: 0, right: 3, width: 18, height: 2, background: "#999" }} />
        <div style={{ position: "absolute", top: 2, right: 11, width: 14, height: 10, border: "2px solid #ff4444", borderRadius: "50%", borderTop: "none" }} />
        <div style={{ position: "absolute", top: -8, right: 4, width: 14, height: 10, background: "#555", border: "1px solid #777" }} />
      </div>

      {/* Players — rendered outside court div so they're never clipped */}
      <div style={{ position: "absolute", animation: aD ? "gentleBob 0.5s ease-in-out infinite" : undefined, overflow: "visible" }}>
        <PunkStudent x={pAx} y={pAy} color="#222" mohawkColor={PC.g1} direction={1} variant={0} />
      </div>
      <div style={{ position: "absolute", animation: bD ? "gentleBob 0.5s ease-in-out infinite" : undefined, overflow: "visible" }}>
        <PunkStudent x={pBx} y={pBy} color="#444" mohawkColor={PC.g2} direction={-1} variant={1} />
      </div>

      {/* Basketball */}
      <div style={{
        position: "absolute", left: ballX, top: ballY,
        transform: `scale(${ballScale})`,
        transition: "left 0.08s linear, top 0.08s linear",
        zIndex: 10, overflow: "visible",
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #ff8844, #cc5500)",
          border: "1px solid #aa4400",
          boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
        }}>
          <div style={{ position: "absolute", top: 4, left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.2)" }} />
          <div style={{ position: "absolute", left: 4, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.2)" }} />
        </div>
        {/* Ball shadow on court */}
        <div style={{
          position: "absolute", left: -2, top: 14, width: 14, height: 4,
          borderRadius: "50%", background: "rgba(0,0,0,0.18)",
          transform: `scaleX(${ballScale})`,
        }} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Armory
   ──────────────────────────────────────────────────────── */
export function Armory() {
  return (
    <div style={{ position: "absolute", left: 745, top: 135 }}>
      {/* Main building */}
      <div style={{
        width: 110, height: 76,
        background: "linear-gradient(180deg, #3a3a3a, #2a2a2a)",
        border: "2px solid #444", borderRadius: 2,
        position: "relative",
        boxShadow: "3px 3px 18px rgba(0,0,0,0.65)",
      }}>
        {/* Roof strip */}
        <div style={{ position: "absolute", top: -9, left: -4, width: 118, height: 12, background: "linear-gradient(180deg, #333, #3a3a3a)", borderRadius: "2px 2px 0 0" }} />
        {/* Metal rivet pattern */}
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, transparent 0px, transparent 20px, rgba(100,100,100,0.08) 20px, rgba(100,100,100,0.08) 22px)", pointerEvents: "none" }} />
        {/* Rivets */}
        {[8, 28, 48, 68, 88].flatMap(lx => [6, 30, 54].map(ly => (
          <div key={`r${lx}${ly}`} style={{ position: "absolute", left: lx, top: ly, width: 3, height: 3, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #777, #444)" }} />
        )))}
        {/* Door */}
        <div style={{
          position: "absolute", bottom: 0, left: 10, width: 36, height: 46,
          background: "linear-gradient(90deg, #333, #3a3a3a, #333)",
          border: "2px solid #555", borderRadius: "2px 2px 0 0",
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line x1="2" y1="2" x2="31" y2="41" stroke="#555" strokeWidth="1" />
            <line x1="31" y1="2" x2="2" y2="41" stroke="#555" strokeWidth="1" />
          </svg>
          {/* Padlock */}
          <div style={{ position: "absolute", top: 18, left: 12, width: 10, height: 8, background: "#aa8833", borderRadius: 2, border: "1px solid #886622" }}>
            <div style={{ position: "absolute", top: -5, left: 2, width: 6, height: 6, borderRadius: "50% 50% 0 0", border: "2px solid #886622", borderBottom: "none", background: "transparent" }} />
          </div>
        </div>
        {/* Shelves */}
        <div style={{ position: "absolute", right: 15, top: 12, width: 20, height: 5, background: "rgba(5,217,232,0.15)", border: "1px solid #555" }} />
        <div style={{ position: "absolute", right: 15, top: 28, width: 20, height: 5, background: "rgba(5,217,232,0.1)",  border: "1px solid #555" }} />
        {/* Skull */}
        <div style={{ position: "absolute", right: 10, top: 42, fontSize: 10, userSelect: "none" }}>☠️</div>
        <Graffiti x={52} y={48} text="ARMS" color={PC.g1} size={10} />
      </div>

      {/* Neon sign */}
      <NeonSign x={48} y={-16} text="ARMORY" color="#ff4444" />

      {/* ── Wooden crates stacked outside ── */}
      <div data-testid="wooden-crates">
        <WoodenCrate x={-38} y={52} w={22} h={16} label="⚠" />
        <WoodenCrate x={-38} y={36} w={22} h={16} label="⚠" />
        <WoodenCrate x={-20} y={44} w={18} h={14} />
        {/* Small crate on top */}
        <WoodenCrate x={-30} y={24} w={14} h={12} label="☠" />
      </div>

      {/* Small shed / ammo box to the right */}
      <div style={{ position: "absolute", left: 116, top: 28 }}>
        <div style={{ width: 22, height: 18, background: "linear-gradient(180deg, #5a4a2a, #4a3a1a)", border: "1px solid #6a5a3a", borderRadius: 1, position: "relative" }}>
          <div style={{ position: "absolute", top: 8, left: 2, right: 2, height: 1, background: "#6a5a3a" }} />
          <div style={{ position: "absolute", left: 10, top: 2, bottom: 2, width: 1, background: "#6a5a3a" }} />
        </div>
        {/* Lid */}
        <div style={{ position: "absolute", top: -14, left: 4, width: 18, height: 15, background: "linear-gradient(180deg, #4a5a2a, #3a4a1a)", border: "1px solid #5a6a3a", borderRadius: 1 }}>
          <div style={{ position: "absolute", top: 7, left: 2, right: 2, height: 1, background: "#5a6a3a" }} />
        </div>
      </div>

      {/* Sandbags */}
      {[0, 1, 2].map(i => (
        <div key={`sb${i}`} style={{
          position: "absolute", left: -15 + i * 14, top: 60,
          width: 16, height: 10,
          background: "linear-gradient(180deg, #7a7a5a, #6a6a4a)",
          borderRadius: "30% 30% 40% 40%", border: "1px solid #5a5a3a",
        }} />
      ))}

      {/* Guard punk */}
      <PunkStudent x={-28} y={38} color="#222" mohawkColor="#ff0000" direction={1} variant={1} smoking />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   MainBuilding
   ──────────────────────────────────────────────────────── */
export function MainBuilding() {
  return (
    <div style={{ position: "absolute", left: 320, top: 125 }}>
      {/* Body */}
      <div style={{
        width: 180, height: 122,
        background: "linear-gradient(180deg, #4a4a5a, #3a3a4a)",
        border: "2px solid #333", borderRadius: "4px 4px 0 0",
        position: "relative", boxShadow: "4px 4px 22px rgba(0,0,0,0.55)",
      }}>
        {/* Roof cornice */}
        <div style={{
          position: "absolute", top: -22, left: -10, width: 200, height: 24,
          background: "linear-gradient(180deg, #2a2a3a, #3a3a4a)",
          clipPath: "polygon(5% 100%, 0% 0%, 100% 0%, 95% 100%)",
          borderBottom: `3px solid ${PC.g1}`,
        }} />
        {/* Windows row 1 */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <WindowPane key={`a${i}`} x={12 + i * 28} y={16} lit={i !== 2} flickering={i === 4} />
        ))}
        {/* Windows row 2 */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <WindowPane key={`b${i}`} x={12 + i * 28} y={40} lit={i !== 0 && i !== 5} flickering={i === 1} />
        ))}
        {/* Door */}
        <div style={{
          position: "absolute", bottom: 0, left: 70, width: 40, height: 52,
          background: "linear-gradient(180deg, #2a2a3a, #1a1a2e)",
          borderRadius: "8px 8px 0 0", border: "2px solid #444",
        }}>
          <div style={{ position: "absolute", top: 20, right: 6, width: 4, height: 4, borderRadius: "50%", background: "#aa8844" }} />
          {/* Door light */}
          <div style={{
            position: "absolute", top: -8, left: 14, width: 12, height: 6,
            background: "#ffaa44", borderRadius: "50%",
            boxShadow: "0 0 15px #ffaa44, 0 0 30px #ffaa4444",
            animation: "doorLight 5s ease-in-out infinite",
          }} />
        </div>
        {/* Graffiti on wall — these stay ON the building */}
        <Graffiti testId="graffiti-no-rules" x={8}   y={65} text="NO RULES" color={PC.g1} size={11} rotation={-3} />
        <Graffiti x={122} y={70} text="FREE"     color={PC.g2} size={13} rotation={2} />
        {/* Water stain lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <path d="M 30 0 L 35 20 L 28 35"          stroke="#2a2a3a" strokeWidth="1" fill="none" />
          <path d="M 150 10 L 145 30 L 152 45 L 148 50" stroke="#2a2a3a" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Flag pole */}
      <div style={{ position: "absolute", top: -58, left: 85 }}>
        <div style={{ width: 2, height: 42, background: "#666" }} />
        <div style={{
          position: "absolute", top: 2, left: 2, width: 32, height: 19,
          background: "#111",
          animation: "flagWave 2s ease-in-out infinite",
          transformOrigin: "left center",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: PC.g1, fontFamily: "'Permanent Marker', cursive", fontSize: 9 }}>☠</span>
        </div>
      </div>

      {/* Antennas */}
      <Antenna x={20}  y={-52} height={36} />
      <Antenna x={155} y={-47} height={30} />
      {/* Smoke from chimney */}
      {[0, 1, 2, 3, 4].map(i => (
        <SmokeParticle key={`ms${i}`} x={40 + i * 3} y={-28 - i * 5} delay={i * 0.6} size={6 + i * 2} />
      ))}
      {/* HQ sign */}
      <NeonSign x={55} y={-30} text="HQ" color={PC.neon} />

      {/* Graffiti painter on wall */}
      <GraffitiPainter
        testId="graffiti-painter"
        x={148} y={68}
        color="#332244" mohawkColor={PC.g5}
        sprayColor={PC.g5} direction={-1}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Workshop
   ──────────────────────────────────────────────────────── */
export function Workshop() {
  return (
    <div style={{ position: "absolute", left: 558, top: 198 }}>
      <div style={{
        width: 132, height: 92,
        background: "linear-gradient(180deg, #3a3a4a, #2a2a3a)",
        border: "2px solid #333", borderRadius: 2,
        position: "relative", boxShadow: "3px 3px 16px rgba(0,0,0,0.55)",
      }}>
        {/* Corrugated roof */}
        <div style={{
          position: "absolute", top: -13, left: -5, width: 142, height: 17,
          background: "repeating-linear-gradient(90deg, #3a3a4a 0px, #4a4a5a 3px, #3a3a4a 6px)",
          clipPath: "polygon(0% 100%, 3% 0%, 97% 0%, 100% 100%)",
        }} />
        {/* Roller door */}
        <div style={{
          position: "absolute", bottom: 0, left: 10, width: 52, height: 57,
          background: "repeating-linear-gradient(180deg, #333 0px, #444 4px, #333 5px)",
          borderRadius: "4px 4px 0 0", border: "1px solid #555",
        }} />
        {/* Window */}
        <WindowPane x={80} y={16} w={32} h={22} lit />
        {/* Gear icon */}
        <div style={{ position: "absolute", top: -24, left: 54, width: 22, height: 22, animation: "gearSpin 8s linear infinite" }}>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <circle cx="11" cy="11" r="7" fill="none" stroke="#888" strokeWidth="2" />
            <circle cx="11" cy="11" r="3" fill="#666" />
            {[0, 45, 90, 135].map(a => (
              <rect key={a} x="10" y="1" width="2" height="6" fill="#888" transform={`rotate(${a} 11 11)`} />
            ))}
          </svg>
        </div>
        <Graffiti x={72} y={57} text="RAID" color={PC.g4} size={12} rotation={-5} />
      </div>

      {/* Smoke from workshop */}
      {[0, 1, 2].map(i => (
        <SmokeParticle key={`ws${i}`} x={100 + i * 4} y={-16 - i * 4} delay={i * 0.8} size={5 + i * 2} />
      ))}
      <FireBarrel x={-22} y={54} />
      {/* Mechanic punk */}
      <PunkStudent x={62} y={58} color="#333" mohawkColor={PC.g4} variant={1} />
      {/* Smoking student outside */}
      <PunkStudent
        testId="smoker"
        x={-40} y={58}
        color="#2a2a3a" mohawkColor={PC.g2}
        variant={0} direction={1} smoking
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Watchtower  — moved down so top is within scene bounds
   ──────────────────────────────────────────────────────── */
export function Watchtower() {
  return (
    <div data-testid="watchtower" style={{ position: "absolute", left: 28, top: 130 }}>
      {/* Base platform */}
      <div style={{
        width: 36, height: 30,
        background: "linear-gradient(180deg, #4a4a5a, #3a3a4a)",
        border: "2px solid #333", position: "relative",
      }} />
      {/* Ladder shaft */}
      <div style={{
        position: "absolute", left: 5, top: -68, width: 26, height: 68,
        background: "linear-gradient(90deg, #3a3a4a, #4a4a5a, #3a3a4a)",
        border: "1px solid #333",
      }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 3, top: 5 + i * 9, width: 20, height: 1, background: "#666" }} />
        ))}
      </div>
      {/* Lookout platform */}
      <div style={{
        position: "absolute", left: -6, top: -80, width: 48, height: 15,
        background: "#4a4a5a", border: "2px solid #333", borderRadius: "2px 2px 0 0",
      }}>
        {/* Battlements */}
        <div style={{
          position: "absolute", top: -9, left: 0, right: 0, height: 9,
          borderLeft: "2px solid #555", borderRight: "2px solid #555", borderTop: "2px solid #555",
        }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#555" }} />
        </div>
      </div>
      {/* Guard punk on tower */}
      <PunkStudent x={3} y={-97} color="#1a1a2e" mohawkColor={PC.g5} variant={0} />
      {/* Searchlight beam */}
      <div style={{
        position: "absolute", left: 30, top: -72,
        width: 44, height: 84,
        background: "linear-gradient(170deg, rgba(255,255,200,0.07) 0%, transparent 70%)",
        clipPath: "polygon(0% 0%, 100% 80%, 60% 100%)",
        animation: "searchLight 6s ease-in-out infinite",
        transformOrigin: "top left", pointerEvents: "none",
      }} />
      <Antenna x={18} y={-102} height={24} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Cafeteria
   ──────────────────────────────────────────────────────── */
export function Cafeteria() {
  return (
    <div style={{ position: "absolute", left: 548, top: 368 }}>
      <div style={{
        width: 122, height: 72,
        background: "linear-gradient(180deg, #4a4a5a, #3a3a4a)",
        border: "2px solid #333", borderRadius: 3,
        position: "relative", boxShadow: "3px 3px 16px rgba(0,0,0,0.45)",
      }}>
        {/* Gutter strip */}
        <div style={{ position: "absolute", top: -7, left: -3, width: 128, height: 9, background: "#3a3a4a", borderRadius: "2px 2px 0 0" }} />
        {/* Chimneys */}
        {[0, 1].map(i => (
          <div key={i} style={{
            position: "absolute", top: -16, left: 18 + i * 62, width: 16, height: 11,
            background: "#555", borderRadius: "2px 2px 0 0",
          }}>
            <div style={{ position: "absolute", top: 0, left: 2, right: 2, height: "100%", background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, #444 2px, #444 3px)" }} />
          </div>
        ))}
        {/* Windows */}
        {[0, 1, 2].map(i => (
          <WindowPane key={i} x={10 + i * 36} y={16} w={22} h={15} lit flickering={i === 1} />
        ))}
        {/* Door */}
        <div style={{ position: "absolute", bottom: 0, left: 46, width: 28, height: 37, background: "#2a2a3a", borderRadius: "4px 4px 0 0", border: "1px solid #444" }} />
        {/* Signs */}
        <Graffiti x={5} y={44} text="EAT" color={PC.g3} size={14} />
        <NeonSign x={68} y={44} text="OPEN" color={PC.neon2} />
      </div>
      {/* Smoke */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <SmokeParticle key={`cf${i}`} x={24 + i * 5} y={-20 - i * 3} delay={i * 0.5} size={4 + i * 1.5} />
      ))}
      {/* Hanging-around punk */}
      <PunkStudent x={-48} y={26} color="#553355" mohawkColor="#ffdd00" variant={0} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   SkateRamp
   ──────────────────────────────────────────────────────── */
export function SkateRamp() {
  return (
    <div style={{ position: "absolute", left: 278, top: 358 }}>
      <svg width="104" height="62" viewBox="0 0 104 62">
        <path d="M 0 62 Q 0 12, 42 12 L 62 12 Q 104 12, 104 62 Z" fill="#5a5a6a" stroke="#444" strokeWidth="1" />
        <path d="M 5 62 Q 5 17, 42 17 L 62 17 Q 99 17, 99 62 Z" fill="#4a4a5a" />
        {/* Top rail */}
        <line x1="40" y1="10" x2="64" y2="10" stroke="#999" strokeWidth="2" strokeLinecap="round" />
        {/* Graffiti on ramp face */}
        <text x="22" y="48" fontFamily="monospace" fontSize="9" fill="#7b2ff744" transform="rotate(-8, 22, 48)">SKATE</text>
      </svg>
      <Graffiti x={26} y={26} text="SKATE" color={PC.g5} size={10} />
      {/* Skater */}
      <div style={{ position: "absolute", left: 34, top: -6, animation: "skaterMove 3s ease-in-out infinite" }}>
        <PunkStudent x={0} y={0} color="#2a2a4a" mohawkColor={PC.g1} variant={1} />
        {/* Skateboard */}
        <div style={{ position: "absolute", left: -2, top: 30, width: 16, height: 3, background: "#5a3a2a", borderRadius: 3 }}>
          <div style={{ position: "absolute", left: 2,  bottom: -2, width: 3, height: 2, borderRadius: "50%", background: "#888", animation: "wheelSpin 0.3s linear infinite" }} />
          <div style={{ position: "absolute", right: 2, bottom: -2, width: 3, height: 2, borderRadius: "50%", background: "#888", animation: "wheelSpin 0.3s linear infinite" }} />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   SchoolBus
   ──────────────────────────────────────────────────────── */
export function SchoolBus() {
  return (
    <div style={{ position: "absolute", left: 98, top: 142 }}>
      <div style={{
        width: 82, height: 30,
        background: "linear-gradient(180deg, #aa8822, #886611)",
        borderRadius: "4px 8px 2px 2px",
        border: "1px solid #665500",
        position: "relative", opacity: 0.85,
        transform: "rotate(-3deg)",
      }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute", left: 8 + i * 18, top: 4,
            width: 12, height: 10,
            background: i === 1 ? "transparent" : "rgba(100,150,200,0.2)",
            border: `1px solid ${i === 1 ? "#665500" : "#555"}`,
            clipPath: i === 2 ? "polygon(0% 0%, 70% 0%, 100% 60%, 80% 100%, 0% 100%)" : undefined,
          }} />
        ))}
        {/* Wheels */}
        <div style={{ position: "absolute", bottom: -6, left: 8,  width: 12, height: 8, background: "#222", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -6, right: 8, width: 12, height: 10, background: "#222", borderRadius: "50% 50% 30% 50%" }} />
        <Graffiti x={16} y={14} text="PUNX" color={PC.g1} size={8} rotation={5} />
      </div>
      <WeedTuft x={-10} y={28} size={0.5} />
      <WeedTuft x={78}  y={30} size={0.5} />
    </div>
  );
}
