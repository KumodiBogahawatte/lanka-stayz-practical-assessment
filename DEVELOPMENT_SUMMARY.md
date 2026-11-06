# Development summary

## Project overview

Lanka Stayz is a static accommodation-booking prototype for a practical web development assessment. Visitors can browse fictional sample stays around Sri Lanka, open property details, choose dates and guests, and submit a demo booking request. The project is deployed on GitHub Pages, but the booking flow is only a front-end demonstration.

## How I approached the implementation

I kept the project to separate HTML pages with shared CSS and browser-native JavaScript. That kept it straightforward to host as a static site and meant I did not need a package manager, framework, or build step.

I put the sample catalogue in `assets/js/data.js` so cards, filters, and property pages use the same property names, IDs, prices, capacity, image references, and amenities. The shared header and footer live in `assets/js/components/site-shell.js`; using Web Components avoids repeating the navigation, footer, and external font/icon links in every page. `assets/js/app.js` contains the behavior that changes by page, such as filtering listings, rendering the selected property, updating date totals, and validating forms. The CSS in `assets/css/styles.css` provides the shared visual styles and responsive layouts.

## Project structure and important files

- `index.html` is the homepage, including the hero, featured properties, and search form.
- `stays.html` contains the listing filters, result count, property grid, and pagination.
- `property.html` is a reusable detail-page shell. The `id` query parameter selects which record from `data.js` to display.
- `booking.html` contains the booking request form and its confirmation state.
- `about.html` and `contact.html` provide the informational pages.
- `assets/js/data.js` defines the property records used throughout the site.
- `assets/js/components/site-shell.js` defines the reusable header and footer elements.
- `assets/js/app.js` initializes behavior according to each page's `data-page` value.
- `assets/css/styles.css` contains global styles, page layouts, breakpoints, and reduced-motion handling.
- `assets/images/` contains the local logo and responsive image variants. The photo sources and licenses are listed in [README.md](./README.md).
- `.github/workflows/pages.yml` deploys the static project root to GitHub Pages.

## Features I implemented

The homepage search uses custom destination, calendar, and guest pickers. Submitting a destination or a complete date range sends the selected values to `stays.html` as query parameters. The listing script uses the destination and guest count to filter properties, sorts by nightly price when requested, and paginates results six at a time. Dates are carried forward in property links, but they do not filter availability.

Each property card links to `property.html` with that property's ID. The page looks up the matching data and renders its name, location, description, price, capacity, amenities, and three image references. An unknown ID produces a not-found message. On the Galle sample only, the page also renders nearby-place details and clearly labeled illustrative reviews.

Property images open in a native dialog used as a lightbox, with previous/next controls and keyboard arrow support. Images use local 960- and 1280-pixel variants through `srcset` and `sizes`.

The property page lets visitors choose check-in, checkout, and guest count. It rejects checkout dates that are not after check-in, estimates the stay total, and sends the selected property and valid search context to the booking page. The booking form pre-fills dates and guests from the query string when available, lets the visitor edit those values, and validates the name, email, phone number, date order, and property guest limit. After a valid submit it displays a demo confirmation. The contact form similarly validates its fields and shows a local confirmation. Neither form sends or stores data.

## Challenges and technical decisions

One practical challenge was keeping the same property information consistent across the homepage cards, filtered results, and detail pages. Using one data file and stable property IDs means those views all read from the same records rather than maintaining separate copies.

I kept navigation and footer markup in custom elements because those elements are repeated across every page. The page-specific code remains in `app.js`, where it only initializes the behavior associated with the current page. This avoids introducing a routing or state-management dependency for a small static project.

The site uses query parameters to move search context between pages. This makes links shareable and allows the booking form to pre-fill dates and guest count without storing session data. The listing does not pretend to have availability information: destination and capacity are the implemented filters, while dates are only passed into the booking flow.

The real accommodation photos do not necessarily show the fictional listings. I kept the reference-photo notice in the card, detail gallery, alt text, and lightbox caption so visitors are not led to believe that an image depicts a sample property. Attribution and license details are kept in the README.

AI assistance was used during development to help scaffold and refine parts of the prototype. I am responsible for reviewing the implementation and the claims made about it.

## Current limitations

This is not a live reservation service. Property details, contact information, nearby-place data, ratings, and reviews are fictional or illustrative. There is no backend, availability check, reservation database, account system, email sending, or payment processing. A successful form submission only changes the page to a demo confirmation; it does not create a booking or send a message.

Google Fonts and Font Awesome load from external providers, so those styles may be unavailable without a network connection. The project does not include an automated test suite. Before using it for a real business, replace the sample content with verified information and review image permissions and attribution.

## How to explain the project during an interview

I would start by showing the homepage and explaining that the site is static HTML, CSS, and JavaScript with no build process. Then I would trace one search: the homepage sends destination, dates, and guest count to the listing page, where JavaScript filters by destination and capacity and can sort and paginate the results.

Next, I would open a card and show how its ID selects the matching record from `data.js`. On the detail page I would demonstrate the photo lightbox and date/guest inputs, then follow the booking link to show that the values carry over and can still be edited. I would finish by submitting invalid and valid form data and point out that the confirmation is explicitly a demo, not a reservation. The contact form uses the same front-end-only approach.

That walkthrough lets me explain the choices in the code as they come up: shared components avoid repeating the site shell, a central data file keeps property content consistent, and query parameters carry context between static pages.

## Possible improvements for a real booking platform

For a commercial version, I would first connect verified property and availability data to a backend API and validate all requests on the server. Booking requests would need persistent storage, clear status handling, and email notifications. If the product handled payments, I would integrate a compliant provider and only confirm a reservation after the server had safely processed availability and payment.

I would also add authentication only for the roles that need it, secure handling of personal information, production error monitoring, and automated browser, accessibility, and integration tests. Images could move to managed storage or a CDN, and listing content would need an owner or admin workflow.

## Running and deployment

To run the site locally, start a static server from the project directory:

```sh
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000). No production build is required.

The site is deployed at [https://kumodibogahawatte.github.io/lanka-stayz-practical-assessment/](https://kumodibogahawatte.github.io/lanka-stayz-practical-assessment/), with source in the [GitHub repository](https://github.com/KumodiBogahawatte/lanka-stayz-practical-assessment). The workflow at `.github/workflows/pages.yml` runs on pushes to `main` and can also be started manually. It uploads the project root and deploys it to GitHub Pages. Local changes are not published until pushed to `main` and the workflow succeeds.
