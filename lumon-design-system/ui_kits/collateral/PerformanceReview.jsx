// PerformanceReview.jsx — a "Minor Performance Incidents (Contentions)" booklet page.
function PerformanceReview() {
  return (
    <div className="paper" style={{ width: 640, padding: "34px 40px 44px", background: "#C7E6E6", color: "#16302F" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
        <span className="doc-eyebrow" style={{ letterSpacing: "0.16em" }}>Minor Performance Incidents (Contentions)</span>
        <span className="djr tnum" style={{ fontWeight: 700, fontSize: 15 }}>20</span>
      </div>

      <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
        <div className="djr tnum" style={{ fontWeight: 800, fontSize: 88, lineHeight: 0.8, color: "rgba(22,48,47,0.30)", flex: "none" }}>1</div>
        <div style={{ flex: 1 }}>
          <h1 className="djr" style={{ margin: "0 0 16px", fontWeight: 800, fontSize: 34, lineHeight: 1.04 }}>
            Uses Too Many<br />Big Words
          </h1>
          <span className="contention-tag" style={{ background: "#5E8A89" }}>Contention</span>
        </div>
      </div>

      <p style={{ marginTop: 26, fontSize: 14.5, lineHeight: 1.6, textAlign: "justify" }}>
        Below is a word cloud of Seth Milchick's most frequently used words of the past quarter
        alone. It is recommended that Mr. Milchick begin simplifying his language so as to achieve
        clearer comprehension from his subordinates and peers.
      </p>

      <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: "8px 14px", alignItems: "baseline", color: "rgba(22,48,47,0.78)" }}>
        {[["Pursuant", 26], ["Notwithstanding", 18], ["Heretofore", 32], ["Egregious", 15],
          ["Subsequently", 22], ["Aforementioned", 28], ["Indubitably", 17], ["Henceforth", 24]].map(([w, s], i) => (
          <span key={i} className="djr" style={{ fontWeight: 700, fontSize: s }}>{w}</span>
        ))}
      </div>
    </div>
  );
}
Object.assign(window, { PerformanceReview });
