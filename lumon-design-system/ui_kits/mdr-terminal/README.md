# UI Kit · Macrodata Refinement Terminal

A high-fidelity, interactive recreation of Lumon's iconic **Macrodata Refinement (MDR)** workstation — the glowing teal CRT where severed refiners sort "scary" numbers into five bins by the feeling they evoke.

## Run it
Open `index.html`. You'll land on the **file intake** screen — pick a file (e.g. *Cold Harbor*) to begin refining.

## Interaction
- **Drag** a selection box across the field to **stage** anomalous (quivering / oversized) digits. The footer shows how many are staged.
- **Click a bin (01–05)** to refine the staged digits into it — they fly into the bin, its lid opens, and its progress climbs. The header percentage is the file's overall completion (mean of the bins).
- Calm digits cannot be staged; only the "scary" clusters respond.

## Components
| File | Role |
|---|---|
| `Terminal.jsx` | Orchestrator: intake → refine, owns bin progress + file list. |
| `Intake.jsx` | Welcome / file-selection screen. |
| `TerminalChrome.jsx` | Header (logo · file name · %) and live footer status bar. |
| `NumberField.jsx` | The floating macrodata grid, drag-to-select, refine flight animation. |
| `BinTray.jsx` | The five bins with lids + striped progress tracks. |
| `terminal.css` | Kit-local CRT styling (scanlines, vignette, flicker, quiver). |

## Fidelity notes
- The number grid, quiver/jitter of anomalous digits, five-bin tray, scanlines, and vignette are reconstructed from the show; exact digit-clustering logic is an informed interpretation (no production source exists).
- Uses the shared `--mdr-*` tokens from `colors_and_type.css`.
- Type is **Hanken Grotesk** (substitute for Forma DJR) + **Spline Sans Mono** for digits.
