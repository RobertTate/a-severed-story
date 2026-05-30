// ChecklistCard.jsx — Senior Refiner Morning Checklist (interactive).
const { useState: useStateCL } = React;

function ChecklistCard() {
  const [items, setItems] = useStateCL([
    { t: "Brew a pot of coffee.", done: true },
    { t: "Inspect your terminal for irregularities.", done: false },
    { t: "Confirm bin calibration (01–05).", done: false },
    { t: "Review the day's refinement quota.", done: false },
    { t: "Select one record for morning listening.", done: false },
  ]);
  const toggle = (i) => setItems((p) => p.map((it, k) => (k === i ? { ...it, done: !it.done } : it)));

  return (
    <div className="paper" style={{ width: 560, padding: "30px 34px 36px", background: "var(--pantone-298)", color: "var(--ink)" }}>
      <img src="../../assets/lumon-globe-black.png" alt="Lumon" style={{ height: 30, marginBottom: 18 }} />
      <h1 className="djr" style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 30, lineHeight: 1.06 }}>
        Senior Refiner<br />Morning Checklist
      </h1>
      <div className="doc-eyebrow" style={{ marginBottom: 6 }}>Macrodata Refinement</div>
      <div className="striped" style={{ height: 7, marginBottom: 22 }}></div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
        <div>
          <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.5, fontWeight: 600 }}>
            The following should be completed before commencing refinement:
          </p>
          {items.map((it, i) => (
            <div className={"chk-row" + (it.done ? " done" : "")} key={i}>
              <span className={"chk-box" + (it.done ? " on" : "")} onClick={() => toggle(i)}></span>
              <span className="chk-label" style={{ fontSize: 13.5, lineHeight: 1.4 }}>{it.t}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.55 }}>
          <p style={{ margin: 0 }}>
            <b>Remember!</b> You are permitted one record to listen to each morning during your
            morning checklist procedures. Which will you choose today?
          </p>
          <div className="chk-row" style={{ marginTop: 16, borderBottom: 0 }}>
            <span className="chk-box"></span>
            <span style={{ fontSize: 13.5 }}>Defiant Jazz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ChecklistCard });
