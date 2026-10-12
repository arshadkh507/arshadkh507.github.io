/* Project manifest — the single list of what exists and where it lives.
 *
 * Detail pages are plain static HTML (projects/<slug>/index.html) so their
 * content stays crawlable; this file is the index over them. It powers the
 * link-integrity check below and is the one place to edit when a project is
 * added, renamed or removed.
 *
 * To add a project: add an entry here, create projects/<slug>/index.html by
 * copying the closest existing page, add a card to portfolio/portfolio.html,
 * and add the URL to sitemap.xml.
 */
window.PROJECTS = [
  {
    "slug": "kids-learning-app",
    "title": "Kids Learning App",
    "tagline": "An AI platform for creating, editing and publishing personalised children's books.",
    "category": "full-stack",
    "url": "/projects/kids-learning-app/"
  },
  {
    "slug": "auto-repair-shop-management",
    "title": "Auto Repair Shop Management Platform",
    "tagline": "A web application running an auto repair shop's day-to-day operations end to end.",
    "category": "full-stack",
    "url": "/projects/auto-repair-shop-management/"
  },
  {
    "slug": "autocar-intelligence-platform",
    "title": "AutoCar Intelligence Platform",
    "tagline": "Operational intelligence giving multi-shop auto repair owners one source of truth.",
    "category": "full-stack",
    "url": "/projects/autocar-intelligence-platform/"
  },
  {
    "slug": "linkedin-connection-automation",
    "title": "LinkedIn Connection Automation",
    "tagline": "Five n8n workflows that scrape, enrich and personalise LinkedIn outreach end to end.",
    "category": "automation",
    "url": "/projects/linkedin-connection-automation/"
  },
  {
    "slug": "multi-agent-seo-content-system",
    "title": "Multi-Agent SEO Content Generation System",
    "tagline": "Specialised agents on a Hermes runtime that research, plan and draft publishable articles.",
    "category": "ai-agents",
    "url": "/projects/multi-agent-seo-content-system/"
  },
  {
    "slug": "art-gola-artist-platform",
    "title": "Art Gola — Artist Platform",
    "tagline": "The complete artist journey: application, approval, onboarding, payment and publication.",
    "category": "full-stack",
    "url": "/projects/art-gola-artist-platform/"
  },
  {
    "slug": "health-on-point-pharmacy",
    "title": "Health on Point — Pharmacy Platform",
    "tagline": "A pharmacy e-commerce platform with prescriptions, telehealth consultations and a full admin panel.",
    "category": "full-stack",
    "url": "/projects/health-on-point-pharmacy/"
  },
  {
    "slug": "faizan-auto-pos",
    "title": "Faizan Auto — POS System",
    "tagline": "A point-of-sale and inventory system for an auto parts business, built on the MERN stack.",
    "category": "full-stack",
    "url": "/projects/faizan-auto-pos/"
  },
  {
    "slug": "hire-on-the-spot",
    "title": "Hire On The Spot — Hiring Platform",
    "tagline": "Payments, automated communications and launch QA for a platform connecting employers with candidates.",
    "category": "full-stack",
    "url": "/projects/hire-on-the-spot/"
  }
];

/* Dev-only integrity check: warns when a project card links to a slug that
 * isn't in the manifest. Runs on localhost only so it costs visitors nothing. */
(function () {
  var host = location.hostname;
  if (host !== "localhost" && host !== "127.0.0.1") return;

  document.addEventListener("DOMContentLoaded", function () {
    var known = window.PROJECTS.map(function (p) {
      return p.url;
    });
    var links = document.querySelectorAll('a[href^="/projects/"]');
    Array.prototype.forEach.call(links, function (a) {
      var href = a.getAttribute("href");
      if (known.indexOf(href) === -1) {
        console.warn("[projects] card links to unknown project:", href, a);
      }
    });
  });
})();
