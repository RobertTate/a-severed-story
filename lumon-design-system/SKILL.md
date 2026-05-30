---
name: lumon-design-system
description: Use this skill to generate well-branded interfaces and assets for Lumon Industries (the fictional corporation from "Severance"), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping in Lumon's brutalist corporate-minimalist style.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What's here
- `README.md` — full brand context, content voice, visual foundations, iconography, and a file manifest. **Read this first.**
- `colors_and_type.css` — import this for all color, type, spacing, and elevation tokens (`--pantone-*`, `--mdr-*`, neutrals, semantic tokens) plus `.lds-*` type classes.
- `assets/` — the globe logo (`lumon-globe-black.png`, `lumon-globe-white.png`) and `assets/reference/` source props.
- `preview/` — small specimen cards for every foundation + component.
- `ui_kits/mdr-terminal/` — interactive Macrodata Refinement terminal (green-screen CRT).
- `ui_kits/collateral/` — printed-document + wayfinding system (checklists, reviews, letters, manuals, signage).
- `slides/` — branded slide templates (title / section / quote / content).

## Non-negotiables
- **Voice is formal, euphemistic, faux-benevolent.** Never use emoji. (See README › Content Fundamentals.)
- **Color is rationed** — neutrals carry everything; the six O&D Pantones are bureaucratic accents, one hue per artifact. No gradients except the MDR CRT glow.
- **Type is Forma DJR**, substituted here with **Hanken Grotesk** (free). Swap for licensed Forma DJR in production.
- **Hard corners, tracked-out caps, striped-rule + pipe devices, dimensional (embossed) signage.** Restrained, eerie motion only.
- Reuse the globe logo asset — never redraw it.
