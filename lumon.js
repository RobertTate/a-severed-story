/* ============================================================================
   A Severed Story — runtime enhancements for the printed-artifact design.
   Pure DOM injection; no dependencies. Runs once on DOMContentLoaded.
   ============================================================================ */
(function () {
  function build() {
    var viewer = document.getElementById('react-viewer');
    if (!viewer) return;

    /* ---- 1. Relocate the "Back to Table of Contents" callout -----------
       The stripped HTML drops a bare <p> ("<-- Back to … Table of Contents")
       as the first child of #react-viewer, OUTSIDE any voice region — so it
       renders in unstyled grey, breaking the design. Move it INSIDE the first
       voice region so it inherits that region's material, and tag it. */
    var firstRegion = viewer.querySelector('[data-voice]');
    var backlink = null;
    var kids = Array.prototype.slice.call(viewer.children);
    for (var i = 0; i < kids.length; i++) {
      var el = kids[i];
      if (el.hasAttribute && el.hasAttribute('data-voice')) break; // don't look past the first region
      if (el.tagName === 'P' && /back to/i.test(el.textContent)) { backlink = el; break; }
    }
    if (backlink && firstRegion) {
      backlink.setAttribute('data-backlink', '');
      // rewrite the arrow glyph to a tidy one and drop the stray spans' whitespace
      var a = backlink.querySelector('a');
      backlink.innerHTML = '';
      var arrow = document.createElement('span');
      arrow.textContent = '\u2190 Return to ';
      backlink.appendChild(arrow);
      if (a) { backlink.appendChild(a); }
      var tail = document.createElement('span');
      tail.textContent = ' \u00b7 Table of Contents';
      backlink.appendChild(tail);
      firstRegion.insertBefore(backlink, firstRegion.firstChild);
    }

    /* ---- 2. Punched binder holes --------------------------------------
       Three nicely-shaded holes, locked to the left margin of every
       Publisher region. position:sticky keeps them pinned while that
       section scrolls, then they scroll away with the section's end. */
    function holes(cls) {
      var b = document.createElement('div');
      b.className = cls;
      b.setAttribute('aria-hidden', 'true');
      b.appendChild(document.createElement('i'));
      b.appendChild(document.createElement('i'));
      b.appendChild(document.createElement('i'));
      return b;
    }

    var pubs = viewer.querySelectorAll('[data-voice="publisher"]');
    for (var p = 0; p < pubs.length; p++) {
      pubs[p].insertBefore(holes('binder'), pubs[p].firstChild);
    }

    /* ---- 3. Make the chapter title card match the voice that follows -----
       The title card (the <h1> banner straight under <nav>) used to be a hard
       blue Publisher frame on EVERY page — jarring above a white handbook page,
       and it doubled the binder holes when a Publisher region followed. Instead,
       tag the wrapper with the voice of the first content region so the card's
       palette + type match whatever opens the chapter. No holes on the card. */
    var card = document.querySelector('body > nav ~ div > h1');
    if (card) {
      var headVoice = 'orientation'; // default: warm-white handbook stock
      var ck = Array.prototype.slice.call(viewer.children);
      for (var c = 0; c < ck.length; c++) {
        var node = ck[c];
        if (node.nodeType !== 1) continue;                       // elements only
        if (node.hasAttribute('data-backlink')) continue;        // skip the return line
        if (node.tagName === 'P' && /back to/i.test(node.textContent)) continue;
        if (!node.textContent.trim() && node.tagName !== 'FIGURE') continue; // skip empties
        if (node.hasAttribute('data-voice')) headVoice = node.getAttribute('data-voice');
        break;                                                   // first real block wins
      }
      card.parentNode.setAttribute('data-head-voice', headVoice);
    }

    pageNameInNav();
    pageSectionIndex();
  }

  /* ---- 4. Current page name, seated to the LEFT of the Chapters selector --
     Pull the chapter title (the <h1> banner under <nav>) and drop it into the
     header beside the dropdown, grouped so the two sit together on the right. */
  function pageNameInNav() {
    var nav = document.querySelector('body > nav');
    if (!nav) return;
    var details = nav.querySelector('details');
    var title = document.querySelector('body > nav ~ div > h1');
    if (!details || !title) return;
    if (nav.querySelector('.nav-right')) return;            // idempotent

    var group = document.createElement('div');
    group.className = 'nav-right';
    var label = document.createElement('span');
    label.className = 'nav-page';
    label.textContent = (title.textContent || '').trim();
    nav.insertBefore(group, details);
    group.appendChild(label);
    group.appendChild(details);                              // re-parent the dropdown
  }

  /* ---- 5. On-page section index ------------------------------------------
     Build a floating outline of the chapter's sections in the wide right
     margin: numbered/anchored to every heading, with hash links, smooth
     scroll, and live scroll-spy highlighting the section you're reading.
     Three switchable treatments (ticks / card / directory). */
  function slugify(s, used) {
    var base = (s || '').toLowerCase()
      .replace(/[\u2018\u2019\u201c\u201d]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
    var id = base, n = 2;
    while (used[id]) { id = base + '-' + n; n++; }
    used[id] = true;
    return id;
  }

  function pageSectionIndex() {
    var viewer = document.getElementById('react-viewer');
    var chapter = document.querySelector('body > nav ~ div > h1');
    if (!viewer) return;

    var used = {};
    var entries = [];

    // chapter title first — a "return to top" anchor
    if (chapter) {
      if (!chapter.id) chapter.id = slugify(chapter.textContent || 'top', used);
      else used[chapter.id] = true;
      entries.push({ el: chapter, level: 1, text: (chapter.textContent || '').trim() });
    }

    // section headings inside the content (skip TOC lists & cross-page links)
    var heads = viewer.querySelectorAll('h1, h2, h3');
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      if (h.closest('blockquote')) continue;                 // pull-quotes / TOC list
      var txt = (h.textContent || '').trim();
      if (!txt) continue;
      var link = h.querySelector('a[href]');
      if (link && /\.html(\#|$)/i.test(link.getAttribute('href') || '')) continue; // TOC entry
      if (!h.id) h.id = slugify(txt, used); else used[h.id] = true;
      entries.push({ el: h, level: +h.tagName.charAt(1), text: txt });
    }

    if (entries.length < 3) return;                          // not worth an index

    // normalise levels to 1..3 for indentation
    var minLvl = Math.min.apply(null, entries.map(function (e) { return e.level; }));

    var aside = document.createElement('aside');
    aside.className = 'page-index';
    aside.setAttribute('aria-label', 'Sections on this page');

    var head = document.createElement('div');
    head.className = 'page-index__head';
    head.textContent = 'Floor Directory';
    aside.appendChild(head);

    var list = document.createElement('nav');
    list.className = 'page-index__list';
    aside.appendChild(list);

    entries.forEach(function (e, idx) {
      var a = document.createElement('a');
      a.href = '#' + e.el.id;
      a.setAttribute('data-level', Math.min(3, e.level - minLvl + 1));
      a.textContent = e.text;
      list.appendChild(a);
      e.link = a;
    });

    aside.setAttribute('data-toc-style', 'card');

    // ---- voice awareness: which [data-voice] region does each heading live in? --
    // The directory re-skins itself to match the voice of the section you are
    // reading, and crossfades between skins on pages that switch voices.
    function voiceOf(el) {
      var r = el.closest && el.closest('[data-voice]');
      if (r) return r.getAttribute('data-voice') || 'orientation';
      // headings outside any region (the chapter title) follow the head voice
      var hv = document.querySelector('body > nav ~ div[data-head-voice]');
      return (hv && hv.getAttribute('data-head-voice')) || 'orientation';
    }
    entries.forEach(function (e) { e.voice = voiceOf(e.el); });
    // mark whether the page mixes voices at all — drives the transition styling
    var multiVoice = entries.some(function (e) { return e.voice !== entries[0].voice; });
    var VOICE_NAME = { publisher:'THE PUBLISHER', orientation:'ORIENTATION', citizen:'CONCERNED CITIZEN' };
    aside.setAttribute('data-active-voice', entries[0].voice);
    head.setAttribute('data-voice-name', VOICE_NAME[entries[0].voice] || '');
    if (multiVoice) aside.setAttribute('data-multi-voice', '');

    document.body.appendChild(aside);

    // ---- scroll-spy: highlight the section currently in view ----
    var links = entries.map(function (e) { return e.link; });
    var active = -1;
    var curVoice = entries[0].voice;
    function onScroll() {
      // the reading line sits just below the fixed header + hash-jump landing
      var offset = 104, found = 0;
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].el.getBoundingClientRect().top <= offset) found = k;
        else break;
      }
      if (found === active) return;
      if (active >= 0) links[active].classList.remove('is-active');
      links[found].classList.add('is-active');
      active = found;
      // re-skin the directory to the voice of the section now in view
      var v = entries[found].voice;
      if (v !== curVoice) {
        aside.setAttribute('data-active-voice', v);
        head.setAttribute('data-voice-name', VOICE_NAME[v] || '');
        curVoice = v;
      }
      // keep the active row visible inside a scrolling index
      var a = links[found], parent = list;
      if (parent.scrollHeight > parent.clientHeight) {
        var top = a.offsetTop, bot = top + a.offsetHeight;
        if (top < parent.scrollTop) parent.scrollTop = top - 8;
        else if (bot > parent.scrollTop + parent.clientHeight) parent.scrollTop = bot - parent.clientHeight + 8;
      }
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
