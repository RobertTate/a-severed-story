/* ============================================================================
   A Severed Story — the floating "Floor Directory" section index.

   This is the only runtime behaviour that survives the move to Astro: it must
   read the rendered headings to build an outline, so it cannot be authored
   statically. Everything lumon.js used to repair at runtime (relocating the
   backlink, injecting binder holes, tagging the title-card voice, seating the
   page name in the nav) is now authored directly in the Astro components.

   Builds a floating outline of the chapter's sections in the wide right margin:
   anchored to every heading, with hash links and live scroll-spy that
   re-skins the directory to match the voice of the section you're reading.
   ============================================================================ */

type Voice = 'publisher' | 'orientation' | 'citizen';

interface Entry {
  el: HTMLElement;
  level: number;
  text: string;
  link?: HTMLAnchorElement;
  voice?: Voice;
}

const VOICE_NAME: Record<string, string> = {
  publisher: 'THE PUBLISHER',
  orientation: 'ORIENTATION',
  citizen: 'CONCERNED CITIZEN',
};

function slugify(s: string, used: Record<string, boolean>): string {
  const base =
    (s || '')
      .toLowerCase()
      .replace(/[‘’“”]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  let id = base;
  let n = 2;
  while (used[id]) {
    id = base + '-' + n;
    n++;
  }
  used[id] = true;
  return id;
}

function buildSectionIndex(): void {
  const viewer = document.getElementById('react-viewer');
  const chapter = document.querySelector<HTMLElement>('body > nav ~ div > h1');
  if (!viewer) return;

  const used: Record<string, boolean> = {};
  const entries: Entry[] = [];

  // chapter title first — a "return to top" anchor
  if (chapter) {
    if (!chapter.id) chapter.id = slugify(chapter.textContent || 'top', used);
    else used[chapter.id] = true;
    entries.push({ el: chapter, level: 1, text: (chapter.textContent || '').trim() });
  }

  // section headings inside the content (skip TOC lists & cross-page links)
  const heads = viewer.querySelectorAll<HTMLElement>('h1, h2, h3');
  heads.forEach((h) => {
    if (h.closest('blockquote')) return; // pull-quotes / TOC list
    const txt = (h.textContent || '').trim();
    if (!txt) return;
    const link = h.querySelector('a[href]');
    if (link && /\.html(\#|$)/i.test(link.getAttribute('href') || '')) return; // TOC entry
    if (link && /^\/[a-z0-9-]+(\#|$)/i.test(link.getAttribute('href') || '')) return; // Astro route TOC entry
    if (!h.id) h.id = slugify(txt, used);
    else used[h.id] = true;
    entries.push({ el: h, level: +h.tagName.charAt(1), text: txt });
  });

  if (entries.length < 3) return; // not worth an index

  // normalise levels to 1..3 for indentation
  const minLvl = Math.min(...entries.map((e) => e.level));

  const aside = document.createElement('aside');
  aside.className = 'page-index';
  aside.setAttribute('aria-label', 'Sections on this page');

  const head = document.createElement('div');
  head.className = 'page-index__head';
  head.textContent = 'Floor Directory';
  aside.appendChild(head);

  const list = document.createElement('nav');
  list.className = 'page-index__list';
  aside.appendChild(list);

  entries.forEach((e) => {
    const a = document.createElement('a');
    a.href = '#' + e.el.id;
    a.setAttribute('data-level', String(Math.min(3, e.level - minLvl + 1)));
    a.textContent = e.text;
    list.appendChild(a);
    e.link = a;
  });

  aside.setAttribute('data-toc-style', 'card');

  // ---- voice awareness: which [data-voice] region does each heading live in? --
  // The directory re-skins itself to match the voice of the section you are
  // reading, and crossfades between skins on pages that switch voices.
  function voiceOf(el: HTMLElement): Voice {
    const r = el.closest('[data-voice]');
    if (r) return (r.getAttribute('data-voice') as Voice) || 'orientation';
    // headings outside any region (the chapter title) follow the head voice
    const hv = document.querySelector('body > nav ~ div[data-head-voice]');
    return ((hv && (hv.getAttribute('data-head-voice') as Voice)) || 'orientation');
  }
  entries.forEach((e) => {
    e.voice = voiceOf(e.el);
  });
  // mark whether the page mixes voices at all — drives the transition styling
  const multiVoice = entries.some((e) => e.voice !== entries[0].voice);
  aside.setAttribute('data-active-voice', entries[0].voice!);
  head.setAttribute('data-voice-name', VOICE_NAME[entries[0].voice!] || '');
  if (multiVoice) aside.setAttribute('data-multi-voice', '');

  document.body.appendChild(aside);

  // ---- scroll-spy: highlight the section currently in view ----
  const links = entries.map((e) => e.link!);
  let active = -1;
  let curVoice = entries[0].voice;
  function onScroll() {
    // the reading line sits just below the fixed header + hash-jump landing
    const offset = 104;
    let found = 0;
    for (let k = 0; k < entries.length; k++) {
      if (entries[k].el.getBoundingClientRect().top <= offset) found = k;
      else break;
    }
    if (found === active) return;
    if (active >= 0) links[active].classList.remove('is-active');
    links[found].classList.add('is-active');
    active = found;
    // re-skin the directory to the voice of the section now in view
    const v = entries[found].voice!;
    if (v !== curVoice) {
      aside.setAttribute('data-active-voice', v);
      head.setAttribute('data-voice-name', VOICE_NAME[v] || '');
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
  }
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildSectionIndex);
} else {
  buildSectionIndex();
}
