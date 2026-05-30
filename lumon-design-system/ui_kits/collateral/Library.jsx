// Library.jsx — Lumon Document Archive: left rail nav + document viewer.
const { useState: useStateLib } = React;

const DOCS = [
  { key: "checklist", nm: "Senior Refiner Checklist", meta: "MDR · Form 4A",     sect: "Macrodata Refinement", render: () => <ChecklistCard /> },
  { key: "review",    nm: "Performance Contention",   meta: "Review · pg. 20",    sect: "Macrodata Refinement", render: () => <PerformanceReview /> },
  { key: "perks",     nm: "Perks Letter",             meta: "Board Correspondence",sect: "Employee Relations",   render: () => <PerksLetter /> },
  { key: "handbook",  nm: "Security Protocol Guide",  meta: "Edition 23",         sect: "Security",             render: () => <HandbookCover /> },
  { key: "wayfinding",nm: "Wayfinding & Plaques",     meta: "Facilities · O&D",   sect: "Optics & Design",      render: () => <Wayfinding /> },
];

const SECTIONS = ["Macrodata Refinement", "Employee Relations", "Security", "Optics & Design"];

function Library() {
  const [active, setActive] = useStateLib("checklist");
  const doc = DOCS.find((d) => d.key === active);

  return (
    <div className="archive">
      <aside className="rail">
        <div className="brand">
          <img src="../../assets/lumon-globe-white.png" alt="Lumon" />
          <span className="t">Document<br />Archive</span>
        </div>
        {SECTIONS.map((s) => (
          <React.Fragment key={s}>
            <div className="sect">{s}</div>
            {DOCS.filter((d) => d.sect === s).map((d) => (
              <div key={d.key} className={"item" + (active === d.key ? " active" : "")} onClick={() => setActive(d.key)}>
                <span className="nm">{d.nm}</span>
                <span className="meta">{d.meta}</span>
              </div>
            ))}
          </React.Fragment>
        ))}
        <div className="foot">Property of Lumon Industries</div>
      </aside>

      <main className="viewer">
        <div className="viewer-inner">
          {doc.render()}
          <div className="doc-caption">{doc.nm} · {doc.meta}</div>
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Library />);
