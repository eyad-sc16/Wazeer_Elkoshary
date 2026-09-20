# Wazeer El-Koshary — Ministry of Street Flavor

A restaurant website that showcases the menu and signature dishes, with ordering through WhatsApp. Built with plain HTML, CSS, and JavaScript (no external libraries).

## Features

- Fully responsive design (mobile / tablet / desktop) with a mobile-first approach.
- Mobile navigation menu with page scroll locking.
- Smooth scrolling with fixed-header offset compensation.
- Active section highlighting while scrolling (Scroll Spy).
- Progressive reveal of elements on scroll (Scroll Reveal).
- Scroll progress bar and back-to-top button.
- Respects the `prefers-reduced-motion` user setting.
- JavaScript organized as OOP classes split into focused components.

## Project Structure

```
.
├── index.html            # Main page
├── developer-page.html   # Developer page
├── Css/
│   ├── base.css          # Tokens, reset, buttons, shared utilities
│   ├── header.css        # Header and navigation
│   ├── sections.css      # Hero, dishes, menu, order
│   ├── footer.css        # Footer
│   └── developer-page.css
├── Js/
│   └── main.js           # Scroll logic and interactions
├── Images/               # Dish images and logo
└── icons/                # Icons
```

## Tech Stack

- Semantic HTML5 with `dir="rtl"` and `lang="ar"`.
- CSS3: Custom Properties, Flexbox, Grid, `clamp()`.
- JavaScript ES6+: Classes, IntersectionObserver, requestAnimationFrame.

## Running Locally

The site is fully static, so you can just open `index.html` in a browser. A local server is recommended:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Developer

**Eyad Nasser** — Software Developer
Developer page inside the site: `developer-page.html`

## License

&copy; 2025 Wazeer El-Koshary — All rights reserved.
