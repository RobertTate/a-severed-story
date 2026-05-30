# UI Kit · Collateral & Wayfinding

A recreation of Lumon's **printed and physical document system** — the cards, booklets, letters, manuals, and dimensional signage that give the severed floor its bureaucratic dread. Presented as a *Document Archive* browser.

## Run it
Open `index.html`. Use the left rail to browse documents by department; each renders at full fidelity in the viewer.

## Components
| File | Role |
|---|---|
| `Library.jsx` | Document Archive shell: dark left-rail nav (grouped by department) + viewer. |
| `ChecklistCard.jsx` | Senior Refiner Morning Checklist — blue stock, **interactive checkboxes**. |
| `PerformanceReview.jsx` | "Minor Performance Incidents (Contentions)" booklet page with the *Contention* tag + word cloud. |
| `PerksLetter.jsx` | The cheerfully menacing Board correspondence ("Congratulations on the gift card."). |
| `HandbookCover.jsx` | Security Office Protocol manual cover — dark, angled, embossed, with sheen + binder holes. |
| `Wayfinding.jsx` | Dimensional wall signage (pipe + tracked caps) and a Perpetuity Wing plaque. |
| `collateral.css` | Kit-local styling + shared document primitives. |

## Design patterns demonstrated
- **Document header**: globe logo → bold title → ALL-CAPS tracked eyebrow → striped rule.
- **Colored paper stock** as the only "brand color" per artifact (blue checklist, cyan review).
- **Dimensional lettering** via top-light text-shadow (signage + plaques).
- **Voice**: formal, euphemistic, faux-benevolent (see README › Content Fundamentals).

## Fidelity notes
Reconstructed from authentic *Severance* props (originals in `assets/reference/`). Copy is drawn from on-screen text; the word-cloud terms are illustrative. Type is **Hanken Grotesk** (substitute for Forma DJR).
