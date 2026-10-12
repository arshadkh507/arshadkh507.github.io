document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("#project-tabs li");
  const projectItems = document.querySelectorAll(
    ".projects-list .project-item"
  );

  function selectTab(tab) {
    tabs.forEach((t) => {
      const isActive = t === tab;
      t.classList.toggle("active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    const tabName = tab.getAttribute("data-tab");

    projectItems.forEach((item) => {
      if (tabName === "all" || item.classList.contains(tabName)) {
        item.classList.remove("hide");
        item.classList.add("open");
      } else {
        item.classList.remove("open");
        item.classList.add("hide");
      }
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", function () {
      selectTab(this);
    });

    // These are <li> rather than <button>, so keyboard support is not free:
    // Enter/Space activate, and arrow keys move between tabs the way a
    // tablist is expected to behave.
    tab.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectTab(this);
        return;
      }

      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft")
        next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];

      if (next) {
        e.preventDefault();
        next.focus();
        selectTab(next);
      }
    });
  });
});
