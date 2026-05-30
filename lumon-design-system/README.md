# Lumon Industries — Design System

> *"A handshake is available upon request."*

This is the design system for **Lumon Industries**, the fictional biotech conglomerate at the center of the Apple TV+ series **Severance**. It captures Lumon's distinctive visual language — *brutalist corporate minimalism* — as a reusable kit of colors, type, assets, components, and UI recreations, so design agents can produce on-brand Lumon interfaces, documents, signage, and decks.

This is a **fan/educational recreation** of a fictional brand for design-study purposes. Lumon Industries and Severance are properties of their respective rights holders.

---

## 1. Company & World Context

**Lumon Industries** is a secretive, multinational biotechnology corporation founded in **1865 by Kier Eagan**, and run for generations by the Eagan family. Its public face is benevolent — health, technology, the betterment of humankind — but its culture is a cult of personality around its founder, expressed through scripture-like corporate doctrine (the *Compliance Handbook*, the *Four Tempers*, the *Nine Core Principles*).

The series centers on the **severed floor**: a windowless basement where employees undergo a surgical "severance" procedure splitting their work memories ("innies") from their personal memories ("outies"). The aesthetic does enormous narrative work — it looks like a *real* office from a certain era, and the horror is entirely in the familiarity.

### Departments represented
- **MDR — Macrodata Refinement.** Employees sort mysterious numbers on retro CRT terminals into five bins by the "feeling" the numbers evoke. The MDR terminal is Lumon's single most iconic interface.
- **O&D — Optics & Design.** Lumon's in-house design/printing arm. Owns the official **color reference chart** (see `assets/reference/color-reference-chart.webp`).
- **Wellness, Security, Perpetuity Wing** (the Kier museum), and others.

### Products / surfaces in this system
1. **Macrodata Refinement Terminal** — the green-screen data-refinement UI (`ui_kits/mdr-terminal/`).
2. **Lumon Collateral & Wayfinding** — the printed/physical document + signage system: handbook pages, checklists, performance reviews, perks letters, wall wayfinding, dimensional plaques (`ui_kits/collateral/`).

### Source materials provided
All sourced from set photography, props, and brand graphics from *Severance*. Originals preserved in `uploads/`, working copies in `assets/reference/`:
- `lumoncolorrefchart.webp` — **O&D Color Reference Chart** (the canonical palette, with Pantone + hex).
- `Lumon Globe Resource.jpg` — the **globe logo** (processed to transparent PNGs in `assets/`).
- `type_flag_-_forma_djr.webp` — **Forma DJR** type specimen ("The board has concluded the call.").
- `storageclosetsign.webp` — wall wayfinding ("STORAGE CLOSET").
- `seniorrefinerchecklist.webp` — a Senior Refiner Morning Checklist card.
- `performance_review_04.webp` — a performance-review booklet page ("Uses Too Many Big Words").
- `severance_lumonapologyletter.webp` — a "perks" / apology letter to Mark.
- `security-office-protocol-quick-start-guides.webp` — the Security Office handbook cover.
- `severance_perpetuitywingpipeaganlabel.webp` — a Perpetuity Wing museum plaque (Phillip "Pip" Eagan).

No codebase or Figma was provided — this is a **brand reconstruction** from authentic props and graphics, plus the show's established world.

---

## 2. Content Fundamentals — voice & copy

Lumon's voice is **formal, euphemistic, and cheerfully menacing**. It is the sound of a benevolent institution that has never once doubted itself. Copy reads like it was written by a committee trying to be helpful and succeeding only in being cold.

