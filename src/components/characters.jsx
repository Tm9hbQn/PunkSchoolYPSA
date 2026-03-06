import { PC } from "../constants/colors";
import { SmokeParticle } from "./primitives";

/* ────────────────────────────────────────────────────────
   PunkStudent
   Props: x, y, color, mohawkColor, direction, walking,
          variant, sitting, smoking, testId
   ──────────────────────────────────────────────────────── */
export function PunkStudent({
  x = 0, y = 0,
  color = "#333", mohawkColor = "#ff2a6d",
  direction = 1,
  walking = false,
  variant = 0,
  sitting = false,
  smoking = false,
  testId,
}) {
  const legAnim = walking ? "legMove 0.4s ease-in-out infinite alternate" : undefined;
  const headTop = sitting ? -2 : 2;

  return (
    <div
      data-testid={testId}
      style={{
        position: "absolute", left: x, top: y,
        transform: `scaleX(${direction})`,
        animation: walking ? "studentWalk 4s linear infinite" : undefined,
      }}
    >
      {/* Ground shadow */}
      <div style={{
        position: "absolute", left: -3, top: sitting ? 22 : 28,
        width: 16, height: 6, borderRadius: "50%",
        background: "rgba(0,0,0,0.3)",
      }} />

      {/* Legs */}
      {sitting ? (
        <>
          <div style={{ position: "absolute", left: 0, top: 18, width: 8, height: 3, background: "#222", borderRadius: 1 }} />
          <div style={{ position: "absolute", left: 0, top: 21, width: 3, height: 5, background: "#222", borderRadius: 1 }} />
          <div style={{ position: "absolute", left: 5, top: 21, width: 3, height: 5, background: "#222", borderRadius: 1 }} />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: 2, top: 22, width: 3, height: 8, background: "#222", borderRadius: 1, animation: legAnim, transformOrigin: "top center" }} />
          <div style={{ position: "absolute", left: 6, top: 22, width: 3, height: 8, background: "#222", borderRadius: 1, animation: walking ? "legMove 0.4s ease-in-out 0.2s infinite alternate" : undefined, transformOrigin: "top center" }} />
        </>
      )}

      {/* Body / torso */}
      <div style={{
        position: "absolute", left: 0, top: sitting ? 8 : 12,
        width: 12, height: 12, background: color, borderRadius: 2,
      }}>
        {variant === 0 && (
          <div style={{ position: "absolute", top: 3, left: 2, width: 8, height: 2, background: "rgba(255,255,255,0.3)", borderRadius: 1 }} />
        )}
        {variant === 1 && (
          <div style={{ position: "absolute", top: 2, left: 2, fontSize: 6, color: "#fff", lineHeight: 1 }}>A</div>
        )}
      </div>

      {/* Arms */}
      <div style={{ position: "absolute", left: -3, top: sitting ? 10 : 14, width: 4, height: 8, background: color, borderRadius: 2 }} />
      <div style={{ position: "absolute", left: 11, top: sitting ? 10 : 14, width: 4, height: 8, background: color, borderRadius: 2 }} />

      {/* Head */}
      <div style={{
        position: "absolute", left: 1, top: headTop,
        width: 10, height: 10, background: PC.skin, borderRadius: "50%",
      }} />
      {/* Eyes */}
      <div style={{ position: "absolute", left: 3, top: headTop + 3, width: 2, height: 2, background: "#111", borderRadius: "50%" }} />
      <div style={{ position: "absolute", left: 7, top: headTop + 3, width: 2, height: 2, background: "#111", borderRadius: "50%" }} />

      {/* Mohawk */}
      <div style={{
        position: "absolute", left: 3, top: headTop - 6, width: 6, height: 8,
        background: mohawkColor,
        clipPath: "polygon(0% 100%, 20% 30%, 40% 0%, 60% 20%, 80% 0%, 100% 100%)",
      }} />

      {/* Cigarette */}
      {smoking && (
        <>
          <div style={{
            position: "absolute", left: 10, top: headTop + 6,
            width: 6, height: 2,
            background: "linear-gradient(90deg, #eee 80%, #ff6633 20%)",
            borderRadius: 1, transformOrigin: "left center",
          }} />
          <SmokeParticle x={15} y={headTop + 1} delay={0} size={3} />
          <SmokeParticle x={17} y={headTop - 4} delay={0.7} size={4} />
        </>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   PunkGirl
   Props: x, y, hairColor, topColor, direction,
          sitting, massaging, onLap, smoking, testId
   ──────────────────────────────────────────────────────── */
export function PunkGirl({
  x = 0, y = 0,
  hairColor = "#cc2255",
  topColor = "#ff2a6d",
  direction = 1,
  sitting = false,
  massaging = false,
  onLap = false,      // sitting on someone's lap — changes leg rendering
  smoking = false,
  testId,
}) {
  const headTop = (sitting || onLap) ? -2 : 2;

  return (
    <div
      data-testid={testId}
      style={{
        position: "absolute", left: x, top: y,
        transform: `scaleX(${direction})`,
        animation: massaging ? "massageMove 1.5s ease-in-out infinite" : undefined,
      }}
    >
      {/* Ground shadow – hidden when on lap */}
      {!onLap && (
        <div style={{
          position: "absolute", left: -3, top: 22, width: 16, height: 5,
          borderRadius: "50%", background: "rgba(0,0,0,0.25)",
        }} />
      )}

      {/* Legs */}
      {onLap ? (
        /* Legs dangling forward off lap */
        <>
          <div style={{ position: "absolute", left: 2, top: 18, width: 2.5, height: 13, background: "#1a1a1a", borderRadius: 1, transform: "rotate(12deg)", transformOrigin: "top center" }} />
          <div style={{ position: "absolute", left: 6, top: 18, width: 2.5, height: 13, background: "#1a1a1a", borderRadius: 1, transform: "rotate(18deg)", transformOrigin: "top center" }} />
        </>
      ) : sitting ? (
        <>
          <div style={{ position: "absolute", left: 0, top: 18, width: 8, height: 3, background: "#1a1a1a", borderRadius: 1 }} />
          <div style={{ position: "absolute", left: 0, top: 21, width: 2.5, height: 5, background: "#1a1a1a", borderRadius: 1 }} />
          <div style={{ position: "absolute", left: 5, top: 21, width: 2.5, height: 5, background: "#1a1a1a", borderRadius: 1 }} />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: 2, top: 22, width: 2.5, height: 9, background: "#1a1a1a", borderRadius: 1 }} />
          <div style={{ position: "absolute", left: 6, top: 22, width: 2.5, height: 9, background: "#1a1a1a", borderRadius: 1 }} />
        </>
      )}

      {/* Top / shirt */}
      <div style={{
        position: "absolute", left: 0, top: (sitting || onLap) ? 8 : 12,
        width: 12, height: 6, background: topColor, borderRadius: "3px 3px 0 0",
      }} />
      {/* Midriff */}
      <div style={{
        position: "absolute", left: 1, top: (sitting || onLap) ? 14 : 18,
        width: 10, height: 4, background: "#ddb088", borderRadius: "0 0 2px 2px",
      }} />
      {/* Skirt */}
      <div style={{
        position: "absolute", left: -1, top: (sitting || onLap) ? 16 : 20,
        width: 14, height: onLap ? 5 : 4, background: "#222", borderRadius: 2,
      }} />

      {/* Head */}
      <div style={{
        position: "absolute", left: 1, top: headTop,
        width: 10, height: 10, background: PC.skinF, borderRadius: "50%",
      }} />
      {/* Eyes */}
      <div style={{ position: "absolute", left: 3, top: headTop + 3, width: 1.5, height: 2, background: "#111", borderRadius: "50%" }} />
      <div style={{ position: "absolute", left: 7, top: headTop + 3, width: 1.5, height: 2, background: "#111", borderRadius: "50%" }} />
      {/* Mouth */}
      <div style={{ position: "absolute", left: 4, top: headTop + 6.5, width: 3, height: 1.5, background: "#cc4466", borderRadius: "0 0 50% 50%" }} />

      {/* Hair */}
      <div style={{
        position: "absolute", left: -1, top: headTop - 3,
        width: 14, height: 18, background: hairColor,
        borderRadius: "50% 50% 30% 30%",
        clipPath: "polygon(10% 0%, 90% 0%, 100% 40%, 95% 75%, 80% 100%, 55% 85%, 45% 85%, 20% 100%, 5% 75%, 0% 40%)",
        zIndex: -1,
      }} />

      {/* Massaging arms */}
      {massaging && (
        <>
          <div style={{ position: "absolute", left: -3, top: 12, width: 4, height: 10, background: PC.skinF, borderRadius: 2, transform: "rotate(15deg)", animation: "massageArm 1.5s ease-in-out infinite" }} />
          <div style={{ position: "absolute", left: 11, top: 12, width: 4, height: 10, background: PC.skinF, borderRadius: 2, transform: "rotate(-15deg)", animation: "massageArm 1.5s ease-in-out 0.75s infinite" }} />
        </>
      )}

      {/* Cigarette */}
      {smoking && (
        <>
          <div style={{
            position: "absolute", left: 10, top: headTop + 6,
            width: 5, height: 1.5,
            background: "linear-gradient(90deg, #eee 80%, #ff6633 20%)",
            borderRadius: 1,
          }} />
          <SmokeParticle x={14} y={headTop + 2} delay={0} size={3} />
          <SmokeParticle x={16} y={headTop - 3} delay={0.6} size={4} />
        </>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   LapCouple
   Renders a PunkStudent sitting with a PunkGirl on his lap.
   The girl's bottom is positioned at the guy's thigh level.

   Pixel maths:
     PunkStudent sitting  – thighs at relative y=18
     PunkGirl "onLap"     – skirt bottom at relative y=21
     Offset = 18 - 21 = -3, so girl top = guyOrigin - 3
              (she sits slightly higher so her skirt rests on his thighs)
   ──────────────────────────────────────────────────────── */
export function LapCouple({
  x = 0, y = 0,
  guyColor, guyMohawk, guyVariant = 0,
  hairColor, topColor,
  direction = 1,
  extraMasseuse = null,   // { hairColor, topColor } — a third girl massaging the guy
  testId,
}) {
  return (
    <div data-testid={testId} style={{ position: "absolute", left: x, top: y }}>
      {/* ── Guy (behind) ── */}
      <div style={{ position: "absolute", zIndex: 1 }}>
        <PunkStudent
          x={0} y={0}
          color={guyColor} mohawkColor={guyMohawk}
          direction={direction} sitting variant={guyVariant}
        />
      </div>

      {/* ── Guy's arm around the girl ── */}
      <div style={{
        position: "absolute",
        left: direction === 1 ? -4 : 5, top: 11,
        width: 20, height: 3,
        background: guyColor, borderRadius: 2,
        transform: `rotate(${direction === 1 ? -6 : 6}deg)`,
        zIndex: 4,
      }} />

      {/* ── Girl on lap (in front) ── */}
      {/* Her skirt bottom (girlY + 21) should equal guy's thigh top (0 + 18) → girlY = -3 */}
      <div style={{ position: "absolute", top: -3, left: direction === 1 ? -1 : 2, zIndex: 3 }}>
        <PunkGirl
          x={0} y={0}
          hairColor={hairColor} topColor={topColor}
          direction={direction} onLap
        />
      </div>

      {/* ── Optional masseuse girl standing behind ── */}
      {extraMasseuse && (
        <div style={{ position: "absolute", top: -22, left: direction === 1 ? 6 : 0, zIndex: 0 }}>
          <PunkGirl
            x={0} y={0}
            hairColor={extraMasseuse.hairColor} topColor={extraMasseuse.topColor}
            direction={direction === 1 ? -1 : 1} massaging
          />
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   GraffitiPainter
   A PunkStudent spraying a wall with a can.
   ──────────────────────────────────────────────────────── */
export function GraffitiPainter({ x = 0, y = 0, color, mohawkColor, sprayColor, direction = -1, testId }) {
  const canLeft = direction === 1 ? 11 : -8;
  const sprayLeft = direction === 1 ? 19 : -16;

  return (
    <div data-testid={testId} style={{ position: "absolute", left: x, top: y }}>
      <PunkStudent x={0} y={0} color={color} mohawkColor={mohawkColor} direction={direction} variant={0} />

      {/* Extended arm holding can */}
      <div style={{
        position: "absolute", left: direction === 1 ? 9 : -5, top: 13,
        width: 10, height: 3, background: PC.skin, borderRadius: 2,
        transform: `rotate(${direction === 1 ? -15 : 15}deg)`,
        zIndex: 5,
      }} />

      {/* Spray can */}
      <div style={{
        position: "absolute", left: canLeft, top: 10,
        width: 4, height: 9,
        background: "linear-gradient(90deg, #cc2222, #aa1111)",
        borderRadius: "2px 2px 1px 1px",
        zIndex: 5,
      }}>
        <div style={{ position: "absolute", top: -2, left: 1, width: 2, height: 3, background: "#888", borderRadius: 1 }} />
      </div>

      {/* Spray particles */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          position: "absolute",
          left: sprayLeft + (direction === 1 ? i * 3 : -i * 3),
          top: 10 + Math.sin(i * 1.2) * 4,
          width: 2 + (i % 3), height: 2 + (i % 3),
          borderRadius: "50%",
          background: sprayColor || mohawkColor,
          opacity: 0.85 - i * 0.15,
          animation: `sprayDot ${0.5 + i * 0.18}s ease-out ${i * 0.1}s infinite`,
          zIndex: 5,
        }} />
      ))}
    </div>
  );
}
