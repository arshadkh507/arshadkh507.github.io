const body = document.querySelector("body");
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.querySelector(".navbar ul");
  const burgerIcon = document.getElementById("burger-icon");
  burgerMenu.addEventListener("click", function () {
    if (menuToggle.checked) {
      navList.style.right = "-300px";
      burgerIcon.querySelector("i").classList.remove("fa-xmark");
      burgerIcon.querySelector("i").classList.add("fa-bars");
    } else {
      navList.style.right = "0";
      burgerIcon.querySelector("i").classList.remove("fa-bars");
      burgerIcon.querySelector("i").classList.add("fa-xmark");
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
  const tabs = document.querySelectorAll(".about-tabs li");
  const tabContents = document.querySelectorAll(".tab-content");
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tab) => tab.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      tab.classList.add("active");
      tabContents[index].classList.add("active");
    });
  });
});
