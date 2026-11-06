# Lanka Stayz

Lanka Stayz is a responsive, multi-page accommodation website prototype for exploring sample stays around Sri Lanka and submitting a demo booking request. I built it with plain HTML, CSS, and JavaScript so it can be run and hosted without a build step.

- **Live website:** [kumodibogahawatte.github.io/lanka-stayz-practical-assessment](https://kumodibogahawatte.github.io/lanka-stayz-practical-assessment/)
- **Source repository:** [github.com/KumodiBogahawatte/lanka-stayz-practical-assessment](https://github.com/KumodiBogahawatte/lanka-stayz-practical-assessment)

## Project introduction

The site is a browsing and booking-request demo, not a production reservation service. It has separate pages for exploring stays, viewing property details, and sending sample booking or contact requests.

## Pages and project structure

- `index.html` contains the homepage, featured stays, and destination, date, and guest search.
- `stays.html` displays the sample properties and provides destination and guest-capacity filters, price sorting, and pagination.
- `property.html?id=galle-fort-house` uses the selected property's ID to show its details, photos, amenities, and booking form.
- `booking.html?property=galle-fort-house` contains the booking request form and its demo confirmation.
- `about.html` and `contact.html` provide the About Us and Contact pages.
- `assets/css/styles.css` contains the shared styles and responsive layouts.
- `assets/js/data.js` holds the sample property data.
- `assets/js/components/site-shell.js` defines the shared header and footer Web Components and adds the shared font and icon stylesheets.
- `assets/js/app.js` handles the page-specific search, listing, gallery, date, and form behavior.
- `assets/images/` contains the logo mark and locally stored images at responsive sizes.
- `DEVELOPMENT_SUMMARY.md` describes the implementation and provides an interview walkthrough.

## How to run locally

There is no package installation or build step. From the project directory, start Python's built-in static server:

```sh
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. Serving the files over HTTP is a closer match to static hosting than opening the HTML files directly.

## Technologies used

The site uses semantic HTML, CSS, and vanilla JavaScript. I used browser-native Web Components for the shared header and footer, and standard browser features such as `URLSearchParams`, `IntersectionObserver`, and the HTML dialog element for page behavior. Google Fonts and Font Awesome provide typography and icons; they are loaded from their respective external services. GitHub Actions deploys the static files to GitHub Pages.

## Main features

The homepage has an accommodation photo slider and a custom search form with destination, calendar, and guest pickers. A search sends the selected values to the stays page. The listing page filters by destination and minimum guest capacity, sorts by price, and shows up to six properties per page. Dates travel through the property and booking links, but are not used to check availability.

Each property card links to a detail view selected by its ID. The detail page shows the property's sample description, nightly LKR price, capacity, amenities, and three representative photos. The gallery opens in a lightbox with previous/next buttons and keyboard navigation. The Galle example also has illustrative reviews and nearby-place information.

The booking form carries over dates and guest count when provided, lets the visitor edit them, checks required details and date order, and enforces the property's guest limit. It displays a local confirmation after valid submission. The contact form also validates its fields and displays a demo response. Neither form sends or stores information.

## Prototype limitations

The properties, descriptions, contact details, guest reviews, ratings, and nearby-place information are sample content. The photographs show real Sri Lankan hotels, guest houses, destinations, and landmarks, but are representative reference images; they do not necessarily depict the fictional sample properties. Labels, alt text, and gallery captions make this clear.

There is no backend, live availability, reservation storage, user account, email delivery, or payment processing. A successful form submission is only a browser-side demonstration: it is not a confirmed booking or a sent message. The photo files are stored locally, while the Google Fonts and Font Awesome stylesheets require external network access.

AI assistance was used during development to help scaffold and refine parts of the prototype. I am responsible for reviewing the final implementation and its claims.

## Image sources and attribution

All photo credits below refer to Wikimedia Commons source pages. The local 960- and 1280-pixel JPEGs are resized versions of those images. Please retain the attribution and comply with each image's license when reusing the files. Share-alike terms apply to images distributed under CC BY-SA.

### Destination and landmark photographs

- Galle Fort — [Madhawa Dunuwila](https://commons.wikimedia.org/wiki/File:Galle_Dutch_Fort,_Sri_Lanka.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Nine Arch Bridge, Ella — [Janith Pramuditha](https://commons.wikimedia.org/wiki/File:Nine_arch_Sri_Lanka.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Unawatuna coast — [Face Potter](https://commons.wikimedia.org/wiki/File:Hotel_by_the_Sea_-_panoramio.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- Colombo — [Pierre André Leclercq](<https://commons.wikimedia.org/wiki/File:Colombo_-_Temple_of_Sri_Kailawasanathan_Swami_Devasthanam_(3).jpg>), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Kandy — [Niranjan Ramamurthy](https://commons.wikimedia.org/wiki/File:Kandy_Lake_and_the_Temple_of_the_Sacred_Tooth_Relic,_Kandy.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Mirissa — [Thedani Karasnagoda](https://commons.wikimedia.org/wiki/File:Mirissa_sea_1.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Nuwara Eliya tea country — [Vyacheslav Argenberg](https://commons.wikimedia.org/wiki/File:Sri_Lanka,_Tea_plantations_near_Nuwara_Eliya,_Tea_estate.jpg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Bentota — [Rambukwelladk](https://commons.wikimedia.org/wiki/File:Bentota_beach_in_evening.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Trincomalee — [Jan Kranendonk](https://commons.wikimedia.org/wiki/File:Fort_TrincomaleeTrincomaleeFort--.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Sigiriya — [Shamilapathirana](https://commons.wikimedia.org/wiki/File:Lion_rock_Sri_Lanka.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

Destination and landmark images appear in editorial sections and page headers. The homepage hero and property cards and galleries use photographs of Sri Lankan accommodation.

### Accommodation photographs

- `hotel-room-212` — [psychoslave](https://commons.wikimedia.org/wiki/File:Hotel_room_Sri_Lanka_Photo212.jpg), hotel room photographed in Sri Lanka in 2014; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- `hotel-room-213` — [psychoslave](https://commons.wikimedia.org/wiki/File:Hotel_room_Sri_Lanka_Photo213.jpg), hotel room photographed in Sri Lanka in 2014; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- `sri-lanka-room-106` — [psychoslave](https://commons.wikimedia.org/wiki/File:Sri_Lanka_Photo106.jpg), hotel room in Sri Lanka; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- `sri-lanka-room-107` — [psychoslave](https://commons.wikimedia.org/wiki/File:Sri_Lanka_Photo107.jpg), hotel room in Sri Lanka; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- `galle-face-hotel-sitting-room` — [Dan arndt](<https://commons.wikimedia.org/wiki/File:GFH_(5).jpg>), sitting room at the Galle Face Hotel in Colombo; [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- `chekhov-suite` — [A.Savin](https://commons.wikimedia.org/wiki/File:SL_Colombo_asv2020-01_img07_GOH_Chekhov_suite.jpg), Anton Chekhov's suite at the Grand Oriental Hotel in Colombo; [Free Art License (FAL)](http://artlibre.org/licence/lal/en)
- `grand-oriental-exterior` — [A.Savin](https://commons.wikimedia.org/wiki/File:SL_Colombo_asv2020-01_img24_Grand_Oriental.jpg), exterior of the Grand Oriental Hotel in Colombo; [Free Art License (FAL)](http://artlibre.org/licence/lal/en)
- `heritance-kandalama-exterior` — [Adheesha88](https://commons.wikimedia.org/wiki/File:Heritance_Kandalama_Exterior_View.JPG), exterior of Heritance Kandalama in Dambulla; [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- `mannar-guest-house` — [Adam Jones](https://commons.wikimedia.org/wiki/File:Facade_of_Mannar_Guest_House_at_Sunset_-_Mannar_-_Sri_Lanka.jpg), facade of Mannar Guest House; [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)
- `mihipiya-guest-house` — [sanjaya madushan -ha…](https://commons.wikimedia.org/wiki/File:Mihipiya_guest_house-_habarana_0094662270090_AC_NON_AC_ROOMS_-_panoramio.jpg), Mihipiya Guest House in Habarana; [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

Each Commons file page is the source for its attribution and license terms.

## Deployment using GitHub Pages

The site is deployed at [kumodibogahawatte.github.io/lanka-stayz-practical-assessment](https://kumodibogahawatte.github.io/lanka-stayz-practical-assessment/). The source is in the [GitHub repository](https://github.com/KumodiBogahawatte/lanka-stayz-practical-assessment).

The [Pages workflow](.github/workflows/pages.yml) publishes the project root to GitHub Pages when a commit is pushed to `main`. It can also be started manually with `workflow_dispatch`. There is no build command: the workflow checks out the files, uploads them as a Pages artifact, and deploys that artifact. Local changes appear on the live site only after they have been pushed and the deployment workflow has completed successfully. Keep the HTML pages and `assets/` directory together so the relative links continue to work.
