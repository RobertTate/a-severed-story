/* ============================================================================
   Severed Story — the floating "Floor Directory" section index + voice-aware nav.

   This is the only runtime behaviour that survives the move to Astro: it must
   read the rendered DOM to work, so it cannot be authored statically.

   Two things happen here, both keyed to the page's [data-voice] regions:

   1. The fixed nav chrome re-skins to match the voice of the region currently
      under the header. This is tracked by SCROLL POSITION over the regions
      themselves — not by headings — so it is correct on pages whose opening
      section has no heading, and on short pages that never build a directory.

   2. A floating outline of the chapter's headings is built in the wide right
      margin (when there are enough of them), with hash links and live scroll-
      spy that re-skins the directory to match the section you're reading.

   Both share one throttled scroll listener.
   ============================================================================ */

type Voice = "publisher" | "orientation" | "citizen";

interface Entry {
  el: HTMLElement;
  level: number;
  text: string;
  link?: HTMLAnchorElement;
  voice?: Voice;
}

function slugify(s: string, used: Record<string, boolean>): string {
  const base =
    (s || "")
      .toLowerCase()
      .replace(/[‘’“”]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";
  let id = base;
  let n = 2;
  while (used[id]) {
    id = base + "-" + n;
    n++;
  }
  used[id] = true;
  return id;
}

// Cleanup hook for the previous build. `window` survives view-transition
// navigations, so without this each navigation would stack another scroll
// listener bound to a now-detached directory.
let detachScroll: (() => void) | null = null;

function buildSectionIndex(): void {
  // tear down the previous page's directory + scroll-spy before rebuilding
  if (detachScroll) {
    detachScroll();
    detachScroll = null;
  }
  document.querySelector(".page-index")?.remove();

  const viewer = document.getElementById("react-viewer");
  const chapter = document.querySelector<HTMLElement>("body > nav ~ div > h1");
  if (!viewer) return;

  // the reading line, just below the fixed header + hash-jump landing
  const offset = 104;
  // scroll callbacks registered by the nav spy and (when built) the directory
  const scrollHandlers: Array<() => void> = [];

  // ---- NAV CHROME VOICE -----------------------------------------------------
  // The fixed header re-skins to match the [data-voice] region currently under
  // it, tracked by scroll position over the regions themselves — independent of
  // the heading-based directory below (which some sections lack, and which short
  // pages never build). Above the first region, over the title card, it follows
  // the chapter's head voice.
  const navBar = document.querySelector<HTMLElement>("body > nav");
  if (navBar) {
    const headWrap = document.querySelector<HTMLElement>(
      "body > nav ~ div[data-head-voice]",
    );
    const headV =
      (headWrap?.getAttribute("data-head-voice") as Voice) || "orientation";
    const regions = Array.from(
      viewer.querySelectorAll<HTMLElement>("[data-voice]"),
    );
    const regionVoice = (r: HTMLElement): Voice =>
      (r.getAttribute("data-voice") as Voice) || "orientation";
    // whether the page mixes voices at all — drives instant skin vs. crossfade
    const navMultiVoice =
      new Set<Voice>([headV, ...regions.map(regionVoice)]).size > 1;

    // voice of the last region that has scrolled under the header; the head
    // voice while still above the first region.
    const navVoiceAt = (): Voice => {
      let v: Voice = headV;
      for (const r of regions) {
        if (r.getBoundingClientRect().top <= offset) v = regionVoice(r);
      }
      return v;
    };

    // seat the opening skin BEFORE flagging multi-voice, so a fresh load shows
    // the right skin with no crossfade; the flag enables the fade for scrolling.
    let navVoice = navVoiceAt();
    navBar.setAttribute("data-active-voice", navVoice);
    if (navMultiVoice) navBar.setAttribute("data-multi-voice", "");
    else navBar.removeAttribute("data-multi-voice");

    scrollHandlers.push(() => {
      const v = navVoiceAt();
      if (v !== navVoice) {
        navBar.setAttribute("data-active-voice", v);
        navVoice = v;
      }
    });
  }

  const used: Record<string, boolean> = {};
  const entries: Entry[] = [];

  // chapter title first — a "return to top" anchor
  if (chapter) {
    if (!chapter.id) chapter.id = slugify(chapter.textContent || "top", used);
    else used[chapter.id] = true;
    entries.push({
      el: chapter,
      level: 1,
      text: (chapter.textContent || "").trim(),
    });
  }

  // section headings inside the content (skip TOC lists & cross-page links).
  // Content begins at <h2> now (the page's only <h1> is the title card above).
  const heads = viewer.querySelectorAll<HTMLElement>("h2, h3, h4");
  heads.forEach((h) => {
    if (h.closest("blockquote")) return; // pull-quotes / TOC list
    const txt = (h.textContent || "").trim();
    if (!txt) return;
    const link = h.querySelector("a[href]");
    if (link && /\.html(\#|$)/i.test(link.getAttribute("href") || "")) return; // TOC entry
    if (link && /^\/[a-z0-9-]+(\#|$)/i.test(link.getAttribute("href") || ""))
      return; // Astro route TOC entry
    if (!h.id) h.id = slugify(txt, used);
    else used[h.id] = true;
    entries.push({ el: h, level: +h.tagName.charAt(1), text: txt });
  });

  // Cross-page hash links (e.g. /employee-profile#…-liep) target a heading id.
  // But those ids are assigned just above, at runtime — on a fresh load or a
  // ClientRouter navigation the browser tries to scroll to the hash *before*
  // this script runs, finds no matching element, and gives up. Now that the
  // ids exist, honour the hash ourselves. (scroll-margin-top in lumon.css keeps
  // the heading clear of the fixed header.)
  if (location.hash.length > 1) {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    if (target) target.scrollIntoView();
  }

  // ---- the floating Directory (heading-based) -------------------------------
  // Built only when there are enough sections to be worth it. It re-skins per
  // heading to the section's voice, matching the nav.
  function voiceOf(el: HTMLElement): Voice {
    const r = el.closest("[data-voice]");
    if (r) return (r.getAttribute("data-voice") as Voice) || "orientation";
    // headings outside any region (the chapter title) follow the head voice
    const hv = document.querySelector("body > nav ~ div[data-head-voice]");
    return (
      (hv && (hv.getAttribute("data-head-voice") as Voice)) || "orientation"
    );
  }
  entries.forEach((e) => {
    e.voice = voiceOf(e.el);
  });

  if (entries.length >= 3) {
    // mark whether the page mixes voices at all — drives the transition styling
    const multiVoice = entries.some((e) => e.voice !== entries[0].voice);

    // normalise levels to 1..3 for indentation. The indentation baseline comes
    // from the in-content headings only — the chapter title is always the top
    // level — so top sections stay flush even though content begins at <h2>.
    const contentLvls = entries
      .filter((e) => e.el !== chapter)
      .map((e) => e.level);
    const minLvl = contentLvls.length ? Math.min(...contentLvls) : 1;

    const aside = document.createElement("aside");
    aside.className = "page-index";
    aside.setAttribute("aria-label", "Sections on this page");

    const head = document.createElement("div");
    head.className = "page-index__head";
    head.textContent = "Directory";
    aside.appendChild(head);

    const list = document.createElement("nav");
    list.className = "page-index__list";
    aside.appendChild(list);

    entries.forEach((e) => {
      const a = document.createElement("a");
      a.href = "#" + e.el.id;
      a.setAttribute(
        "data-level",
        String(e.el === chapter ? 1 : Math.min(3, e.level - minLvl + 1)),
      );
      a.textContent = e.text;
      list.appendChild(a);
      e.link = a;
    });

    aside.setAttribute("data-toc-style", "card");
    // re-skin the directory to its opening voice
    aside.setAttribute("data-active-voice", entries[0].voice!);
    if (multiVoice) aside.setAttribute("data-multi-voice", "");

    document.body.appendChild(aside);

    // scroll-spy: highlight the section currently in view + re-skin the card
    const links = entries.map((e) => e.link!);
    let active = -1;
    let curVoice = entries[0].voice;
    scrollHandlers.push(() => {
      let found = 0;
      for (let k = 0; k < entries.length; k++) {
        if (entries[k].el.getBoundingClientRect().top <= offset) found = k;
        else break;
      }
      if (found === active) return;
      if (active >= 0) links[active].classList.remove("is-active");
      links[found].classList.add("is-active");
      active = found;
      // re-skin the directory to the voice of the section now in view
      const v = entries[found].voice!;
      if (v !== curVoice) {
        aside.setAttribute("data-active-voice", v);
        curVoice = v;
      }
      // keep the active row visible inside a scrolling index
      const a = links[found];
      const parent = list;
      if (parent.scrollHeight > parent.clientHeight) {
        const top = a.offsetTop;
        const bot = top + a.offsetHeight;
        if (top < parent.scrollTop) parent.scrollTop = top - 8;
        else if (bot > parent.scrollTop + parent.clientHeight)
          parent.scrollTop = bot - parent.clientHeight + 8;
      }
    });
  }

  // ---- one shared, throttled scroll listener drives nav + directory ----
  if (scrollHandlers.length === 0) return;
  let ticking = false;
  const onScrollThrottled = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      scrollHandlers.forEach((h) => h());
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScrollThrottled, { passive: true });
  detachScroll = () => window.removeEventListener("scroll", onScrollThrottled);
  scrollHandlers.forEach((h) => h());
}

// `astro:page-load` fires after the initial load AND after every view-transition
// navigation, so the directory is rebuilt for each chapter the reader lands on.
document.addEventListener("astro:page-load", buildSectionIndex);
