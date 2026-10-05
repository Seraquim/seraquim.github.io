/* ==========================================================================
   Hero — SERAQUIM (fitted to the sheet by fit.js) leans towards the
   cursor: letters near the pointer widen a little, the rest give way, and
   a final horizontal correction keeps the word exactly edge to edge.
   Fine pointers only; touch screens and reduced motion get a still word.
   ========================================================================== */

(function () {
  "use strict";

  var mast = document.querySelector("[data-mast]");
  if (!mast || !SRQ.fine || SRQ.reduced()) return;

  var area = mast.closest(".hero") || mast;
  var word = mast.querySelector(".mast__word");
  var letters = Array.prototype.slice.call(mast.querySelectorAll(".mast__l"));
  var n = letters.length;
  var FIT = parseFloat(mast.dataset.fit) || 1;
  var SIGMA = 1.6;

  var cur = letters.map(function () { return 100; });
  var tgt = letters.map(function () { return 100; });
  var running = false;

  function aim(pos) {
    if (pos == null) {
      for (var r = 0; r < n; r++) tgt[r] = 100;
      return;
    }
    var raw = [];
    var sum = 0;
    for (var i = 0; i < n; i++) {
      var d = i + 0.5 - pos;
      raw[i] = 1.4 + Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
      sum += raw[i];
    }
    for (var j = 0; j < n; j++) tgt[j] = (100 * n * raw[j]) / sum;
  }

  function step() {
    var moving = false;
    for (var i = 0; i < n; i++) {
      cur[i] += (tgt[i] - cur[i]) * 0.08;
      if (Math.abs(tgt[i] - cur[i]) > 0.05) moving = true;
      letters[i].style.setProperty("--w", cur[i].toFixed(2));
    }
    var k = (mast.clientWidth * FIT) / word.offsetWidth;
    word.style.transform = "scaleX(" + Math.max(0.9, Math.min(1.1, k)).toFixed(4) + ")";

    if (moving) requestAnimationFrame(step);
    else running = false;
  }

  function kick() {
    if (running) return;
    running = true;
    requestAnimationFrame(step);
  }

  area.addEventListener("pointermove", function (e) {
    var r = word.getBoundingClientRect();
    aim(((e.clientX - r.left) / r.width) * n);
    kick();
  });

  area.addEventListener("pointerleave", function () {
    aim(null);
    kick();
  });
})();
