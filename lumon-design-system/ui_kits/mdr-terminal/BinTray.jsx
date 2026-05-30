// BinTray.jsx — the five refinement bins with lids + progress.
function BinTray({ bins, activeBin, onBin }) {
  return (
    <div className="bin-tray">
      {bins.map((b, i) => (
        <div
          key={i}
          className={"bin ink glow-text" + (activeBin === i ? " open" : "")}
          onClick={() => onBin(i)}
          data-bin={i}
        >
          <div className="num-id">{String(i + 1).padStart(2, "0")}</div>
          <div className="lid"></div>
          <div className="track"><i style={{ width: b + "%" }}></i></div>
          <div className="pct">{Math.round(b)}%</div>
        </div>
      ))}
    </div>
  );
}
Object.assign(window, { BinTray });
