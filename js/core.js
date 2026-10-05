/* ==========================================================================
   Core — a tiny shared namespace. Every other file is an independent IIFE
   that bails out quietly when its markup isn't on the page.
   ========================================================================== */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  window.SRQ = {
    reduced: function () {
      return reduced.matches;
    },
    fine: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    /* Run fn at most once per animation frame. */
    frame: function (fn) {
      var queued = false;
      return function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          fn();
        });
      };
    },
  };
})();
