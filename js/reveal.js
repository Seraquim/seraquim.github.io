/* Reveal — fades .rv elements in as they enter view. */

(function () {
  "use strict";

  var els = document.querySelectorAll(".rv");
  if (!els.length) return;

  if (SRQ.reduced() || !("IntersectionObserver" in window)) {
    els.forEach(function (el) {
      el.classList.add("is-in");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px" }
  );

  els.forEach(function (el) {
    io.observe(el);
  });
})();
