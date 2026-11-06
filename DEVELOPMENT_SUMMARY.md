# Development summary

Lanka Stayz is a static, multi-page accommodation-booking prototype built with semantic HTML, CSS, and vanilla JavaScript. The implementation keeps page content, shared site chrome, styles, and sample property data separate so the project can be hosted without a build step or runtime dependency.

## Approach and technical decisions

- Each customer-facing destination has its own HTML page. `assets/js/components/site-shell.js` provides reusable navigation and footer Web Components, and registers the shared Google Fonts and Font Awesome stylesheet links centrally.
- `assets/js/data.js` is the single source for the sample property catalogue. `assets/js/app.js` handles page-specific rendering, filtering, navigation state, search, date calculations, image viewing, and front-end form validation.
- `assets/css/styles.css` provides the shared visual system, responsive layouts, picker styling, and reduced-motion styling.
- Images are stored locally in responsive 960px and 1280px variants. Accommodation images are explicitly presented as representative references rather than as photographs of fictional properties, and source/license credits are documented in the README.
- Search results, destination/guest filters, pagination, property galleries, stay totals, and booking-request demonstrations are implemented on the client.

## Limitations

This is an assessment prototype, not a live reservation service. Property listings, reviews, contact details, and review scores are fictional. Booking and contact forms validate and show local demonstration confirmations, but do not transmit or save information. There is no live availability, user account, reservation database, or payment gateway. Web fonts and Font Awesome are loaded from external providers.

Before public presentation, replace fictional contact and social details with verified channels and make sure all sample content is clearly disclosed. The current directory is not connected to a public Git repository, so the included GitHub Pages workflow still requires a repository, Pages configuration, and a successful deployment before a public URL is available.

## Interview walkthrough

Start at `index.html` and explain the shared header/footer components, then follow a search into `stays.html`, where the data module powers filtering, sorting, and pagination. Open a card to show the dynamic details and image lightbox, then follow the booking action to demonstrate query-string context, native form validation, date/capacity checks, and the explicit no-backend confirmation. The booking flow is intentionally a request demonstration and must not be described as a completed reservation.

## Next steps for a commercial platform

1. Define a backend API and data model for properties, owners, guests, availability, and booking requests; validate all submitted data on the server.
2. Add authenticated owner/admin workflows with role-based authorization and audit trails.
3. Implement concurrency-safe availability and reservation management, then integrate a compliant payment provider with idempotent payment handling.
4. Add email notifications, consent and privacy handling, image storage/CDN delivery, monitoring, backups, and production error reporting.
5. Add automated unit, integration, accessibility, and cross-browser tests; introduce CI checks before deployment.
6. Replace all fictional listings, reviews, contact details, and social links with verified, authorized content.

## Running and deployment

Run `python -m http.server 8000` from the project directory and open `http://localhost:8000`. The project has no production build step. The `.github/workflows/pages.yml` workflow can deploy the static files to GitHub Pages after the source is pushed to a repository and Pages is configured to use GitHub Actions.
