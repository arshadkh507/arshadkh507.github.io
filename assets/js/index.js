const body = document.querySelector("body");
document.addEventListener("partials:loaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navList = document.getElementById("primary-nav");
  const burgerIcon = burgerMenu.querySelector("i");

  // Mobile menu. State lives in aria-expanded and an .is-open class; the CSS
  // keeps the closed list visibility:hidden so it is out of the tab order.
  function setMenu(open) {
    navList.classList.toggle("is-open", open);
    burgerMenu.setAttribute("aria-expanded", String(open));
    burgerMenu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    burgerIcon.classList.toggle("fa-bars", !open);
    burgerIcon.classList.toggle("fa-xmark", open);
  }
  const menuIsOpen = () => navList.classList.contains("is-open");

  burgerMenu.addEventListener("click", () => setMenu(!menuIsOpen()));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuIsOpen()) {
      setMenu(false);
      burgerMenu.focus();
    }
  });
  
  // Smooth scroll for in-page anchor links. Nav links from the shared header
  // partial are root-relative (e.g. "/index.html#about") so they work
  // correctly from any page depth; when the target hash lives on the current
  // page we intercept and scroll instead of letting the browser reload.
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const url = new URL(href, window.location.origin);
      const isSamePage =
        url.pathname === window.location.pathname ||
        (url.pathname === "/index.html" && window.location.pathname === "/");
      if (isSamePage && url.hash) {
        e.preventDefault();
        const target = document.querySelector(url.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (menuIsOpen()) setMenu(false);
        }
      }
    });
  });
  
  // About tabs functionality
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
  
  // Scroll-triggered animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Elements to animate
  const animateElements = document.querySelectorAll(
    ".hero-content, .stats-item, .about-content, .experience-item, .portfolio-item, .contact-wrapper, .section-title"
  );
  
  animateElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
  
  // Stats counter animation
  const prefersReducedMotion = matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const statsItems = document.querySelectorAll(".stats-item span");
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const isNumber = /[\d.]+/.test(finalValue);
        
        if (isNumber && !prefersReducedMotion) {
          const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ""));
          const suffix = finalValue.replace(/[\d.]/g, "");
          // A decimal target ("1.4M+") counted with Math.floor sits on "0M+"
          // for the entire run, which reads as broken rather than as a count-up.
          const decimals = numericValue % 1 === 0 ? 0 : 1;
          let current = 0;
          const increment = numericValue / 30;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              target.textContent = finalValue;
              clearInterval(timer);
            } else {
              target.textContent = current.toFixed(decimals) + suffix;
            }
          }, 30);
        }
        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  statsItems.forEach((item) => statsObserver.observe(item));
  
  // Navbar scroll effect
  let lastScroll = 0;
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.backgroundColor = "var(--bg-black-transparent)";
      header.style.backdropFilter = "none";
    }
    lastScroll = currentScroll;
  });
  
  // Contact form handling.
  //
  // The form posts to a third-party form backend (no server in this repo). If
  // that POST fails for any reason — endpoint retired, quota hit, network down,
  // ad-blocker — the message would otherwise be silently lost, which is the
  // worst outcome for an inbound enquiry. So a failure hands the visitor a
  // mailto link with everything they typed already in it.
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const EMAIL = "arshadkh507@gmail.com";

    function offerMailtoFallback(form) {
      const data = new FormData(form);
      const subject = data.get("subject") || "Portfolio enquiry";
      const body =
        `From: ${data.get("name") || ""}
Email: ${data.get("email") || ""}

${data.get("message") || ""}`;
      const href =
        "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      let note = form.querySelector(".form-fallback");
      if (!note) {
        note = document.createElement("p");
        note.className = "form-fallback";
        note.setAttribute("role", "alert");
        form.appendChild(note);
      }
      note.innerHTML =
        "That didn't send. Your message is safe — " +
        '<a href="' + href + '">open it in your email app</a> ' +
        "or write to <a href=\"mailto:" + EMAIL + '">' + EMAIL + "</a>.";
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitButton = this.querySelector(".btn-submit");
      const originalText = submitButton.innerHTML;
      const existing = this.querySelector(".form-fallback");
      if (existing) existing.remove();

      submitButton.innerHTML =
        '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
      submitButton.disabled = true;

      fetch(this.action, {
        method: "POST",
        body: new FormData(this),
        headers: { Accept: "application/json" }
      })
        .then((response) => {
          if (!response.ok) throw new Error("HTTP " + response.status);
          submitButton.innerHTML =
            '<span>Message Sent!</span><i class="fas fa-check"></i>';
          submitButton.style.background = "var(--secondary-color)";
          contactForm.reset();
        })
        .catch((error) => {
          submitButton.innerHTML =
            '<span>Could not send</span><i class="fas fa-triangle-exclamation"></i>';
          submitButton.style.background = "var(--accent-danger)";
          offerMailtoFallback(contactForm);
          console.error("Contact form:", error);
        })
        .finally(() => {
          setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = "";
          }, 4000);
        });
    });
  }

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });
    
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
  
  // Update current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Lazy loading images (if not already handled by browser)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
});
