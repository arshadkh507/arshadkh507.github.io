document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("#project-tabs li");
  const projectItems = document.querySelectorAll(
    ".projects-list .project-item"
  );

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const tabName = this.getAttribute("data-tab");

      projectItems.forEach((item) => {
        if (tabName === "all" || item.classList.contains(tabName)) {
          item.classList.remove("hide");
          item.classList.add("open");
        } else {
          item.classList.remove("open");
          item.classList.add("hide");
        }
      });
    });
  });
});
