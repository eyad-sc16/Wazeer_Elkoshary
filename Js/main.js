"use strict";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

class HeaderState {
  constructor(header, threshold = 10) {
    this.header = header;
    this.threshold = threshold;
  }

  update(offset) {
    if (!this.header) return;
    this.header.classList.toggle("is-scrolled", offset > this.threshold);
  }
}

class ScrollProgress {
  constructor(bar) {
    this.bar = bar;
  }

  update(offset) {
    if (!this.bar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (offset / scrollable) * 100 : 0;
    this.bar.style.width = `${percent}%`;
  }
}

class BackToTop {
  constructor(button, threshold = 500) {
    this.button = button;
    this.threshold = threshold;
  }

  init() {
    if (!this.button) return;
    this.button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  update(offset) {
    if (!this.button) return;
    this.button.classList.toggle("is-visible", offset > this.threshold);
  }
}

class MobileNav {
  constructor(nav, toggle) {
    this.nav = nav;
    this.toggle = toggle;
  }

  init() {
    if (!this.nav || !this.toggle) return;

    this.toggle.addEventListener("click", () => this.toggleNav());
    this.nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) this.close();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) this.close();
    });
  }

  toggleNav() {
    const isOpen = this.nav.classList.toggle("is-open");
    this.toggle.classList.toggle("is-open", isOpen);
    this.toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);
  }

  close() {
    if (!this.nav.classList.contains("is-open")) return;
    this.nav.classList.remove("is-open");
    this.toggle.classList.remove("is-open");
    this.toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }
}

class SmoothScroller {
  constructor(header) {
    this.header = header;
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const hash = link.getAttribute("href");
        if (!hash || hash === "#") return;

        const target = document.querySelector(hash);
        if (!target) return;

        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - this.getOffset() + 1;
        window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });
  }

  getOffset() {
    return this.header ? this.header.offsetHeight : 0;
  }
}

class ScrollSpy {
  constructor(links) {
    this.links = links;
  }

  init() {
    if (!("IntersectionObserver" in window) || !this.links.length) return;

    const sections = this.links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          this.links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
}

class ScrollReveal {
  constructor(selector = ".reveal") {
    this.items = document.querySelectorAll(selector);
  }

  init() {
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries, instance) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );

      this.items.forEach((item) => observer.observe(item));
      return;
    }

    this.items.forEach((item) => item.classList.add("is-visible"));
  }
}

class ScrollManager {
  constructor(components) {
    this.components = components;
    this.ticking = false;
    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.update();
  }

  handleScroll() {
    if (this.ticking) return;
    this.ticking = true;
    window.requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  }

  update() {
    const offset = window.pageYOffset;
    this.components.forEach((component) => component.update(offset));
  }
}

class App {
  constructor() {
    this.header = document.querySelector("[data-header]");
    this.nav = document.querySelector("[data-nav]");
    this.navToggle = document.querySelector("[data-nav-toggle]");
    this.progressBar = document.querySelector("[data-scroll-progress]");
    this.toTop = document.querySelector("[data-to-top]");
    this.navLinks = Array.from(document.querySelectorAll('.nav__link[href^="#"]'));
  }

  init() {
    const mobileNav = new MobileNav(this.nav, this.navToggle);
    mobileNav.init();

    const smoothScroller = new SmoothScroller(this.header);
    smoothScroller.init();

    const scrollSpy = new ScrollSpy(this.navLinks);
    scrollSpy.init();

    const scrollReveal = new ScrollReveal();
    scrollReveal.init();

    const backToTop = new BackToTop(this.toTop);
    backToTop.init();

    const scrollManager = new ScrollManager([
      new HeaderState(this.header),
      new ScrollProgress(this.progressBar),
      backToTop,
    ]);
    scrollManager.init();
  }
}

new App().init();
