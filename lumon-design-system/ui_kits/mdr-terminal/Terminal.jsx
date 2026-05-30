// Terminal.jsx — orchestrates intake → refinement, owns bin progress.
const { useState: useStateT, useRef: useRefT } = React;

const FILES = [
  { name: "Cold Harbor", id: "MDR-0419", done: 3 },
  { name: "Siena",       id: "MDR-0207", done: 41 },
  { name: "Tumwater",    id: "MDR-0188", done: 68 },
  { name: "Allentown",   id: "MDR-0093", done: 12 },
  { name: "Cairns",      id: "MDR-0351", done: 87 },
];

function App() {
  const [screen, setScreen] = useStateT("intake");
  const [fileIdx, setFileIdx] = useStateT(0);
  const [bins, setBins] = useStateT([8, 22, 4, 35, 14]);
  const [staged, setStaged] = useStateT(0);
  const [activeBin, setActiveBin] = useStateT(null);
  const refineFn = useRefT(null);

  const percent = Math.round(bins.reduce((a, b) => a + b, 0) / bins.length);

  const startFile = (i) => {
    setFileIdx(i);
    const base = FILES[i].done;
    setBins([base, Math.min(100, base + 14), Math.max(0, base - 6), Math.min(100, base + 27), base]);
    setScreen("refine");
  };

  const handleBin = (i) => {
    if (!refineFn.current || staged === 0) return;
    const el = document.querySelector(`[data-bin="${i}"]`);
    const count = refineFn.current(i, el);
    if (count > 0) {
      setActiveBin(i);
      setBins((prev) => {
        const next = prev.slice();
        next[i] = Math.min(100, next[i] + count * 1.6 + 1);
        return next;
      });
      setTimeout(() => setActiveBin(null), 550);
    }
  };

  if (screen === "intake") {
    return (
      <div className="crt">
        <Intake files={FILES} onSelect={startFile} />
      </div>
    );
  }

  return (
    <div className="crt">
      <TerminalHeader file={FILES[fileIdx].name} percent={percent} />
      <NumberField
        onRefineReady={setStaged}
        registerRefine={(fn) => (refineFn.current = fn)}
      />
      <div className="term-rule thin"></div>
      <BinTray bins={bins} activeBin={activeBin} onBin={handleBin} />
      <TerminalFooter selectedCount={staged} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
