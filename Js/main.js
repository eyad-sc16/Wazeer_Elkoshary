(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var nav = document.querySelector("[data-nav]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var progressBar = document.querySelector("[data-scroll-progress]");
  var toTop = document.querySelector("[data-to-top]");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getHeaderHeight() {
    return header ? header.offsetHeight : 0;
  }

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  function toggleNav() {
    if (!nav || !navToggle) return;
    var isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }

  if (nav) {
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 900) closeNav();
  });

  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  Array.prototype.forEach.call(anchorLinks, function (link) {
    link.addEventListener("click", function (event) {
      var hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      var target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight() + 1;
      window.scrollTo({ top: top, behavior: prefersReduced ? "auto" : "smooth" });
    });
  });

  var ticking = false;

  function updateScrollUI() {
    var offset = window.pageYOffset;

    if (header) header.classList.toggle("is-scrolled", offset > 10);
    if (toTop) toTop.classList.toggle("is-visible", offset > 500);

    if (progressBar) {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var percent = scrollable > 0 ? (offset / scrollable) * 100 : 0;
      progressBar.style.width = percent + "%";
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScrollUI);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateScrollUI();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReduced) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    Array.prototype.forEach.call(revealItems, function (item) {
      revealObserver.observe(item);
    });
  } else {
    Array.prototype.forEach.call(revealItems, function (item) {
      item.classList.add("is-visible");
    });
  }
})();
