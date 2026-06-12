# A Severed Story — project rules

A homebrew TTRPG handbook set in the world of *Severance*, presented as a real-world artifact: a game book published by **Lumon Industries**, which has been defaced by a saboteur ("Concerned Citizen") who injects the truth about severed-floor life. HTML pages served by Vite (`npm run dev`, localhost:5173). One file per chapter; shared `styles.css` (LegendKeeper export) + `lumon.css` (Lumon design-system overrides).

## The three voices — every passage is exactly one

All prose is written in one of three voices. Tag content P / O / C before writing it. Never let a passage drift into a flat, neutral "rulebook" register — that voice does not exist in this book.

### 1. PUBLISHER voice (P) — Lumon the game-publisher
- **Knows it is a game.** May say "game," "play," "players," "Roll," "d20," "GM (Game Master)."
- Speaks to the reader as a **customer who bought *A Severed Story***.
- Register: upbeat, branded, composed — clear and enthusiastic in framing, plain and scannable when stating numbers (DCs, point math). Echoes the **Preamble**. Warm, never cutesy, never winking.
- **Owns:** the cover, the Preamble, and ALL true game mechanics (dice, Rolls, Task Severity, Tiers, point math, "how to play").

### 2. ORIENTATION voice (O) — Lumon the employer
- **Does NOT know it is a game.** Believes it is a genuine new-hire handbook.
- Speaks to the reader as a **new severed employee** ("Greetings, new hire!").
- Register: cheerful, euphemistic, faux-benevolent, scripture-of-Kier. Echoes **Company Overview**.
- **Never** mentions dice, Rolls, "the game," or "players." **Never** casts Lumon in a negative light.
- **Owns:** the immersive handbook body — doctrine (Four Tempers, Core Principles) and the in-world framing of every system (Kier Points as an "HR incentive program," the LIEP as a real form, stress assessment as real policy).

### 3. CONCERNED CITIZEN voice (C) — the saboteur ("C.C.")
- Knows it is a Lumon game and resents it; reveals real severed-floor life.
- Speaks to the reader as a fellow human to wake up. Warm, conspiratorial, warning. Signs "— C.C." / "Concerned Citizen."
- **Owns:** all subversive additions, dark reveals, and Lumon's secrets. Sticky-note panels AND whole inserted pages (e.g., the Classified "stolen internal manual" framing).

## Layout mapping (voices self-sort visually)
- **Orientation → handbook body** (default text + in-world blockquote reminders).
- **Publisher → a distinct boxed "rules" treatment**, branded to *A Severed Story* (blue `data-panel-type="info"` today; a dedicated look later). Every mechanic lives here.
- **Concerned Citizen → sticky-note / handwritten panels + inserted pages** (rose `data-panel-type="note"` today).

A single chapter legitimately mixes both Lumon voices (Orientation body + embedded Publisher rules-boxes) plus C.C. intrusions. That texture is intended.

**Each voice needs two design expressions (a 3×2 matrix):** a **page-level** treatment for when a whole chapter is predominantly that voice (e.g. Procedural Guidelines ≈ a Publisher page; Company Overview = an Orientation page; a wholesale C.C. insertion = a Citizen page), and a **block-level** treatment for when the voice is embedded inside a differently-voiced page (a Publisher rules-box; a C.C. sticky-note). A Publisher page still renders embedded C.C. notes in C.C. block-styling.

## Hard rules
- **Never reference the TV show.** This is an in-world artifact. No meta-commentary about the RPG hobby either ("like other tabletop games" is banned).
- **The "GM" pun is deliberate:** Orientation reads it as *General Manager*; Publisher reads it as *Game Master*. Same letters, both true. Preserve it.
- Lumon-authored content (P or O) never criticizes Lumon. Only C.C. reveals the darkness.
- Secrets about Lumon are C.C. content, not Lumon content.

## Implemented design hooks — DATA ATTRIBUTES ARE THE SOURCE OF TRUTH
The voice system is encoded entirely in **data attributes**, not classes, so the styling can be ripped out and rebuilt from scratch against the data attributes alone. When tagging any new/edited content, set these — never rely on a class for voice.
- **Block-level voice = `data-panel-type`** on the panel div: `info` → Publisher "RULE OF PLAY" rules box (blue spine, mono formulas); `note` → C.C. taped-in handwritten scrap (rose, rotated, "UNAUTHORIZED INSERTION" stamp); `warning` → quiet cross-reference (utility, not a voice). The names are legacy LegendKeeper panel kinds; the kind→voice map is fixed (info=Publisher, note=Citizen).
- **Page-level voice = `data-voice`** on a region wrapper: `<div data-voice="publisher|orientation|citizen">` around a run of content blocks. (No `class` — `data-voice` is the hook.) Regions bleed to the column edges and carry a full environment (background, type, header style); they **stack**, so one page can flip voices abruptly (e.g. Performance Evaluation: Publisher Kier half → Citizen Ricken half). C.C. `note` sticky-blocks still ride on top of any region. The Citizen region renders body text as typewriter mono; its inner `note` panels stay handwritten.
- **Do NOT** put `data-voice` on blocks — it would collide with the region selectors. Block voice lives on `data-panel-type`; region voice lives on `data-voice`.

## Editing conventions
- Match the existing ProseMirror/Tailwind HTML structure (LegendKeeper export). Panels: `info` (Publisher rules), `warning` (cross-references), `note` (C.C.).
- Filenames are lowercase kebab-case. `<!DOCTYPE html>` must precede `<html>` (Vite's parser is strict).
- Don't revert the user's in-progress hand edits.
