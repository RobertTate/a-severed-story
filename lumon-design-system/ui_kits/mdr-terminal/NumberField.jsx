// NumberField.jsx — the floating macrodata grid + drag-to-select + refine flight.
const { useRef, useState: useStateNF, useEffect: useEffectNF, useCallback } = React;

const COLS = 18, ROWS = 10;

function makeDigit() { return Math.floor(Math.random() * 10); }

// Build a grid with a few clusters of "scary" (anomalous) digits.
function buildGrid() {
  const cells = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    cells.push({ d: makeDigit(), scary: false, huge: false, delay: (Math.random() * 2.6).toFixed(2) });
  }
  // seed 3-4 clusters
  const clusters = 3 + Math.floor(Math.random() * 2);
  for (let c = 0; c < clusters; c++) {
    const cx = 1 + Math.floor(Math.random() * (COLS - 2));
    const cy = 1 + Math.floor(Math.random() * (ROWS - 2));
    const r = 1 + Math.floor(Math.random() * 2);
    for (let y = cy - r; y <= cy + r; y++) {
      for (let x = cx - r; x <= cx + r; x++) {
        if (x < 0 || y < 0 || x >= COLS || y >= ROWS) continue;
        if (Math.random() < 0.6) {
          const idx = y * COLS + x;
          cells[idx].scary = true;
          if (Math.random() < 0.28) cells[idx].huge = true;
        }
      }
    }
  }
  return cells;
}

function NumberField({ onRefineReady, registerRefine }) {
  const [cells, setCells] = useStateNF(buildGrid);
  const [sel, setSel] = useStateNF(null);       // {x,y,w,h} live selection box
  const [staged, setStaged] = useStateNF([]);    // indices currently selected
  const fieldRef = useRef(null);
  const cellRefs = useRef([]);
  const drag = useRef(null);
  const selRef = useRef(null);

  useEffectNF(() => { onRefineReady(staged.length); }, [staged]);

  const pointInRect = (px, py, r) =>
    px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;

  const finishSelection = (box) => {
    if (!box) return;
    const fb = fieldRef.current.getBoundingClientRect();
    const picked = [];
    cells.forEach((c, i) => {
      if (!c.scary) return;
      const el = cellRefs.current[i];
      if (!el) return;
      const rb = el.getBoundingClientRect();
      const cx = rb.left + rb.width / 2 - fb.left;
      const cy = rb.top + rb.height / 2 - fb.top;
      if (pointInRect(cx, cy, box)) picked.push(i);
    });
    setStaged(picked);
  };

  const onDown = (e) => {
    const fb = fieldRef.current.getBoundingClientRect();
    const sx = e.clientX - fb.left, sy = e.clientY - fb.top;
    drag.current = { sx, sy };
    selRef.current = { x: sx, y: sy, w: 0, h: 0 };
    setSel({ x: sx, y: sy, w: 0, h: 0 });
    setStaged([]);
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const fb = fieldRef.current.getBoundingClientRect();
    const mx = e.clientX - fb.left, my = e.clientY - fb.top;
    const { sx, sy } = drag.current;
    const box = { x: Math.min(sx, mx), y: Math.min(sy, my), w: Math.abs(mx - sx), h: Math.abs(my - sy) };
    selRef.current = box;
    setSel(box);
  };
  const onUp = () => {
    if (selRef.current) finishSelection(selRef.current);
    setSel(null);
    selRef.current = null;
    drag.current = null;
  };

  // refine: fly staged numbers to bin, respawn cells, report count for progress
  const doRefine = useCallback((binIndex, binEl) => {
    if (staged.length === 0) return 0;
    const fb = document.body.getBoundingClientRect();
    const target = binEl.getBoundingClientRect();
    staged.forEach((i, k) => {
      const el = cellRefs.current[i];
      if (!el) return;
      const rb = el.getBoundingClientRect();
      const fly = document.createElement("div");
      fly.className = "fly glow-text";
      fly.textContent = cells[i].huge ? cells[i].d : cells[i].d;
      fly.style.left = rb.left + "px";
      fly.style.top = rb.top + "px";
      fly.style.fontSize = (cells[i].huge ? 30 : 20) + "px";
      document.body.appendChild(fly);
      const dx = (target.left + target.width / 2) - rb.left;
      const dy = (target.top + target.height / 2) - rb.top;
      requestAnimationFrame(() => {
        fly.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
        fly.style.opacity = "0";
      });
      setTimeout(() => fly.remove(), 600);
    });
    const count = staged.length;
    // respawn staged cells with fresh digits, mostly calm
    setCells((prev) => {
      const next = prev.slice();
      staged.forEach((i) => {
        next[i] = { d: makeDigit(), scary: false, huge: false, delay: (Math.random() * 2.6).toFixed(2) };
      });
      // occasionally seed a new small cluster elsewhere
      if (Math.random() < 0.8) {
        const cx = 1 + Math.floor(Math.random() * (COLS - 2));
        const cy = 1 + Math.floor(Math.random() * (ROWS - 2));
        [[0,0],[1,0],[0,1],[1,1],[-1,0],[0,-1]].forEach(([ox,oy]) => {
          const x = cx+ox, y = cy+oy;
          if (x>=0&&y>=0&&x<COLS&&y<ROWS && Math.random()<0.7) {
            const idx=y*COLS+x; next[idx]={...next[idx], scary:true, huge: Math.random()<0.25};
          }
        });
      }
      return next;
    });
    setStaged([]);
    return count;
  }, [staged, cells]);

  useEffectNF(() => { registerRefine(doRefine); }, [doRefine]);

  return (
    <div
      className="field"
      ref={fieldRef}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
    >
      <div className="field-inner">
        <div className="num-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {cells.map((c, i) => (
            <span
              key={i}
              ref={(el) => (cellRefs.current[i] = el)}
              className={
                "num" +
                (c.huge ? " huge" : c.scary ? " scary" : "") +
                (staged.includes(i) ? " selected" : "")
              }
              style={{
                fontSize: c.huge ? "30px" : "20px",
                padding: "9px 11px",
                animationDelay: c.delay + "s",
              }}
            >
              {c.d}
            </span>
          ))}
        </div>
      </div>
      {sel && <div className="sel-box" style={{ left: sel.x, top: sel.y, width: sel.w, height: sel.h }}></div>}
    </div>
  );
}
Object.assign(window, { NumberField });
