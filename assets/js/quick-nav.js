/* Quick navigation.
 *
 * The header is not sticky — it scrolls away. This puts the same destinations
 * back within reach as a floating glass bar once the header has actually left
 * the viewport. It watches the header element itself rather than a hard-coded
 * scroll offset, so it stays correct regardless of header height, zoom level
 * or viewport size.
 *
 * Placement is CSS's job: a top-centre pill on desktop, a bottom bar within
 * thumb reach on mobile. This file only decides *whether* it is shown.
 */
(function () {
  "use strict";

  function init() {
    var nav = document.getElementById("quick-nav");
    var header = document.getElementById("header");
    if (!nav || !header) return;

    /* ---- active item ----
       The page tells us which section it belongs to; on the homepage a scroll
       spy refines that per section. */
    var links = Array.prototype.slice.call(nav.querySelectorAll("a[data-nav]"));

    function setActive(name) {
      links.forEach(function (a) {
        var on = a.dataset.nav === name;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }

    setActive(document.body.dataset.activeNav || "");

    /* ---- show once the header has scrolled out of view ---- */
    function show(on) {
      // `hidden` keeps it out of the accessibility tree and the tab order
      // entirely when it isn't showing; the class drives the transition.
      if (on) {
        nav.hidden = false;
        // Next frame, so the transition has a start state to animate from.
        requestAnimationFrame(function () {
          nav.classList.add("is-visible");
        });
      } else {
        nav.classList.remove("is-visible");
      }
    }

    // Keep it out of the tab order until the fade-out has finished.
    nav.addEventListener("transitionend", function (e) {
      if (e.propertyName === "opacity" && !nav.classList.contains("is-visible")) {
        nav.hidden = true;
      }
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          show(!entries[0].isIntersecting);
        },
        { threshold: 0 }
      ).observe(header);
    } else {
      // Fallback for browsers without IO: compare against the header's height.
      window.addEventListener("scroll", function () {
        show(window.scrollY > header.offsetHeight);
      });
    }

    /* ---- homepage scroll spy ----
       Only meaningful where the sections actually exist. */
    var sections = ["about", "work-experience", "portfolio", "contact"]
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
      var idToNav = {
        about: "about",
        "work-experience": "experience",
        portfolio: "portfolio",
        contact: "contact",
      };

      var spy = new IntersectionObserver(
        function (entries) {
          // Pick the entry nearest the top of the viewport among those visible,
          // so overlapping sections don't fight over the active state.
          var visible = entries.filter(function (e) {
            return e.isIntersecting;
          });
          if (!visible.length) return;
          visible.sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
          setActive(idToNav[visible[0].target.id] || "home");
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );

      sections.forEach(function (s) {
        spy.observe(s);
      });
    }
  }

  // The nav ships inside the header partial, so it only exists once
  // include.js has injected it.
  document.addEventListener("partials:loaded", init);
})();
