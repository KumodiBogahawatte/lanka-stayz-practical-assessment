# Lanka Stayz

Lanka Stayz is a responsive accommodation website prototype for exploring sample stays across Sri Lanka and submitting a demo booking request.

- **Live website:** [kumodibogahawatte.github.io/lanka-stayz-practical-assessment](https://kumodibogahawatte.github.io/lanka-stayz-practical-assessment/)
- **Source repository:** [github.com/KumodiBogahawatte/lanka-stayz-practical-assessment](https://github.com/KumodiBogahawatte/lanka-stayz-practical-assessment)

## Pages and project structure

- `index.html` — homepage, featured stays, and destination, date, and guest search
- `stays.html` — accommodation listings with destination and guest filters, price sorting, and pagination
- `property.html?id=galle-fort-house` — sample property details and date/guest selection
- `booking.html?property=galle-fort-house` — booking request form
- `about.html` and `contact.html` — informational pages
- `assets/css/styles.css` — shared styles and responsive layouts
- `assets/js/data.js` — sample property data
- `assets/js/components/site-shell.js` — shared header and footer
- `assets/js/app.js` — search, listing, property, gallery, and form behavior
- `assets/images/` — logo and locally stored images
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

## How to run locally

No dependencies or build step are needed. From the project directory, run:

```sh
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Technologies used

The site uses semantic HTML, CSS, vanilla JavaScript, and browser-native Web Components. Google Fonts and Font Awesome provide typography and icons. GitHub Actions deploys the static files to GitHub Pages.

## Main features

The catalogue contains eight sample stays. Homepage searches pass the selected destination, dates, and guest count to the listing page. Listings can be filtered by destination and guest capacity, sorted by price, and paginated. Dates are carried through the property and booking links but are not used to check availability.

Property pages show details, nightly price, capacity, amenities, and three representative photos. The gallery opens in a lightbox. The booking and contact forms validate input and display demo confirmations; neither form sends or saves information.

## Prototype limitations

Property details, contact information, reviews, ratings, and nearby-place information are fictional or illustrative. The real Sri Lankan accommodation and destination photographs are representative references and do not necessarily depict the named sample properties.

There is no backend, live availability, reservation storage, account system, email delivery, or payment processing. A successful booking form submission is not a confirmed reservation. Google Fonts and Font Awesome require an internet connection.

AI assistance was used to help scaffold and refine parts of the prototype. I reviewed the implementation and am responsible for its final content.

## Image sources and attribution

The following Wikimedia Commons files are the photo sources. The local 960- and 1280-pixel JPEGs are resized versions. Please retain attribution and follow each license when reusing the images. Share-alike terms apply to images distributed under CC BY-SA.

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

Destination and landmark images appear in editorial sections and page headers. The homepage hero, accommodation cards, and property galleries use local photos of Sri Lankan accommodation.

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

## Deployment using GitHub Pages

The site is published at [kumodibogahawatte.github.io/lanka-stayz-practical-assessment](https://kumodibogahawatte.github.io/lanka-stayz-practical-assessment/). The [Pages workflow](.github/workflows/pages.yml) deploys the project root on pushes to `main` and can also be started manually. No build command is required.
