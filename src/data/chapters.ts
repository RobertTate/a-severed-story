// Single source of truth for the handbook's chapter order.
// Drives the <nav> Chapters dropdown and the Table of Contents page, so the
// reading order lives in exactly one place.
//
// `slug` maps to the page route (src/pages/<slug>.astro -> /<slug>).
// `blurb` is the italic one-liner shown under each entry on the TOC.

export interface Chapter {
  slug: string;
  title: string;
  /** Short label for the nav dropdown when the full title is unwieldy. */
  navTitle?: string;
  /** Italic descriptor shown on the Table of Contents. */
  blurb: string;
  /** Omit from the Table of Contents body list (still appears in the nav). */
  hideFromToc?: boolean;
}

export const chapters: Chapter[] = [
  {
    slug: "table-of-contents",
    title: "Table of Contents",
    navTitle: "Table of Contents",
    blurb: "A chapter index.",
    hideFromToc: true,
  },
  {
    slug: "preamble",
    title: "Preamble",
    blurb: "A preparatory statement.",
  },
  {
    slug: "company-overview",
    title: "Company Overview",
    blurb: "An overview of Lumon Industries",
  },
  {
    slug: "procedural-guidelines",
    title: "Procedural Guidelines",
    blurb: "Rules and procedures for working on a Severed Floor.",
  },
  {
    slug: "employee-profile",
    title: "Employee Profile",
    blurb: "A document required for all new hires!",
  },
  {
    slug: "corporate-personas",
    title: "Corporate Personas",
    blurb: "The Lumon Industries personality exam!",
  },
  {
    slug: "suggested-motivational-quotes",
    title: "Suggested Motivational Quotes",
    navTitle: "Suggested Motivational Quotes",
    blurb: "Words to refine by.",
    hideFromToc: true,
  },
  {
    slug: "performance-evaluation",
    title: "Performance Evaluation",
    blurb: "Career Advancement while at Lumon.",
  },
  {
    slug: "day-to-day-operations",
    title: "Day to Day Operations",
    blurb: "What to expect during your time at Lumon.",
  },
  {
    slug: "classified",
    title: "Classified",
    blurb: "For GM (General Manager) eyes only. Do not read.",
  },
  {
    slug: "case-studies",
    title: "Case Studies",
    blurb: "Tales of corporate life from other departments.",
  },
  {
    slug: "reference-index",
    title: "Reference Index",
    blurb: "A glossary of important terms and concepts.",
  },
  {
    slug: "closing-remarks",
    title: "Closing Remarks",
    blurb: "Closing Remarks.",
  },
];
