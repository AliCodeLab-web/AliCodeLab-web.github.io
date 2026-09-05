/* =========================================================
   CONFIG — edit ONLY this block to rebrand / update contact.
   Phone number is intentionally NOT displayed anywhere;
   only Call / WhatsApp buttons are shown.
========================================================= */
const CONFIG = {
  BRAND_SHORT: "Ali",
  BRAND_ACCENT: "CodeLab",
  WHATSAPP_NUMBER: "923227424734",       // digits only, country code, no +
  WHATSAPP_MESSAGE: "Hi, I'd like to discuss a business software project.",
  PHONE_TEL: "+923227424734",            // used only inside tel: link, never shown as text
  EMAIL_ADDRESS: "youremail@example.com" // TODO: replace with your real email
};

document.addEventListener("DOMContentLoaded", function () {

  /* ---- inject brand text ---- */
  document.querySelectorAll("[data-brand-short]").forEach(el => el.textContent = CONFIG.BRAND_SHORT);
  document.querySelectorAll("[data-brand-accent]").forEach(el => el.textContent = CONFIG.BRAND_ACCENT);
  document.querySelectorAll("[data-brand-initials]").forEach(el => el.textContent = (CONFIG.BRAND_SHORT[0] + CONFIG.BRAND_ACCENT[0]).toUpperCase());

  /* ---- wire up contact links (no phone number ever shown as text) ---- */
  const waLink = "https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(CONFIG.WHATSAPP_MESSAGE);
  const telLink = "tel:" + CONFIG.PHONE_TEL;
  const mailLink = "mailto:" + CONFIG.EMAIL_ADDRESS;
  document.querySelectorAll("[data-whatsapp]").forEach(el => { el.href = waLink; el.target = "_blank"; el.rel = "noopener"; });
  document.querySelectorAll("[data-call]").forEach(el => { el.href = telLink; });
  document.querySelectorAll("[data-email]").forEach(el => { el.href = mailLink; });

  /* ---- active nav link based on current file ---- */
  const current = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a[data-page]").forEach(a => {
    if (a.getAttribute("data-page") === current) a.classList.add("active");
  });

  /* ---- navbar scroll state ---- */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- mobile menu ---- */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtn.textContent = navLinks.classList.contains("open") ? "×" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
      });
    });
  }

  /* ---- reveal on scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("active"); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- animated skill bars ---- */
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute("data-width") + "%";
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---- 3D tilt + mouse-follow glow on hover (desktop only) ---- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rx = ((y - rect.height / 2) / (rect.height / 2)) * -7;
        const ry = ((x - rect.width / 2) / (rect.width / 2)) * 7;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.015)`;
        card.style.setProperty("--mx", (x / rect.width * 100) + "%");
        card.style.setProperty("--my", (y / rect.height * 100) + "%");
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });

    const heroVisual = document.querySelector(".hero-visual");
    const dashboard = document.querySelector(".dashboard-3d");
    if (heroVisual && dashboard) {
      heroVisual.addEventListener("mousemove", (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        dashboard.style.animation = "none";
        dashboard.style.transform = `rotateX(${8 - y * 12}deg) rotateY(${-18 + x * 18}deg) translateY(-4px)`;
      });
      heroVisual.addEventListener("mouseleave", () => {
        dashboard.style.animation = "float 6s ease-in-out infinite";
        dashboard.style.transform = "";
      });
    }
  }

  /* ---- scroll to top ---- */
  const scrollTop = document.getElementById("scrollTop");
  if (scrollTop) {
    window.addEventListener("scroll", () => scrollTop.classList.toggle("show", window.scrollY > 500), { passive: true });
    scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---- footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
