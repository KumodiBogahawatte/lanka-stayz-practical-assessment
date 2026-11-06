(() => {
  const icon = (name) => `<i class="${name}" aria-hidden="true"></i>`;
  const sharedHeadLinks = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
    },
  ];

  sharedHeadLinks.forEach(({ rel, href, crossOrigin }) => {
    if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`))
      return;
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    const localStylesheet = document.querySelector(
      'link[href="assets/css/styles.css"]',
    );
    document.head.insertBefore(link, localStylesheet || null);
  });

  class LankaSiteHeader extends HTMLElement {
    connectedCallback() {
      const currentPage =
        this.getAttribute("page") || document.body.dataset.page || "home";
      const activePage =
        currentPage === "property" || currentPage === "booking"
          ? "stays"
          : currentPage;
      const links = [
        ["home", "Home", "index.html"],
        ["stays", "Explore Stays", "stays.html"],
        ["about", "About Us", "about.html"],
        ["contact", "Contact", "contact.html"],
      ];

      this.innerHTML = `
        <a class="skip-link" href="#main-content">Skip to main content</a>
        <header class="site-header">
          <a class="brand" href="index.html" aria-label="Lanka Stayz home">
            <img src="assets/images/mark.svg" alt="" />
            <span>LANKA <span class="brand-light">STAYZ</span></span>
          </a>
          <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
            ${icon("fa-solid fa-bars")}
          </button>
          <nav class="main-nav" id="primary-navigation" aria-label="Main navigation">
            ${links.map(([page, label, href]) => `<a class="nav-link${activePage === page ? " active" : ""}"${activePage === page ? ' aria-current="page"' : ""} href="${href}">${label}</a>`).join("")}
            <a class="nav-cta" href="index.html#find-a-stay">${icon("fa-solid fa-magnifying-glass")} Find your stay</a>
          </nav>
        </header>`;

      const toggle = this.querySelector(".menu-toggle");
      const toggleIcon = toggle.querySelector("i");
      const nav = this.querySelector(".main-nav");
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        toggle.setAttribute(
          "aria-label",
          expanded ? "Open navigation" : "Close navigation",
        );
        toggleIcon.classList.toggle("fa-bars", expanded);
        toggleIcon.classList.toggle("fa-xmark", !expanded);
        nav.classList.toggle("open", !expanded);
      });
      nav.addEventListener("click", (event) => {
        if (!event.target.closest("a")) return;
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
        toggleIcon.classList.add("fa-bars");
        toggleIcon.classList.remove("fa-xmark");
      });
    }
  }

  class LankaSiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer class="site-footer">
          <div class="footer-main">
            <div class="footer-brand-column">
              <a class="brand footer-brand" href="index.html">
                <img src="assets/images/mark.svg" alt="" />
                <span>LANKA <span class="brand-light">STAYZ</span></span>
              </a>
              <p class="footer-note">Find your place in paradise.</p>
              <p class="footer-about">Thoughtfully chosen villas, homes, and hideaways for discovering Sri Lanka at your own pace.</p>
            </div>
            <div class="footer-column">
              <h2>Explore</h2>
              <a href="stays.html">All stays</a>
              <a href="stays.html?destination=Galle">Galle &amp; the south</a>
              <a href="stays.html?destination=Ella">Hill country</a>
              <a href="stays.html?destination=Trincomalee">East coast</a>
              <a href="about.html">Our story</a>
            </div>
            <div class="footer-column">
              <h2>Get in touch</h2>
              <p>${icon("fa-solid fa-location-dot")} Colombo, Sri Lanka</p>
              <a href="tel:+94112345678">${icon("fa-solid fa-phone")} +94 11 234 5678</a>
              <a href="tel:+94772345678">${icon("fa-solid fa-mobile-screen-button")} +94 77 234 5678</a>
              <a href="mailto:hello@lankastayz.lk">${icon("fa-regular fa-envelope")} hello@lankastayz.lk</a>
            </div>
            <div class="footer-column">
              <h2>Follow along</h2>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">${icon("fa-brands fa-instagram")} Instagram</a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">${icon("fa-brands fa-facebook-f")} Facebook</a>
              <a href="contact.html">${icon("fa-regular fa-message")} Get in touch</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Lanka Stayz</span>
            <span>Made with care in Sri Lanka</span>
          </div>
        </footer>`;
    }
  }

  customElements.define("lanka-site-header", LankaSiteHeader);
  customElements.define("lanka-site-footer", LankaSiteFooter);
})();
