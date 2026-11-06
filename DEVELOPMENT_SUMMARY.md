# Development summary

## Project overview

Lanka Stayz is a static accommodation website prototype built for the practical assessment. Visitors can explore sample Sri Lankan stays, view property details, and submit a demo booking request. The live site is hosted on GitHub Pages.

## Approach

I used separate HTML pages with shared CSS and vanilla JavaScript so the project could run without a framework, dependencies, or a build step. I kept property records in `assets/js/data.js` so the homepage, listings, and detail page use the same sample content. The header and footer are Web Components in `assets/js/components/site-shell.js`, which avoids repeating those elements across pages. Page-specific behavior is in `assets/js/app.js`; it handles search, listing filters, property rendering, date totals, the gallery, and form validation.

## How the main features work

The homepage search passes destination, dates, and guest count in the URL to the listings page. The listing script filters by destination and minimum capacity, sorts by price, and paginates six properties at a time. Dates continue in property links but are not checked against availability.

The property page reads an ID from the query string and renders the matching record from `data.js`. Its images open in a lightbox, and its date and guest selections carry into the booking form. The booking form pre-fills those values when provided, allows edits, validates the submitted details and displays a demo confirmation. Neither booking nor contact submissions are sent or stored.

## Limitations and future improvements

Property descriptions, rates, contact details, nearby places, and reviews are sample or illustrative content. Accommodation photographs are representative references and do not necessarily show the named sample properties; image credits and licenses are listed in [README.md](./README.md).

There is no backend, live availability, saved reservation, email delivery, account system, or payment processing. For a commercial platform, I would connect verified property and availability data to a backend, store and process booking requests securely, and add server-side validation and notifications. I would also replace the sample information, review image permissions, and add automated browser, accessibility, and integration tests.

AI assistance was used to help scaffold and refine parts of the prototype. I reviewed the implementation and am responsible for its final content.

## Running and deployment

Run a static server from the project directory:

```sh
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). The deployed site is [kumodibogahawatte.github.io/lanka-stayz-practical-assessment](https://kumodibogahawatte.github.io/lanka-stayz-practical-assessment/). The workflow at `.github/workflows/pages.yml` deploys the project root on pushes to `main`; no production build is required.
