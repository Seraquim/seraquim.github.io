/* ==========================================================================
   Disciplines — pointing at (or focusing) a row swaps the preview image
   beside the list. Each row carries data-preview, data-preview-alt and
   data-caption.
   ========================================================================== */

(function () {
  "use strict";

  var preview = document.querySelector("[data-disc-preview]");
  if (!preview) return;

  var img = preview.querySelector("img");
  var caption = document.querySelector("[data-disc-caption]");
  var current = img.getAttribute("src");
  var timer;

  function show(row) {
    var src = row.dataset.preview;
    if (!src || src === current) return;
    current = src;
    img.classList.add("is-swapping");
    clearTimeout(timer);
    timer = setTimeout(function () {
      img.src = src;
      img.alt = row.dataset.previewAlt || "";
      if (caption) caption.textContent = row.dataset.caption || "";
      img.classList.remove("is-swapping");
    }, SRQ.reduced() ? 0 : 180);
  }

  document.querySelectorAll("[data-preview]").forEach(function (row) {
    row.addEventListener("pointerenter", function () {
      show(row);
    });
    row.addEventListener("focus", function () {
      show(row);
    });
  });
})();
