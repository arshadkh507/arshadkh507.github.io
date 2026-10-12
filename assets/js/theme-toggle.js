// Light/dark switch — design-system.md §7.
// The theme itself is resolved and stamped on <html> by a small inline script
// in each page's <head> (before first paint, so there's no flash of the wrong
// theme). This file only wires up the button, which lives in the header
// partial and therefore doesn't exist until include.js has injected it.
document.addEventListener("partials:loaded", function () {
  const button = document.getElementById("theme-toggle");
  if (!button) return;

  const root = document.documentElement;

  function render(theme) {
    const isLight = theme === "light";
    button.setAttribute("aria-pressed", String(isLight));
    button.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
    button.querySelector(".theme-toggle-thumb").textContent = isLight
      ? "☾"
      : "☀";
  }

  render(root.getAttribute("data-theme"));

  button.addEventListener("click", function () {
    const next =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    render(next);
  });
});
