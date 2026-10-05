/* ==========================================================================
   Contact — composes the form into an email and hands it to the visitor's
   mail app. Without JS the form posts to a mailto: action as plain text.
   ========================================================================== */

(function () {
  "use strict";

  var form = document.querySelector("[data-contact]");
  if (!form) return;

  var status = form.querySelector("[data-contact-status]");
  var to = form.dataset.contact;

  function val(name) {
    var el = form.elements[name];
    return el ? el.value.trim() : "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var kinds = Array.prototype.slice
      .call(form.querySelectorAll("input[name='kind']:checked"))
      .map(function (c) { return c.value; });

    var subject = "Project enquiry — " + val("name");
    var lines = [
      val("message"),
      "",
      "—",
      "Name: " + val("name"),
      "Email: " + val("email"),
      kinds.length ? "Looking for: " + kinds.join(", ") : "",
      val("timeline") ? "Timeline: " + val("timeline") : "",
      val("budget") ? "Budget: " + val("budget") : "",
    ].filter(function (l, i) { return l !== "" || i < 3; });

    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    status.textContent = "Your email app should open with the message ready to send. If nothing happens, write to " + to + " directly.";
  });
})();
