// Scales the .slide (1280×720) to fit the viewport, preserving aspect ratio.
(function () {
  function fit() {
    var slide = document.querySelector('.slide');
    if (!slide) return;
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    slide.style.transform = 'scale(' + s + ')';
  }
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  fit();
})();
