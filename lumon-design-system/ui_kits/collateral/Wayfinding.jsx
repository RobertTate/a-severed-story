// Wayfinding.jsx — dimensional wall signage + Perpetuity Wing plaque.
function Wayfinding() {
  return (
    <div className="wall-surface paper" style={{ width: 600, height: 420, boxShadow: "var(--shadow-card)", position: "relative", overflow: "hidden" }}>
      {/* corridor seam */}
      <div style={{ position: "absolute", left: "38%", top: 0, bottom: 0, width: 1, background: "rgba(26,29,34,0.06)" }}></div>

      {/* wall sign: pipe + tracked caps */}
      <div style={{ position: "absolute", left: 52, top: 70, display: "flex", alignItems: "stretch", gap: 16 }}>
        <span style={{ width: 4, background: "var(--slate)", boxShadow: "1px 0 0 rgba(255,255,255,0.6)" }}></span>
        <span className="djr" style={{ fontWeight: 700, fontSize: 30, letterSpacing: "0.13em", textTransform: "uppercase", lineHeight: 1.05, color: "var(--slate)", textShadow: "0 1px 0 rgba(255,255,255,0.75), 0 -1px 1px rgba(0,0,0,0.22)" }}>
          Perpetuity<br />Wing
        </span>
      </div>

      {/* plaque */}
      <div style={{ position: "absolute", right: 48, bottom: 56, background: "#4E7E82", padding: 14, borderRadius: 2, boxShadow: "0 6px 18px -8px rgba(0,0,0,0.5)" }}>
        <div style={{ background: "#E9E8E0", border: "2px solid #9aa39f", padding: "16px 30px", textAlign: "center" }}>
          <div className="djr" style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", color: "var(--ink)" }}>CEO 1987–1999</div>
          <div className="djr" style={{ fontWeight: 800, fontSize: 22, letterSpacing: "0.03em", color: "var(--ink)", margin: "3px 0", textShadow: "0 1px 0 rgba(255,255,255,0.6), 0 -1px 1px rgba(0,0,0,0.25)" }}>PHILLIP "PIP" EAGAN</div>
          <div className="djr" style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", color: "var(--ink)" }}>1937–1999</div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { Wayfinding });
