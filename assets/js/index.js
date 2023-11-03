// Declare body at the top of your script
const body = document.querySelector("body");

/*
==========================================================
 Burger Menu | Sidebar Toggling
==========================================================*/

document.addEventListener("DOMContentLoaded", function() {
  const burgerMenu = document.getElementById("burger-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.querySelector(".navbar ul");
  const burgerIcon = document.getElementById("burger-icon");

  burgerMenu.addEventListener("click", function() {
    if (menuToggle.checked) {
      navList.style.right = "-300px"; // Slide out to the right
      burgerIcon.querySelector("i").classList.remove("fa-xmark");
      burgerIcon.querySelector("i").classList.add("fa-bars");
    } else {
      navList.style.right = "0"; // Slide in from the right
      burgerIcon.querySelector("i").classList.remove("fa-bars");
      burgerIcon.querySelector("i").classList.add("fa-xmark");
    }
  });
});



/*
==========================================================
 Active li on clicking
==========================================================*/

const listItem = document.querySelectorAll(".sidebar_inner li");

listItem.forEach((li) => {
  li.addEventListener("click", () => {
    listItem.forEach((li) => {
      li.classList.remove("active");
    });
    li.classList.add("active");
  });
});

/*======== JavaScript for smooth scroll effect =================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

/*======== Contact Me Section =================*/
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      
      // You can add form submission handling here, e.g., sending data to a server
      
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
  });
});
