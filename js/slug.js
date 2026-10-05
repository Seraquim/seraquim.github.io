/* ==========================================================================
   The Slug — names the section in view and measures reading progress.
   Sections declare themselves with data-section="03 — Process"; a section
   marked data-slug-rest (the hero) hides the label while it's in view.
   ========================================================================== */

(function () {
  "use strict";

  var label = document.querySelector("[data-slug-label]");
  var bar = document.querySelector("[data-slug-progress]");
  if (!label || !bar) return;

  var slug = label.closest(".slug");

  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));

  var update = SRQ.frame(function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty("--progress", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);

    var line = window.innerHeight * 0.5;
    var pick = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) pick = sections[i];
    }
    if (pick && label.textContent !== pick.dataset.section) label.textContent = pick.dataset.section;
    /* Nothing to report on the opening screen. */
    slug.classList.toggle("is-resting", !!pick && pick.hasAttribute("data-slug-rest"));
  });

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
