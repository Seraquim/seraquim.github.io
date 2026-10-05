/* ==========================================================================
   The Index — opens the navigation dialog from any [data-index-open]
   (the Slug, the header menu) or the "I" key. Without JS the menu link
   falls through to the footer index.
   ========================================================================== */

(function () {
  "use strict";

  var dlg = document.getElementById("index-dialog");
  if (!dlg || typeof dlg.showModal !== "function") return;

  var root = document.documentElement;

  function open() {
    if (dlg.open) return;
    dlg.showModal();
    root.classList.add("ix-open");
  }

  /* showModal() returns focus to the opener on close by itself. */
  dlg.addEventListener("close", function () {
    root.classList.remove("ix-open");
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-index-open]")) {
      e.preventDefault();
      open();
    } else if (dlg.open && (e.target.closest("[data-index-close]") || e.target.closest("a[href^='#']"))) {
      dlg.close();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || dlg.open) return;
    var t = e.target;
    if (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName)) return;
    if (e.key === "i" || e.key === "I") {
      e.preventDefault();
      open();
    }
  });
})();
