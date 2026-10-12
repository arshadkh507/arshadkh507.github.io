/* Project gallery slider.
 *
 * Progressive enhancement, deliberately: the slides ship as a plain <ul> of
 * <figure> elements in the page HTML. Without JS you get a readable vertical
 * list of screenshots instead of an empty div, and the images stay crawlable.
 * This script only *rearranges* what is already there — it never creates slides.
 *
 * Controls: prev/next buttons, dot indicators, left/right arrow keys while the
 * gallery has focus, and touch swipe. Honours prefers-reduced-motion by
 * snapping between slides rather than sliding.
 */
(function () {
  "use strict";

  var SWIPE_THRESHOLD = 45; // px of horizontal travel before it counts as a swipe

  function buildSlider(root) {
    var track = root.querySelector("[data-gallery-track]");
    if (!track) return;

    var slides = Array.prototype.slice.call(
      track.querySelectorAll("[data-gallery-slide]")
    );
    if (slides.length === 0) return;

    var index = 0;
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Only now that we know JS is running do we switch on the slider layout.
    root.classList.add("is-enhanced");
    if (reduceMotion) root.classList.add("is-reduced-motion");

    root.setAttribute("role", "group");
    root.setAttribute("aria-roledescription", "carousel");

    // A single slide needs no controls — bail after the layout switch so it
    // still renders as a framed image rather than a bare list item.
    if (slides.length === 1) {
      slides[0].classList.add("is-current");
      return;
    }

    /* ---- controls ---- */
    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "gallery-arrow gallery-arrow-prev";
    prevBtn.setAttribute("aria-label", "Previous screenshot");
    prevBtn.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "gallery-arrow gallery-arrow-next";
    nextBtn.setAttribute("aria-label", "Next screenshot");
    nextBtn.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';

    var dots = document.createElement("div");
    dots.className = "gallery-dots";
    dots.setAttribute("role", "tablist");
    dots.setAttribute("aria-label", "Choose screenshot");

    var dotBtns = slides.map(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Screenshot " + (i + 1));
      dot.addEventListener("click", function () {
        go(i);
      });
      dots.appendChild(dot);
      return dot;
    });

    // Screen readers get the slide change announced; sighted users get the
    // same information from the visible counter.
    var status = document.createElement("p");
    status.className = "gallery-status";
    status.setAttribute("aria-live", "polite");

    var viewport = root.querySelector("[data-gallery-viewport]") || track.parentNode;
    viewport.appendChild(prevBtn);
    viewport.appendChild(nextBtn);
    root.appendChild(dots);
    root.appendChild(status);

    /* ---- state ---- */
    function render() {
      track.style.transform = "translateX(" + -index * 100 + "%)";

      slides.forEach(function (slide, i) {
        var current = i === index;
        slide.classList.toggle("is-current", current);
        // Off-screen slides must not be reachable by keyboard or read out.
        slide.setAttribute("aria-hidden", current ? "false" : "true");
        var link = slide.querySelector("a, button");
        if (link) link.tabIndex = current ? 0 : -1;
      });

      dotBtns.forEach(function (dot, i) {
        var current = i === index;
        dot.classList.toggle("is-current", current);
        dot.setAttribute("aria-selected", current ? "true" : "false");
        dot.tabIndex = current ? 0 : -1;
      });

      status.textContent = "Screenshot " + (index + 1) + " of " + slides.length;
    }

    function go(next) {
      // Wrap around in both directions.
      index = (next + slides.length) % slides.length;
      render();
    }

    prevBtn.addEventListener("click", function () {
      go(index - 1);
    });
    nextBtn.addEventListener("click", function () {
      go(index + 1);
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      }
    });

    /* ---- touch / pointer swipe ---- */
    var startX = null;
    var startY = null;

    track.addEventListener(
      "touchstart",
      function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    track.addEventListener(
      "touchend",
      function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        var dy = e.changedTouches[0].clientY - startY;
        startX = null;
        startY = null;
        // Ignore mostly-vertical travel so a page scroll isn't read as a swipe.
        if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
        go(dx < 0 ? index + 1 : index - 1);
      },
      { passive: true }
    );

    render();
  }

  function init() {
    var galleries = document.querySelectorAll("[data-gallery]");
    Array.prototype.forEach.call(galleries, buildSlider);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
