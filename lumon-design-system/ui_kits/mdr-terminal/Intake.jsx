// Intake.jsx — file selection / welcome screen.
function Intake({ onSelect, files }) {
  return (
    <div className="intake ink glow-text">
      <img className="logo globe-spin" src="../../assets/lumon-globe-black.png" alt="Lumon" style={{ height: 64, opacity: 0.92 }} />
      <div className="welcome">
        Welcome, refiner.<br />
        <b>Please select a file to refine.</b>
      </div>
      <div className="files">
        {files.map((f, i) => (
          <div className="file-row" key={i} onClick={() => onSelect(i)}>
            <span>{f.name}</span>
            <span className="meta">{f.done}% · {f.id}</span>
          </div>
        ))}
      </div>
      <div className="hint">The work is mysterious and important</div>
    </div>
  );
}
Object.assign(window, { Intake });
