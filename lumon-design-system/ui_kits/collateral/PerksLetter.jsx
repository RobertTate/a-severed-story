// PerksLetter.jsx — the cheerful corporate "apology/perk" letter.
function PerksLetter() {
  return (
    <div className="paper" style={{ width: 560, padding: "46px 50px 54px", background: "var(--paper)", color: "var(--ink)" }}>
      <img src="../../assets/lumon-globe-black.png" alt="Lumon" style={{ height: 26, marginBottom: 34, opacity: 0.92 }} />
      <div style={{ fontSize: 15.5, lineHeight: 1.7 }}>
        <p style={{ margin: "0 0 18px" }}>Dear Mark,</p>
        <p style={{ margin: "0 0 18px" }}>
          Whilst carrying boxes in a room today, you slipped on an overhead projector slide and
          sustained a minor blow to the temple.
        </p>
        <p style={{ margin: "0 0 18px" }}>
          Enclosed, please find a VIP gift card to Pip's Bar and Grille.
        </p>
        <p style={{ margin: "0 0 30px", fontStyle: "italic" }}>
          Congratulations on the gift card.
        </p>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--fg-2)" }}>
          Warmly,<br />
          <span className="djr" style={{ fontWeight: 700, color: "var(--ink)", fontSize: 15 }}>The Board</span>
        </p>
      </div>
      <div className="striped" style={{ height: 6, marginTop: 36, color: "var(--hairline-strong)" }}></div>
    </div>
  );
}
Object.assign(window, { PerksLetter });