- **Register:** Stiff, mid-century corporate, faintly British-formal. Uses *"Whilst,"* *"shall,"* *"herein,"* *"the following should be completed."* Passive voice and the institutional third person abound: *"The board has concluded the call."*
- **Person:** Addresses the employee directly and warmly — **"you," "Dear Mark,"** — while referring to authority in the abstract third person (**"the board," "Lumon," "Mr. Milchick"**). The intimacy is part of the control.
- **Euphemism & spin:** Unpleasant facts are reframed as gifts or achievements. A workplace injury becomes *"Whilst carrying boxes… you slipped… and sustained a minor blow to the temple. Enclosed, please find a VIP gift card… **Congratulations** on the gift card."* Criticism is a *"Contention,"* a reprimand a *"Minor Performance Incident."*
- **Casing:** Document **eyebrows/headers are ALL CAPS, tracked out** (`MINOR PERFORMANCE INCIDENTS (CONTENTIONS)`, `MACRODATA REFINEMENT`). Headlines are **Title Case** or sentence case in bold. Body is sentence case.
- **Numbering & ceremony:** Everything is enumerated, edition-stamped, and credited — *"Edition 23," "A Compendium of Security Procedures," "1." / "Contention."* Procedures are ritual: *"Remember! You are permitted one record to listen to each morning…"*
- **Tone words:** reverent, procedural, infantilizing-positive. Exclamation points appear in instructions (*"Remember!"*). Rewards are framed as rare privileges (*"VIP," "permitted," "should you choose"*).
- **Emoji:** **Never.** No emoji, ever. The brand predates and rejects them. Warmth is delivered through wood-paneled euphemism, not glyphs.
- **Quintessential phrases:** *"The work is mysterious and important." · "Please enjoy each number equally." · "Praise Kier." · "A handshake is available upon request."*

**Do:** "Kindly complete the following before commencing refinement."
**Don't:** "Hey! Quick checklist before you start 🎉"

---

## 3. Visual Foundations

The design language is **late-1960s/1970s institutional modernism** — rationality, efficiency, and authority, pushed just past the point of human comfort.

### Color
- **Neutrals carry everything.** Cool off-whites, paper, bone beige, brushed steel grays, and the near-black of the handbooks. See `--wall`, `--paper`, `--steel`, `--ink` in `colors_and_type.css`. Backgrounds are flat, matte, untextured (or lightly paper-grained).
- **Brand color is rationed.** The six O&D Pantones (`--pantone-700/704/7487/334/298/293`) appear as *bureaucratic accents only* — wayfinding, department coding, document stock color — never as decoration or gradient. A single hue per artifact is typical (a blue title card, a cyan handbook, a blue checklist card).
- **The Lumon blue** (`#235BA8`) is the primary corporate hue (broadcast title cards, the flag).
- **The MDR terminal** lives in its own sealed world: glowing **phosphor teal** screen, deep-teal digits, blue bins (`--mdr-*`).
- **No gradients** in the corporate identity. The *only* gradient-like effect permitted is the soft CRT vignette/glow on the MDR screen.
- **Imagery vibe:** cool, desaturated, slightly clinical. When tinted (title cards), imagery is duotoned into a single brand hue (see the Forma specimen — a portrait flooded blue).

### Typography
- **Forma DJR** (David Jonathan Ross / Font Bureau) is Lumon's real typeface — a humanist grotesque from the Nebiolo *Forma* (1968) lineage: neutral, warm, institutional. Used for signage, headlines, body, everything.
- **SUBSTITUTION (flagged):** Forma DJR is commercial and not embeddable for free, so this system ships **Hanken Grotesk** (Google Fonts) as the nearest free humanist grotesque. *Swap for licensed Forma DJR in production.* See "Caveats."
- Display/headlines lean **light or bold**, rarely in-between — thin elegant titles ("The board has concluded the call.") or heavy bold ("Uses Too Many Big Words").
- **Eyebrows/signage = ALL CAPS, tracked out** (`letter-spacing: 0.14–0.22em`). Body is neutral-tracked.
- Mono (`Spline Sans Mono`) for terminal/code/data readouts.

### Layout & structure
- **Symmetry, grids, and rules.** Strong horizontal hairlines and the recurring **striped-rule divider** (a stack of thin parallel lines, seen under "MACRODATA REFINEMENT" and across the security cover). A thin **vertical pipe rule** precedes signage labels ("| STORAGE CLOSET").
- Generous negative space; centered or hard-left compositions; nothing crowded.
- Documents are enumerated, edition-stamped, footnoted.

