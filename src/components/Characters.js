import { PC, SmokeParticle } from "./Helpers";

export function PunkStudent({ x, y, color, mohawkColor, direction = 1, walking = false, variant = 0, sitting = false, animatedArms = false }) {
  const legAnim = walking ? "legMove 0.4s ease-in-out infinite alternate" : undefined;
  const armAnim = animatedArms ? "massageArm 0.5s ease-in-out infinite alternate" : undefined;
  const headTop = sitting ? -2 : 2;
  return (
    <div style={{
      position: "absolute", left: x, top: y, transform: `scaleX(${direction})`,
      animation: walking ? "studentWalk 4s linear infinite" : undefined,
    }}>
      <div style={{ position: "absolute", left: -3, top: sitting ? 22 : 28, width: 16, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.3)" }} />
      {sitting ? (<>
        <div style={{ position: "absolute", left: 0, top: 18, width: 8, height: 3, background: "#222", borderRadius: 1 }} />
        <div style={{ position: "absolute", left: 0, top: 21, width: 3, height: 5, background: "#222", borderRadius: 1 }} />
        <div style={{ position: "absolute", left: 5, top: 21, width: 3, height: 5, background: "#222", borderRadius: 1 }} />
      </>) : (<>
        <div style={{ position: "absolute", left: 2, top: 22, width: 3, height: 8, background: "#222", borderRadius: 1, animation: legAnim, transformOrigin: "top center" }} />
        <div style={{ position: "absolute", left: 6, top: 22, width: 3, height: 8, background: "#222", borderRadius: 1, animation: walking ? "legMove 0.4s ease-in-out 0.2s infinite alternate" : undefined, transformOrigin: "top center" }} />
      </>)}
      <div style={{ position: "absolute", left: 0, top: sitting ? 8 : 12, width: 12, height: 12, background: color, borderRadius: 2 }}>
        {variant === 0 && <div style={{ position: "absolute", top: 3, left: 2, width: 8, height: 2, background: "rgba(255,255,255,0.3)", borderRadius: 1 }} />}
        {variant === 1 && <div style={{ position: "absolute", top: 2, left: 2, fontSize: 6, color: "#fff", lineHeight: 1 }}>A</div>}
      </div>

      {animatedArms && (
        <div style={{ position: "absolute", left: 4, top: 15, width: 2, height: 8, background: "#ddb892", borderRadius: 1, transformOrigin: "top center", animation: armAnim }} />
      )}

      <div style={{ position: "absolute", left: 1, top: headTop, width: 10, height: 10, background: "#ddb892", borderRadius: "50%" }} />
      {/* TWO EYES */}
      <div style={{ position: "absolute", left: 4, top: headTop + 3, width: 2, height: 2, background: "#111", borderRadius: "50%" }} />
      <div style={{ position: "absolute", left: 7, top: headTop + 3, width: 2, height: 2, background: "#111", borderRadius: "50%" }} />
      <div style={{
        position: "absolute", left: 3, top: headTop - 6, width: 6, height: 8, background: mohawkColor,
        clipPath: "polygon(0% 100%, 20% 30%, 40% 0%, 60% 20%, 80% 0%, 100% 100%)",
      }} />
    </div>
  );
}

export function PunkGirl({ x, y, hairColor, topColor, direction = 1, sitting = false, massaging = false, zIndex }) {
  const headTop = sitting ? -2 : 2;
  return (
    <div style={{
      position: "absolute", left: x, top: y, transform: `scaleX(${direction})`,
      animation: massaging ? "massageMove 1.5s ease-in-out infinite" : undefined,
      zIndex: zIndex
    }}>
      <div style={{ position: "absolute", left: -3, top: sitting ? 22 : 28, width: 16, height: 5, borderRadius: "50%", background: "rgba(0,0,0,0.25)" }} />
      {sitting ? (<>
        <div style={{ position: "absolute", left: 2, top: 18, width: 10, height: 4, background: "#111", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 2, top: 22, width: 3, height: 6, background: "#111", borderRadius: 1 }} />
        <div style={{ position: "absolute", left: 8, top: 22, width: 3, height: 6, background: "#111", borderRadius: 1 }} />
      </>) : (<>
        <div style={{ position: "absolute", left: 2, top: 22, width: 2.5, height: 9, background: "#1a1a1a", borderRadius: 1 }} />
        <div style={{ position: "absolute", left: 6, top: 22, width: 2.5, height: 9, background: "#1a1a1a", borderRadius: 1 }} />
      </>)}
      <div style={{ position: "absolute", left: 0, top: sitting ? 8 : 12, width: 12, height: 6, background: topColor, borderRadius: "3px 3px 0 0" }} />
      <div style={{ position: "absolute", left: 1, top: sitting ? 14 : 18, width: 10, height: 5, background: "#ddb088", borderRadius: "0 0 2px 2px" }} />
      {!sitting && <div style={{ position: "absolute", left: -1, top: 20, width: 14, height: 4, background: "#222", borderRadius: 2 }} />}
      <div style={{ position: "absolute", left: 1, top: headTop, width: 10, height: 10, background: "#e8c8a0", borderRadius: "50%" }} />
      {/* TWO EYES */}
      <div style={{ position: "absolute", left: 4, top: headTop + 3, width: 1.5, height: 2, background: "#111", borderRadius: "50%" }} />
      <div style={{ position: "absolute", left: 7, top: headTop + 3, width: 1.5, height: 2, background: "#111", borderRadius: "50%" }} />
      <div style={{ position: "absolute", left: 5.5, top: headTop + 6, width: 3, height: 1.5, background: "#cc4466", borderRadius: "0 0 50% 50%" }} />
      <div style={{
        position: "absolute", left: -1, top: headTop - 3, width: 14, height: 18, background: hairColor,
        borderRadius: "50% 50% 30% 30%",
        clipPath: "polygon(10% 0%, 90% 0%, 100% 40%, 95% 75%, 80% 100%, 55% 85%, 45% 85%, 20% 100%, 5% 75%, 0% 40%)",
        zIndex: -1,
      }} />
      {massaging && (<>
        <div style={{ position: "absolute", left: -3, top: 12, width: 4, height: 10, background: "#e8c8a0", borderRadius: 2, transform: "rotate(15deg)", animation: "massageArm 1.5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: 11, top: 12, width: 4, height: 10, background: "#e8c8a0", borderRadius: 2, transform: "rotate(-15deg)", animation: "massageArm 1.5s ease-in-out 0.75s infinite" }} />
      </>)}
    </div>
  );
}

export function Smoker({ x, y, color, mohawkColor }) {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <PunkStudent x={0} y={0} color={color} mohawkColor={mohawkColor} />
      <SmokeParticle x={6} y={-10} delay={0} size={5} />
      <SmokeParticle x={5} y={-15} delay={1.5} size={6} />
      <div style={{ position: "absolute", left: 7, top: 13, width: 4, height: 1, background: "#fff", transform: "rotate(-20deg)"}}>
        <div style={{ position: "absolute", right: -1, top: 0, width: 1, height: 1, background: "#ff4400" }} />
      </div>
    </div>
  );
}

export function Painter({ x, y, color, mohawkColor, direction = 1 }) {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <PunkStudent x={0} y={0} color={color} mohawkColor={mohawkColor} direction={direction} animatedArms />
      <div style={{ position: "absolute", left: direction === 1 ? 12 : -4, top: 10, width: 4, height: 8, background: "#777", borderRadius: 1, zIndex: 5 }}>
        <div style={{ position: "absolute", left: 1, top: -2, width: 2, height: 2, background: "#aaa" }} />
      </div>
    </div>
  );
}
