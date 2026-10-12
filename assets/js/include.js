(function () {
  const placeholders = document.querySelectorAll("[data-include]");

  const fetches = Array.from(placeholders).map((el) => {
    const name = el.dataset.include;
    return fetch(`/partials/${name}.html`)
      .then((res) => res.text())
      .then((html) => {
        el.outerHTML = html;
      });
  });

  Promise.all(fetches).then(() => {
    const activeNav = document.body.dataset.activeNav;
    if (activeNav) {
      const navItem = document.querySelector(`[data-nav="${activeNav}"]`);
      if (navItem) {
        navItem.classList.add("active");
        const link = navItem.querySelector("a");
        if (link) link.setAttribute("aria-current", "page");
      }
    }
    document.dispatchEvent(new Event("partials:loaded"));
  });
})();
