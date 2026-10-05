/* ==========================================================================
   Filter — toggles items in a list by tag. Markup:
     <div class="filters" data-filter-for="work-grid">
       <button type="button" data-value="all" aria-pressed="true">All</button>
       <button type="button" data-value="identity" aria-pressed="false">…</button>
     </div>
     <ul id="work-grid" data-filter-grid>
       <li data-filter-item data-tags="identity graphic">…</li>
   A ?filter=identity query preselects a value. Without JS everything shows.
   ========================================================================== */

(function () {
  "use strict";

  document.querySelectorAll("[data-filter-for]").forEach(function (bar) {
    var grid = document.getElementById(bar.dataset.filterFor);
    if (!grid) return;

    var buttons = bar.querySelectorAll("button[data-value]");
    var items = grid.querySelectorAll("[data-filter-item]");
    var status = document.querySelector("[data-filter-status='" + bar.dataset.filterFor + "']");

    function apply(value) {
      var shown = 0;
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.value === value));
      });
      items.forEach(function (item) {
        var match = value === "all" || (" " + item.dataset.tags + " ").indexOf(" " + value + " ") > -1;
        item.hidden = !match;
        if (match) shown++;
      });
      grid.classList.toggle("is-filtered", value !== "all");
      if (status) status.textContent = shown + (shown === 1 ? " item" : " items") + " shown";
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.dataset.value);
      });
    });

    var initial = new URLSearchParams(window.location.search).get("filter");
    if (initial && bar.querySelector("[data-value='" + CSS.escape(initial) + "']")) apply(initial);
  });
})();
