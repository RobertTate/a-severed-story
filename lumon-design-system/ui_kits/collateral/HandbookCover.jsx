// HandbookCover.jsx — Security Office Protocol manual cover (dark, embossed, angled).
function HandbookCover() {
  return (
    <div className="paper" style={{ width: 470, height: 600, background: "linear-gradient(150deg, #20242C 0%, #14181F 60%, #0E1218 100%)", color: "#C9CDD3", overflow: "hidden", borderRadius: 2 }}>
      <div className="cover-sheen"></div>
      <div style={{ position: "absolute", inset: 0, padding: "54px 48px", transform: "rotate(-4deg)", transformOrigin: "left top" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
          <img src="../../assets/lumon-globe-white.png" alt="Lumon" style={{ height: 30, opacity: 0.85 }} />
        </div>
        <h1 className="djr" style={{ margin: 0, fontWeight: 700, fontSize: 34, lineHeight: 1.12, letterSpacing: "0.01em", color: "#E6E9ED", textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>
          Security Office<br />Protocol Quick<br />Start Guides
        </h1>
        <div className="striped" style={{ height: 9, width: 200, margin: "20px 0 16px", color: "rgba(201,205,211,0.5)" }}></div>
        <p className="djr" style={{ margin: 0, fontSize: 14, fontStyle: "italic", letterSpacing: "0.04em", color: "rgba(201,205,211,0.72)" }}>
          A Compendium of Security Procedures
        </p>
        <p className="djr" style={{ margin: "4px 0 0", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,205,211,0.5)" }}>
          Edition 23
        </p>
      </div>
      {/* binder holes */}
      <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "space-evenly", paddingBlock: 80 }}>
        {[0,1,2].map(i => <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(0,0,0,0.55)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)" }}></span>)}
      </div>
    </div>
  );
}
Object.assign(window, { HandbookCover });
