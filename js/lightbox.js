/* ==========================================================================
   Lightbox — opens archive specimens large, in a native <dialog>. Links
   carry data-lb plus data-label / data-title / data-year; without JS they
   simply open the image. Arrow keys step through the visible items.
   ========================================================================== */

(function () {
  "use strict";

  var dlg = document.getElementById("lightbox");
  if (!dlg || typeof dlg.showModal !== "function") return;

  var img = dlg.querySelector("[data-lb-img]");
  var label = dlg.querySelector("[data-lb-label]");
  var title = dlg.querySelector("[data-lb-title]");
  var count = dlg.querySelector("[data-lb-count]");
  var links = Array.prototype.slice.call(document.querySelectorAll("a[data-lb]"));
  var index = 0;

  function visible() {
    return links.filter(function (a) {
      return !a.closest("[hidden]");
    });
  }

  function show(a) {
    var list = visible();
    index = list.indexOf(a);
    img.src = a.getAttribute("href");
    img.alt = a.dataset.label + ": " + a.dataset.title;
    label.textContent = a.dataset.label + " — " + a.dataset.year;
    title.textContent = a.dataset.title;
    count.textContent = index + 1 + " / " + list.length;
  }

  function step(dir) {
    var list = visible();
    show(list[(index + dir + list.length) % list.length]);
  }

  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      show(a);
      dlg.showModal();
      document.documentElement.classList.add("lb-open");
    });
  });

  dlg.addEventListener("close", function () {
    document.documentElement.classList.remove("lb-open");
  });

  dlg.querySelector("[data-lb-prev]").addEventListener("click", function () { step(-1); });
  dlg.querySelector("[data-lb-next]").addEventListener("click", function () { step(1); });
  dlg.querySelector("[data-lb-close]").addEventListener("click", function () { dlg.close(); });

  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
})();
