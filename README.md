# Lanka Stayz

A responsive, multi-page accommodation-booking prototype for exploring sample stays across Sri Lanka and sending a demo booking request.

## Pages and project structure

- `index.html` — homepage, search form, and featured sample properties
- `stays.html` — filterable accommodation listings
- `property.html?id=galle-fort-house` — property details and booking link
- `booking.html?property=galle-fort-house` — validated booking request form
- `about.html` and `contact.html` — separate informational pages
- `assets/css/styles.css` — shared responsive styles
- `assets/js/data.js` — sample accommodation data
- `assets/js/components/site-shell.js` — shared, reusable navigation and footer components
- `assets/js/app.js` — shared navigation, listing, detail and form behavior
- `assets/images/` — local brand mark and responsive, locally stored Sri Lankan destination and accommodation photographs
- `DEVELOPMENT_SUMMARY.md` — implementation approach, prototype limitations, interview walkthrough, and next steps

## Run locally

No build step, framework, or dependency install is needed. Open `index.html` in a browser, or start a static server from the project directory:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`. Serving over HTTP is recommended for testing and mirrors a static host more closely than opening files directly.

## Deploy as a live demo

This is a static website and requires no build command. A GitHub Pages workflow is included at `.github/workflows/pages.yml`. Push the project to the `main` branch of a GitHub repository, enable **Settings → Pages → Source → GitHub Actions**, and the workflow publishes the site on each push. The Actions run will show the public URL when deployment completes. The same files can also be uploaded to Netlify or another static host.

Publishing requires a GitHub repository and permission to enable Pages; neither is configured in this workspace. Keep the relative page links and `assets/` directory together when uploading.

## Technologies and functionality

- Semantic HTML, CSS, and vanilla JavaScript
- Responsive navigation and page layouts for desktop, tablet, and mobile
- Homepage hero slider with timed rotation and previous/next controls, featuring Sri Lankan accommodation
- Listing cards and property galleries featuring real Sri Lankan accommodation photos as representative references, not photos of the fictional sample listings
- Custom destination, calendar, and guest pickers; search requires a destination or a complete date range
- Destination and guest-capacity filtering, price sorting, and six-stay pagination
- Separate property detail pages with three photos, amenities, capacity, check-in/out guidance, and nightly price
- Night-based stay-total estimates on the property and booking pages
- Booking form required-field, email, date-order, and property guest-capacity validation
- Contact form with clear demo confirmation
- Property-photo lightbox with zoom presentation, previous/next controls, and keyboard arrows
- Clearly marked illustrative guest reviews and nearby-place distance information on the Galle property page
- Font Awesome icons, larger readable typography, subtle entrance and scroll animations, and shared contact details in every page footer
- Shared Google Fonts and Font Awesome stylesheet links are registered centrally by `site-shell.js`, rather than repeated in each page

## Prototype limitations and development summary

Accommodation listings, contact details, reviews, and their details are fictional. The accommodation photos show real hotels and guest houses in Sri Lanka, but are representative reference images and do not depict the named sample properties; visible labels, alt text, and lightbox captions make this clear. All photographic images are local JPEG files in `assets/images/`, with 960- and 1280-pixel responsive variants; images are served without a third-party image request. Web fonts and Font Awesome still load from their external providers. Booking and contact submissions are front-end demonstrations: no data is sent or saved, and the confirmation is not a real booking or sent message. Live availability, reservation storage, accounts, and payment processing are not implemented.

### Wikimedia Commons destination photo credits

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

Destination and landmark photos are used for editorial and page-header imagery. The homepage hero, accommodation listing cards, and property galleries use local photos of Sri Lankan hotels and guest houses.

### Wikimedia Commons accommodation photo credits

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

Each cited Commons file page is the source and provides the author's attribution and license terms. The local 960- and 1280-pixel JPEG variants are resized Commons thumbnails of those source images. Share-alike terms apply to images distributed under CC BY-SA.

The site uses shared header/footer web components, one property-data module, and page-specific behavior without a build tool. AI assistance was used to scaffold this prototype. Before production, replace the demonstration contact details and fictional guest reviews with verified business information and consented guest content. A commercial version would add a verified catalogue, backend booking and availability services, secure contact handling, authentication where needed, payment-provider integration, and automated accessibility and browser testing.
