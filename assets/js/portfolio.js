document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("#project-tabs li");
  const projectItems = document.querySelectorAll(
    ".projects-list .project-item"
  );

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));
      // Add active class to the clicked tab
      this.classList.add("active");

      // Get the data-tab attribute value
      const tabName = this.getAttribute("data-tab");

      // Toggle the .open class based on the selected tab
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
