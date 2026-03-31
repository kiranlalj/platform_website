# Plat-form Website Implementation

- `[x]` **1. Project Foundation**
  - `[x]` create `index.html` to hold component placeholders.
  - `[x]` fix Tailwind CSS v4 variables syntax.
  - `[x]` create `scripts/loader.js` for dynamic component fetching.
  - `[x]` create `main.css` and `variables.css` of legacy structural rules, retaining only complex visual effects.

- `[/]` **2. Component Construction (Tailwind + Fully Responsive)**
  _Refactoring all components to be pixel-perfect copies of the reference site, targeting all breakpoints._
  - `[/]` `00-navbar.html`: Responsive header with animated mobile hamburger menu.
  - `[/]` `01-hero.html`: Video background, headline, and stats bar.
  - `[/]` `01b-infrastructure.html`: "We run your infrastructure" text + 3D floating blobs.
  - `[/]` `02-our-work.html`: 001 Featured Product and Product Lineup bento cards.
  - `[/]` `03-services.html`: 002 Four-part services accordion layout.
  - `[/]` `04-process.html`: 003 Stepped Horizontal Slider layout.
  - `[/]` `05-analytics.html`: 004 Data visualization grid.
  - `[/]` `06-pricing.html`: 005 Pricing tiers.
  - `[/]` `07-faq.html`: 006 Questions & Answers.
  - `[/]` `08-team.html`: 007 Meet the Team grid.
  - `[/]` `09-testimonials.html`: 008 "What Our Clients Say" review cards.
  - `[ ]` `09b-labs.html`: **[NEW]** 009 Platform Labs® blog post table.
  - `[ ]` `09c-contact.html`: **[NEW]** "Let's Talk" section with contact forms and marquee text.
  - `[/]` `10-footer.html`: Complete site footer with newsletter input.

- `[/]` **3. Animation Integration**
  - `[/]` Bind GSAP ScrollTriggers sequentially after the DOM loader finishes.
  - `[/]` Implement exact parallax effects for background videos and floating elements.
  - `[/]` Implement exact word-by-word text color fading in the infrastructure section.
  - `[ ]` Ensure smooth hamburger X-transition and slider logic matches Framer.

- `[ ]` **4. Final Review & Polish**
  - `[ ]` Use Puppeteer to generate screenshots and compare visually with `plat-form.framer.ai`.
  - `[ ]` Validate exact matching of typography spacing, padding, and colors.
