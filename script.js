document.getElementById("year").textContent = new Date().getFullYear();

/* Mobile nav */
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

/* Sticky header + scroll progress */
const header = document.getElementById("site-header");
const progressBar = document.getElementById("progress-bar");
function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 40);
  const h = document.documentElement;
  const scrollable = h.scrollHeight - h.clientHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = pct + "%";
}
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Hero entrance animation */
const hero = document.querySelector(".hero");
requestAnimationFrame(() => hero.classList.add("is-loaded"));

/* Scroll hint */
document.getElementById("scroll-hint").addEventListener("click", () => {
  document.getElementById("praticien").scrollIntoView({ behavior: "smooth" });
});

/* Scroll-reveal via IntersectionObserver */
const revealEls = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* Floating booking card: show after hero, hide near footer, dismissible */
const bookingFloat = document.getElementById("booking-float");
const bookingClose = document.getElementById("booking-close");
let bookingDismissed = false;

bookingClose.addEventListener("click", () => {
  bookingDismissed = true;
  bookingFloat.classList.remove("is-visible");
});

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (bookingDismissed) return;
      bookingFloat.classList.toggle("is-visible", !entry.isIntersecting);
    });
  },
  { threshold: 0 }
);
heroObserver.observe(hero);

const footer = document.querySelector(".site-footer");
const footerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      bookingFloat.classList.toggle("is-hidden", entry.isIntersecting);
    });
  },
  { threshold: 0.05 }
);
footerObserver.observe(footer);

/* Humains / Animaux crossfade tabs */
const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    tabBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
    document.querySelectorAll("[data-tab-img]").forEach((img) => {
      img.classList.toggle("is-active", img.dataset.tabImg === target);
    });
    document.querySelectorAll("[data-tab-caption]").forEach((cap) => {
      cap.hidden = cap.dataset.tabCaption !== target;
    });
  });
});

/* Centered carousel */
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const dots = Array.from(document.querySelectorAll(".dot"));
let current = 0;

function renderCarousel() {
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
  dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
}
function goTo(index) {
  current = (index + slides.length) % slides.length;
  renderCarousel();
}
document.getElementById("carousel-prev").addEventListener("click", () => goTo(current - 1));
document.getElementById("carousel-next").addEventListener("click", () => goTo(current + 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
renderCarousel();

let carouselTimer = setInterval(() => goTo(current + 1), 5000);
document.getElementById("carousel").addEventListener("mouseenter", () => clearInterval(carouselTimer));
document.getElementById("carousel").addEventListener("mouseleave", () => {
  carouselTimer = setInterval(() => goTo(current + 1), 5000);
});
