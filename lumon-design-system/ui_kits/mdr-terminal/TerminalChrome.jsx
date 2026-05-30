// TerminalChrome.jsx — header (logo + file + %), rules, footer status bar.
const { useState, useEffect } = React;

function TerminalHeader({ file, percent }) {
  return (
    <React.Fragment>
      <div className="term-header ink glow-text">
        <img className="logo" src="../../assets/lumon-globe-black.png" alt="Lumon" />
        <div className="file">{file}</div>
        <div className="pct">{percent}%</div>
      </div>
      <div className="term-rule"></div>
    </React.Fragment>
  );
}

function TerminalFooter({ selectedCount }) {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setClock(d.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="term-footer ink glow-text">
      <span>{selectedCount > 0 ? `${selectedCount} digits staged` : "Awaiting refinement"}</span>
      <span>Lumon Macrodata Refinement · v3.21 · {clock}</span>
    </div>
  );
}

Object.assign(window, { TerminalHeader, TerminalFooter });
