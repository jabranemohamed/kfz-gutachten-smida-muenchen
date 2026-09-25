/* KGS Kfz-Gutachter — interactions légères, sans dépendance */
(function () {
  "use strict";

  /* Menu mobile */
  var burger = document.querySelector(".burger");
  var panel = document.querySelector(".mobile-panel");
  if (burger && panel) {
    var close = panel.querySelector(".mobile-panel__close");
    var open = function (state) {
      panel.classList.toggle("is-open", state);
      burger.setAttribute("aria-expanded", String(state));
      document.body.style.overflow = state ? "hidden" : "";
      if (state) {
        var first = panel.querySelector("a, button");
        if (first) first.focus();
      } else {
        burger.focus();
      }
    };
    burger.addEventListener("click", function () { open(true); });
    if (close) close.addEventListener("click", function () { open(false); });
    panel.addEventListener("click", function (e) {
      if (e.target === panel) open(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) open(false);
    });
    panel.querySelectorAll("nav a").forEach(function (a) {
      a.addEventListener("click", function () { open(false); });
    });
  }

  /* Reveal au scroll (progressive enhancement) */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");
  if (!reduced && "IntersectionObserver" in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("is-in"); });
  }

  /* Compteurs (stat chips) */
  var counters = document.querySelectorAll("[data-count]");
  if (!reduced && "IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        cio.unobserve(entry.target);
        var el = entry.target;
        var end = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var t0 = null;
        var dur = 900;
        var tick = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* Formulaire : mailto propre (site statique, sans backend) */
  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var get = function (name) {
        var f = form.elements[name];
        return f && f.value ? f.value.trim() : "";
      };
      var subject = "Anfrage über die Webseite";
      var betreff = get("betreff");
      if (betreff) subject += " – " + betreff;
      var body =
        "Name: " + get("name") + "\n" +
        "E-Mail: " + get("email") + "\n" +
        "Telefon: " + get("telefon") + "\n" +
        (betreff ? "Worum geht es: " + betreff + "\n" : "") +
        "\n" + get("nachricht");
      window.location.href =
        "mailto:" + form.getAttribute("data-mailto") +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  });
})();
