/* ==========================================================================
   Fit — sets --fit-size on every [data-fit] element so its single line of
   text spans the element's width exactly. data-fit="0.98" leaves a margin;
   a [data-fit-text] child, if present, is what gets measured. While
   measuring, .is-measuring lets CSS put animated text back at rest.
   CSS supplies a vw-based fallback for when this never runs.
   ========================================================================== */

(function () {
  "use strict";

  var els = document.querySelectorAll("[data-fit]");
  if (!els.length) return;

  var range = document.createRange();

  function fit() {
    els.forEach(function (el) {
      el.classList.add("is-measuring");
      el.style.setProperty("--fit-size", "100px");
      range.selectNodeContents(el.querySelector("[data-fit-text]") || el);
      var w = range.getBoundingClientRect().width;
      var ratio = parseFloat(el.dataset.fit) || 1;
      if (w > 0) el.style.setProperty("--fit-size", ((100 * el.clientWidth) / w) * ratio + "px");
      el.classList.remove("is-measuring");
    });
  }

  var timer;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(fit, 120);
  });

  /* Refit once the display face arrives: document.fonts.ready can resolve
     before a preloaded font has even been requested. */
  fit();
  if (document.fonts) {
    document.fonts.ready.then(fit);
    document.fonts.addEventListener("loadingdone", fit);
  }
  window.addEventListener("load", fit);
})();