### Surfaces, depth & motion
- **Corners:** mostly **hard (0–2px)**. The signature soft radius is the **logo lozenge** and the rounded rectangles of the LUMON wordmark; otherwise crisp.
- **Cards/documents:** flat colored paper stock with a tiny shadow; no heavy rounding, no colored left-border accents.
- **Dimensional lettering:** wall signage and plaques are **physical raised/engraved letters** — render with a top-light **emboss** (`--shadow-emboss`) on light walls, or recessed deboss on plaques.
- **Shadows:** a single soft "fluorescent overhead" shadow (`--shadow-card`). No dramatic drop shadows, no neon.
- **Blur/transparency:** essentially none in the corporate identity — surfaces are opaque and matte. The only translucency is the MDR selection box and CRT glow.
- **Animation:** restrained and eerie. Slow fades, mechanical/linear or gentle ease-in-out moves, no bounce, no spring, no playful overshoot. The MDR numbers *jitter and quiver* subtly; the terminal flickers with scanlines. Hover = subtle darken or a quiet underline; press = a small inset/darken, never a shrink-bounce.

---

## 4. Iconography

Lumon is a **near-iconless** brand — its institutional coldness comes partly from the *absence* of friendly UI iconography. What exists is functional and severe.

- **The globe logo** is the master mark and the only truly "branded" graphic — an oval wireframe globe (latitude/longitude grid) wrapping the **LUMON** wordmark, whose **O contains a teardrop/water-droplet**. Provided as clean transparent assets:
  - `assets/lumon-globe-black.png` (black, on light)
  - `assets/lumon-globe-white.png` (white, on dark)
- **The striped-rule** (parallel horizontal hairlines) and the **vertical pipe** are recurring graphic devices, not icons — used as dividers and label markers. Rendered in CSS, no asset needed.
- **No emoji. No decorative icon set.** When wayfinding needs a "symbol," it uses *typography* (tracked caps + a pipe) rather than a pictogram.
- **For functional UI** (the MDR terminal, any product chrome) where small controls are genuinely required, this system uses **Lucide** icons via CDN — a thin, neutral, evenly-stroked open-source set that matches Lumon's restraint. This is a **substitution** (Lumon has no canonical icon font); keep usage minimal, monochrome, and quiet. Documented per-kit.

---

## 5. Index / Manifest

Root files:
- **`README.md`** — this file.
- **`colors_and_type.css`** — all color + type + spacing + elevation tokens and semantic classes. Import this everywhere.
- **`SKILL.md`** — Agent-Skill manifest (for use in Claude Code).

Folders:
- **`assets/`** — `lumon-globe-black.png`, `lumon-globe-white.png`, and `assets/reference/` (source props for study).
- **`uploads/`** — original provided source images (untouched).
- **`preview/`** — small HTML specimen cards that populate the Design System tab (colors, type, components, logo, etc.).
- **`ui_kits/mdr-terminal/`** — Macrodata Refinement Terminal recreation (`index.html` + JSX components).
- **`ui_kits/collateral/`** — Lumon document + wayfinding system (`index.html` + JSX components).
- **`slides/`** — Lumon-branded slide templates: `index.html` (navigable deck) + standalone `TitleSlide.html`, `SectionSlide.html`, `QuoteSlide.html`, `ContentSlide.html`, built on the broadcast "type-flag" aesthetic.

---

## 6. Caveats

- **Forma DJR is substituted with Hanken Grotesk** (free). The real identity uses Forma DJR; metrics differ slightly. Provide licensed Forma DJR woff2 files to make this pixel-exact.
- **Fonts load from Google Fonts CDN** (`@import` in `colors_and_type.css`) rather than self-hosted `fonts/`, because the build sandbox cannot fetch binaries. For offline/production use, download Hanken Grotesk + Spline Sans Mono into `fonts/` and switch to `@font-face`.
- **No codebase/Figma** was available — UI kits are faithful reconstructions from authentic props and the show's established visual world, not extracted production code. The MDR terminal layout in particular is an informed interpretation.
- **Icons are Lucide (CDN), substituted** — Lumon has no canonical icon font.
