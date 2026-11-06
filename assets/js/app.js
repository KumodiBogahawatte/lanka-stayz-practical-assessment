(() => {
  const properties = window.LANKA_PROPERTIES || [];
  const imageUrl = (id, width = 1280) => `assets/images/${id}-${width}.jpg`;
  const imageSrcset = (id) =>
    `${imageUrl(id, 960)} 960w, ${imageUrl(id, 1280)} 1280w`;
  const imageAttributes = (id, sizes) =>
    `src="${imageUrl(id)}" srcset="${imageSrcset(id)}" sizes="${sizes}"`;
  const photoDescriptions = {
    "galle-fort": "Historic Galle Fort beside the sea in Sri Lanka",
    "nine-arch-bridge": "Nine Arch Bridge set among the green hills of Ella",
    unawatuna: "A beachfront hotel and palms on the Unawatuna coast",
    colombo: "Sri Kailasanathar Swami Devasthanam temple in Colombo",
    kandy: "Kandy Lake and the Temple of the Sacred Tooth Relic",
    mirissa: "The shoreline and sea at Mirissa",
    "nuwara-eliya-tea": "Tea plantation in the hills near Nuwara Eliya",
    bentota: "Evening light over Bentota beach",
    trincomalee: "The historic fort at Trincomalee",
    sigiriya: "Sigiriya Lion Rock seen from Pidurangala",
    "hotel-room-212": "Hotel room interior photographed in Sri Lanka in 2014",
    "hotel-room-213": "Hotel room interior photographed in Sri Lanka in 2014",
    "sri-lanka-room-106": "Hotel room interior photographed in Sri Lanka",
    "sri-lanka-room-107": "Hotel room interior photographed in Sri Lanka",
    "galle-face-hotel-sitting-room":
      "Sitting room at the Galle Face Hotel in Colombo, Sri Lanka",
    "chekhov-suite":
      "Anton Chekhov's suite at the Grand Oriental Hotel in Colombo, Sri Lanka",
    "grand-oriental-exterior":
      "Exterior of the Grand Oriental Hotel in Colombo, Sri Lanka",
    "heritance-kandalama-exterior":
      "Exterior of Heritance Kandalama hotel in Dambulla, Sri Lanka",
    "mannar-guest-house": "Facade of Mannar Guest House in Mannar, Sri Lanka",
    "mihipiya-guest-house": "Mihipiya Guest House in Habarana, Sri Lanka",
  };
  const listingPhotoAlt = (property, image) =>
    `${photoDescriptions[image]}. Representative reference photo; not a photograph of ${property.name}.`;
  const formatPrice = (price) => `LKR ${price.toLocaleString("en-LK")}`;
  const params = new URLSearchParams(window.location.search);
  const today = new Date();
  const todayString = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 10);
  const searchContext = new URLSearchParams();
  for (const key of ["checkIn", "checkOut", "guests"]) {
    if (params.has(key)) searchContext.set(key, params.get(key));
  }

  function setDatePair(checkInInput, checkOutInput) {
    const startValue = checkInInput.value || "";
    const endValue = checkOutInput.value || "";

    if (startValue) {
      checkOutInput.min = startValue;
    } else {
      checkOutInput.min = todayString;
    }

    if (endValue && endValue <= startValue) {
      checkOutInput.value = "";
    }
    return checkOutInput.value;
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  function propertyCard(property) {
    const detailParams = new URLSearchParams(searchContext);
    detailParams.set("id", property.id);
    return `<article class="property-card">
      <a class="card-image-wrap" href="property.html?${detailParams}" aria-label="View ${property.name}">
        <img class="card-image" ${imageAttributes(property.image, "(max-width: 700px) 100vw, (max-width: 1040px) 50vw, 33vw")} alt="${listingPhotoAlt(property, property.image)}" loading="lazy" />
        <span class="card-tag">${property.type}</span>
        <span class="card-photo-note">Representative image · not this sample stay</span>
      </a>
      <div class="card-content"><p class="card-location">${property.location}, Sri Lanka</p>
        <div class="card-title-row"><h3><a href="property.html?${detailParams}">${property.name}</a></h3><span class="card-price">${formatPrice(property.price)} <small>/ night</small></span></div>
        <div class="card-meta"><span>Up to ${property.guests} guests</span><a class="details-link" href="property.html?${detailParams}">View details <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>
      </div>
    </article>`;
  }

  function addScrollReveals() {
    const revealTargets = document.querySelectorAll(
      ".section-heading, .editorial-copy, .about-story > *, .values-grid article, .contact-info, .contact-form-panel, .booking-panel",
    );
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    revealTargets.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      observer.observe(element);
    });
  }
  addScrollReveals();

  if (document.body.dataset.page === "home") {
    const featured = document.querySelector("#featured-properties");
    if (featured) featured.innerHTML = properties.map(propertyCard).join("");

    const searchForm = document.querySelector(".search-bar");
    const destinationInput = document.querySelector("[data-destination-value]");
    const destinationTrigger = document.querySelector(
      "[data-destination-trigger]",
    );
    const destinationPanel = document.querySelector(".destination-popover");
    const searchError = document.querySelector("#search-error");
    const dateValues = Object.fromEntries(
      [...document.querySelectorAll("[data-date-value]")].map((input) => [
        input.dataset.dateValue,
        input,
      ]),
    );
    const dateTriggers = Object.fromEntries(
      [...document.querySelectorAll("[data-date-trigger]")].map((button) => [
        button.dataset.dateTrigger,
        button,
      ]),
    );
    const guestTrigger = document.querySelector("[data-guests-trigger]");
    const guestInput = document.querySelector("[data-guest-value]");
    const guestCount = document.querySelector("[data-guest-count]");
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const dateToValue = (date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const valueToDate = (value) => {
      if (!value) return null;
      const [year, month, day] = value.split("-").map(Number);
      return new Date(year, month - 1, day);
    };
    const dateFormatter = new Intl.DateTimeFormat("en-LK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const pickerPanels = [...document.querySelectorAll(".picker-popover")];

    function showSearchError(message) {
      searchError.textContent = message;
      searchError.hidden = !message;
    }

    function initializeHeroSlider() {
      const heroImage = document.querySelector("[data-hero-image]");
      const heroCaption = document.querySelector("[data-hero-caption]");
      const heroCredit = document.querySelector("[data-hero-credit]");
      const heroLicense = document.querySelector("[data-hero-license]");
      const heroIndex = document.querySelector("[data-hero-index]");
      const slideButtons = [...document.querySelectorAll("[data-hero-slide]")];
      const hero = document.querySelector(".hero");
      const slides = [
        {
          image: "galle-face-hotel-sitting-room",
          alt: "Sitting room at Galle Face Hotel in Colombo, Sri Lanka",
          caption: "GALLE FACE HOTEL, COLOMBO",
          credit: "Photo: Dan arndt",
          source: "https://commons.wikimedia.org/wiki/File:GFH_(5).jpg",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        },
        {
          image: "heritance-kandalama-exterior",
          alt: "Heritance Kandalama hotel surrounded by greenery in Dambulla, Sri Lanka",
          caption: "HERITANCE KANDALAMA, DAMBULLA",
          credit: "Photo: Adheesha88",
          source:
            "https://commons.wikimedia.org/wiki/File:Heritance_Kandalama_Exterior_View.JPG",
          license: "CC BY-SA 3.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
        },
        {
          image: "mannar-guest-house",
          alt: "Mannar Guest House facade at sunset in Sri Lanka",
          caption: "MANNAR GUEST HOUSE, MANNAR",
          credit: "Photo: Adam Jones",
          source:
            "https://commons.wikimedia.org/wiki/File:Facade_of_Mannar_Guest_House_at_Sunset_-_Mannar_-_Sri_Lanka.jpg",
          license: "CC BY-SA 2.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
        },
      ];
      let activeSlide = 0;
      let transitionId = 0;
      let timer;

      function showSlide(index) {
        activeSlide = (index + slides.length) % slides.length;
        const requestId = ++transitionId;
        const slide = slides[activeSlide];
        const image = new Image();
        image.onload = () => {
          if (requestId !== transitionId) return;
          heroImage.classList.add("is-transitioning");
          window.setTimeout(() => {
            if (requestId !== transitionId) return;
            heroImage.src = imageUrl(slide.image);
            heroImage.srcset = imageSrcset(slide.image);
            heroImage.sizes = "100vw";
            heroImage.alt = slide.alt;
            heroCaption.textContent = slide.caption;
            heroCredit.textContent = slide.credit;
            heroCredit.href = slide.source;
            heroLicense.textContent = slide.license;
            heroLicense.href = slide.licenseUrl;
            heroIndex.textContent = String(activeSlide + 1).padStart(2, "0");
            slideButtons.forEach((button, buttonIndex) => {
              const isActive = buttonIndex === activeSlide;
              button.classList.toggle("is-active", isActive);
              if (isActive) button.setAttribute("aria-current", "true");
              else button.removeAttribute("aria-current");
            });
            heroImage.classList.remove("is-transitioning");
          }, 240);
        };
        image.onerror = () => {
          if (requestId === transitionId)
            heroImage.classList.remove("is-transitioning");
        };
        image.src = imageUrl(slide.image);
      }

      document
        .querySelector("[data-hero-previous]")
        .addEventListener("click", () => showSlide(activeSlide - 1));
      document
        .querySelector("[data-hero-next]")
        .addEventListener("click", () => showSlide(activeSlide + 1));
      slideButtons.forEach((button) =>
        button.addEventListener("click", () =>
          showSlide(Number(button.dataset.heroSlide)),
        ),
      );

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.setInterval(() => {
          if (
            document.hidden ||
            hero.matches(":hover") ||
            hero.querySelector(":focus-visible")
          )
            return;
          showSlide(activeSlide + 1);
        }, 7000);
      }
    }
    initializeHeroSlider();

    function closePickers() {
      pickerPanels.forEach((panel) => {
        panel.hidden = true;
      });
      document
        .querySelectorAll(".picker-trigger")
        .forEach((button) => button.setAttribute("aria-expanded", "false"));
    }

    function positionPicker(panel, forceBelow = false) {
      panel.hidden = false;
      panel.classList.remove("opens-above", "align-right");
      const field = panel.closest(".search-field");
      if (forceBelow) {
        let fieldRect = field.getBoundingClientRect();
        if (
          window.innerHeight - fieldRect.bottom < 260 &&
          window.innerHeight > 500
        ) {
          const previousScrollBehavior =
            document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollBy(0, fieldRect.top - window.innerHeight * 0.12);
          document.documentElement.style.scrollBehavior =
            previousScrollBehavior;
          fieldRect = field.getBoundingClientRect();
        }
        panel.style.maxHeight = `${Math.max(180, Math.min(590, window.innerHeight - fieldRect.bottom - 20))}px`;
        return;
      }
      panel.style.maxHeight = "";
      if (window.matchMedia("(max-width: 650px)").matches) return;
      const fieldRect = field.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const roomBelow = window.innerHeight - fieldRect.bottom;
      const roomAbove = fieldRect.top;
      if (roomBelow < panelRect.height + 20 && roomAbove > roomBelow)
        panel.classList.add("opens-above");
      if (panelRect.right > window.innerWidth - 12)
        panel.classList.add("align-right");
    }

    destinationTrigger.addEventListener("click", () => {
      const willOpen = destinationPanel.hidden;
      closePickers();
      if (willOpen) positionPicker(destinationPanel, true);
      destinationTrigger.setAttribute("aria-expanded", String(willOpen));
    });
    destinationPanel.addEventListener("click", (event) => {
      const option = event.target.closest("[data-destination]");
      if (!option) return;
      const value = option.dataset.destination;
      destinationInput.value = value === "all" ? "" : value;
      destinationInput.dataset.selected = "true";
      destinationTrigger.textContent =
        value === "all" ? "All destinations" : value;
      destinationTrigger.setAttribute(
        "aria-label",
        `Destination: ${destinationTrigger.textContent}`,
      );
      destinationPanel
        .querySelectorAll("[data-destination]")
        .forEach((button) => {
          const isSelected = button === option;
          button.classList.toggle("is-selected", isSelected);
          if (isSelected) button.setAttribute("aria-pressed", "true");
          else button.removeAttribute("aria-pressed");
        });
      showSearchError("");
      closePickers();
    });

    function renderCalendar(kind, visibleMonth) {
      const panel = document.querySelector(`[data-calendar="${kind}"]`);
      const selectedDate = valueToDate(dateValues[kind].value);
      const checkInDate = valueToDate(dateValues.checkIn.value);
      const minDate =
        kind === "checkOut" && checkInDate
          ? new Date(
              checkInDate.getFullYear(),
              checkInDate.getMonth(),
              checkInDate.getDate() + 1,
            )
          : todayDate;
      const year = visibleMonth.getFullYear();
      const month = visibleMonth.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthLabel = new Intl.DateTimeFormat("en", {
        month: "long",
        year: "numeric",
      }).format(visibleMonth);
      const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      const cells = weekdayLabels.map(
        (label) => `<span class="calendar-weekday">${label}</span>`,
      );
      for (let blank = 0; blank < firstDay; blank += 1)
        cells.push('<span class="calendar-empty" aria-hidden="true"></span>');
      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(year, month, day);
        const value = dateToValue(date);
        const isDisabled = date < minDate;
        const isSelected = selectedDate && value === dateToValue(selectedDate);
        cells.push(
          `<button type="button" class="calendar-day${isSelected ? " is-selected" : ""}${dateToValue(date) === dateToValue(todayDate) ? " is-today" : ""}" data-calendar-day="${value}"${isDisabled ? " disabled" : ""}${isSelected ? ' aria-pressed="true"' : ""}>${day}</button>`,
        );
      }
      panel.innerHTML = `<div class="calendar-header"><button type="button" class="calendar-month-step" aria-label="Previous month" data-month-shift="-1"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button><strong>${monthLabel}</strong><button type="button" class="calendar-month-step" aria-label="Next month" data-month-shift="1"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button></div><div class="calendar-grid">${cells.join("")}</div><p class="calendar-hint"><i class="fa-regular fa-calendar" aria-hidden="true"></i> Select your ${kind === "checkIn" ? "arrival" : "departure"} date</p>`;
      panel.dataset.visibleMonth = `${year}-${month}`;
    }

    function openCalendar(kind) {
      closePickers();
      const selected = valueToDate(dateValues[kind].value);
      const minimum =
        kind === "checkOut" && valueToDate(dateValues.checkIn.value)
          ? valueToDate(dateValues.checkIn.value)
          : todayDate;
      const start = selected || minimum;
      renderCalendar(kind, new Date(start.getFullYear(), start.getMonth(), 1));
      const panel = document.querySelector(`[data-calendar="${kind}"]`);
      positionPicker(panel);
      dateTriggers[kind].setAttribute("aria-expanded", "true");
    }

    function refreshDateLabel(kind) {
      const date = valueToDate(dateValues[kind].value);
      dateTriggers[kind].textContent = date
        ? dateFormatter.format(date)
        : "Add date";
    }

    Object.keys(dateTriggers).forEach((kind) => {
      refreshDateLabel(kind);
      dateTriggers[kind].addEventListener("click", () => {
        const panel = document.querySelector(`[data-calendar="${kind}"]`);
        if (!panel.hidden) closePickers();
        else openCalendar(kind);
      });
    });

    document.querySelectorAll(".calendar-popover").forEach((panel) => {
      panel.addEventListener("click", (event) => {
        const shiftButton = event.target.closest("[data-month-shift]");
        if (shiftButton) {
          const [year, month] = panel.dataset.visibleMonth
            .split("-")
            .map(Number);
          renderCalendar(
            panel.dataset.calendar,
            new Date(year, month + Number(shiftButton.dataset.monthShift), 1),
          );
          return;
        }
        const dayButton = event.target.closest("[data-calendar-day]");
        if (!dayButton) return;
        const kind = panel.dataset.calendar;
        dateValues[kind].value = dayButton.dataset.calendarDay;
        refreshDateLabel(kind);
        showSearchError("");
        if (kind === "checkIn") {
          const selected = valueToDate(dateValues.checkIn.value);
          if (valueToDate(dateValues.checkOut.value) <= selected) {
            dateValues.checkOut.value = "";
            refreshDateLabel("checkOut");
          }
        }
        closePickers();
        if (kind === "checkIn") dateTriggers.checkOut.focus();
      });
    });

    guestTrigger.addEventListener("click", () => {
      const panel = document.querySelector(".guests-popover");
      const willOpen = panel.hidden;
      closePickers();
      if (willOpen) positionPicker(panel);
      guestTrigger.setAttribute("aria-expanded", String(willOpen));
    });
    document
      .querySelector(".guests-popover")
      .addEventListener("click", (event) => {
        const changeButton = event.target.closest("[data-guest-change]");
        if (changeButton) {
          const count = Math.max(
            1,
            Math.min(
              8,
              Number(guestInput.value) +
                Number(changeButton.dataset.guestChange),
            ),
          );
          guestInput.value = String(count);
          guestCount.value = String(count);
          guestTrigger.textContent = `${count} ${count === 1 ? "guest" : "guests"}`;
          guestTrigger.setAttribute("aria-label", `Number of guests: ${count}`);
          return;
        }
        if (event.target.closest("[data-picker-done]")) closePickers();
      });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".search-field")) closePickers();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePickers();
    });
    searchForm.addEventListener("submit", (event) => {
      showSearchError("");
      const checkIn = valueToDate(dateValues.checkIn.value);
      const checkOut = valueToDate(dateValues.checkOut.value);
      const hasCheckIn = Boolean(dateValues.checkIn.value);
      const hasCheckOut = Boolean(dateValues.checkOut.value);
      if (
        hasCheckIn !== hasCheckOut ||
        (checkOut && checkIn && checkOut <= checkIn)
      ) {
        event.preventDefault();
        const missingKind = hasCheckIn && !hasCheckOut ? "checkOut" : "checkIn";
        showSearchError("Please choose both check-in and check-out dates.");
        openCalendar(missingKind);
        dateTriggers[missingKind].focus();
        return;
      }
      if (!destinationInput.dataset.selected && !hasCheckIn) {
        event.preventDefault();
        showSearchError(
          "Choose a destination or add your check-in and check-out dates to search.",
        );
        destinationTrigger.focus();
        destinationTrigger.click();
        return;
      }
      destinationInput.value =
        destinationInput.value === "all" ? "" : destinationInput.value;
    });
  }

  if (document.body.dataset.page === "stays") {
    const form = document.querySelector("#listing-filters");
    const destination = document.querySelector("#filter-destination");
    const guests = document.querySelector("#filter-guests");
    const sort = document.querySelector("#sort-order");
    const grid = document.querySelector("#property-grid");
    const pagination = document.querySelector("#pagination");
    const pageSize = 6;
    let currentPage = 1;
    const dates = new URLSearchParams(window.location.search);
    destination.value = dates.get("destination") || "";
    guests.value = dates.get("guests") || "2";
    const invalidGuestValue = ![...guests.options].some(
      (option) => option.value === guests.value,
    );
    if (invalidGuestValue) guests.value = "2";

    function render() {
      const selectedDestination = destination.value;
      const guestCount = Number(guests.value);
      searchContext.set("guests", String(guestCount));
      const matching = properties
        .filter(
          (property) =>
            (!selectedDestination ||
              property.location === selectedDestination) &&
            property.guests >= guestCount,
        )
        .sort((a, b) =>
          sort.value === "low"
            ? a.price - b.price
            : sort.value === "high"
              ? b.price - a.price
              : properties.indexOf(a) - properties.indexOf(b),
        );
      const pageCount = Math.ceil(matching.length / pageSize);
      currentPage = Math.min(currentPage, Math.max(pageCount, 1));
      const firstIndex = (currentPage - 1) * pageSize;
      grid.innerHTML = matching
        .slice(firstIndex, firstIndex + pageSize)
        .map(propertyCard)
        .join("");
      grid.setAttribute(
        "aria-label",
        `Stays page ${currentPage} of ${Math.max(pageCount, 1)}`,
      );
      document.querySelector("#results-count").textContent =
        `${matching.length} ${matching.length === 1 ? "stay" : "stays"} to explore`;
      document.querySelector("#empty-state").hidden = matching.length > 0;
      grid.hidden = matching.length === 0;
      pagination.hidden = pageCount <= 1;
      if (pageCount > 1) {
        const pageButtons = Array.from({ length: pageCount }, (_, index) => {
          const page = index + 1;
          return `<button type="button" class="page-button${page === currentPage ? " active" : ""}" data-page="${page}"${page === currentPage ? ' aria-current="page"' : ""}>${page}</button>`;
        }).join("");
        pagination.innerHTML = `<button type="button" class="page-button page-step" data-page="${currentPage - 1}"${currentPage === 1 ? " disabled" : ""} aria-label="Previous page"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Previous</button>${pageButtons}<button type="button" class="page-button page-step" data-page="${currentPage + 1}"${currentPage === pageCount ? " disabled" : ""} aria-label="Next page">Next <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>`;
      } else {
        pagination.innerHTML = "";
      }
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      currentPage = 1;
      render();
    });
    destination.addEventListener("change", () => {
      currentPage = 1;
      render();
    });
    guests.addEventListener("change", () => {
      currentPage = 1;
      render();
    });
    sort.addEventListener("change", () => {
      currentPage = 1;
      render();
    });
    pagination.addEventListener("click", (event) => {
      const button = event.target.closest("[data-page]");
      if (!button || button.disabled) return;
      currentPage = Number(button.dataset.page);
      render();
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    render();
  }

  if (document.body.dataset.page === "property") {
    const property = properties.find((item) => item.id === params.get("id"));
    const root = document.querySelector("[data-property-detail]");
    if (!property) {
      document.title = "Stay not found — Lanka Stayz";
      root.innerHTML = `<section class="not-found"><p class="eyebrow"><span></span> LOST YOUR WAY?</p><h1>We couldn't find<br /><em>that stay.</em></h1><p>It may have moved, or the link may be incomplete.</p><a class="submit-button button-link" href="stays.html">Browse all stays <i class="fa-solid fa-arrow-up-right-from-square action-icon" aria-hidden="true"></i></a></section>`;
    } else {
      document.title = `${property.name} — Lanka Stayz`;
      root.innerHTML = `
        <a class="back-link" href="stays.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to all stays</a>
        <div class="detail-gallery">${property.images.map((image, index) => `<button class="gallery-zoom" type="button" data-lightbox-index="${index}" aria-label="Zoom representative photo ${index + 1} of ${property.name}"><img ${imageAttributes(image, "(max-width: 700px) 100vw, (max-width: 1100px) 85vw, 760px")} alt="${listingPhotoAlt(property, image)}" ${index ? 'loading="lazy"' : ""} /><span class="gallery-photo-note">Reference image · not this sample stay</span><span class="gallery-zoom-hint"><i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i> Zoom photo</span></button>`).join("")}</div>
        <div class="property-detail-layout"><article class="detail-body">
          <p class="eyebrow"><span></span> ${property.type.toUpperCase()}</p><h1 id="detail-title">${property.name}</h1><p class="detail-location">${property.location}, Sri Lanka</p>
          <div class="detail-facts"><span><i class="fa-solid fa-user-group" aria-hidden="true"></i> Up to ${property.guests} guests</span><span><i class="fa-regular fa-calendar" aria-hidden="true"></i> Check-in from 2:00 PM</span><span><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Check-out by 11:00 AM</span></div>
          <h2 class="amenities-title"><i class="fa-solid fa-house" aria-hidden="true"></i> A little about the stay</h2><p class="detail-description">${property.description}</p>
          <h2 class="amenities-title"><i class="fa-solid fa-sparkles" aria-hidden="true"></i> The thoughtful details</h2><div class="amenities-list">${property.amenities.map((amenity) => `<span class="amenity"><i class="${amenity.toLowerCase().includes("pool") ? "fa-solid fa-person-swimming" : amenity.toLowerCase().includes("wi-fi") ? "fa-solid fa-wifi" : amenity.toLowerCase().includes("air conditioning") ? "fa-solid fa-snowflake" : amenity.toLowerCase().includes("parking") ? "fa-solid fa-square-parking" : "fa-regular fa-circle-check"}" aria-hidden="true"></i> ${amenity}</span>`).join("")}</div>
        </article>
        <aside class="booking-card"><p class="booking-card-label">YOUR ISLAND ESCAPE</p><p class="detail-booking-price">${formatPrice(property.price)} <small>/ night</small></p><p>Choose your dates to view an estimated stay total.</p>
          <div class="stay-price" id="detail-price-summary" aria-live="polite"><i class="fa-solid fa-receipt" aria-hidden="true"></i> <span>Select your dates to see your stay total.</span></div>
          <form class="detail-booking-form" id="property-booking-form" action="booking.html" method="get">
            <input type="hidden" name="property" value="${property.id}" />
            <label><span><i class="fa-regular fa-calendar" aria-hidden="true"></i> Check in</span><input type="date" name="checkIn" id="detail-check-in" required /></label>
            <label><span><i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Check out</span><input type="date" name="checkOut" id="detail-check-out" required /></label>
            <label><span><i class="fa-solid fa-user-group" aria-hidden="true"></i> Guests</span><select name="guests" id="detail-guests" required></select></label>
            <button class="submit-button" type="submit"><i class="fa-regular fa-paper-plane" aria-hidden="true"></i> Request booking <i class="fa-solid fa-arrow-up-right-from-square action-icon" aria-hidden="true"></i></button>
          </form>
          <p class="form-disclaimer">Your request is free. No payment is taken.</p>
        </aside></div>
        ${property.areaDescription ? `<section class="nearby-section"><div class="subsection-heading"><div><p class="eyebrow"><span></span> MAKE YOURSELF AT HOME</p><h2>Around <em>${property.name}.</em></h2></div><p>Discover the character, history, and everyday places just beyond your door.</p></div><p class="area-description">${property.areaDescription}</p><p class="distance-note"><i class="fa-solid fa-route" aria-hidden="true"></i> Shortest estimated distances displayed; actual distances may vary.</p><div class="nearby-grid">${property.nearby.map((place) => `<div class="nearby-item"><i class="${place.icon}" aria-hidden="true"></i><span>${place.name}</span><strong>${place.distance}</strong></div>`).join("")}</div></section>` : ""}
        ${property.reviews?.length ? `<section class="reviews-section"><div class="subsection-heading"><div><p class="eyebrow"><span></span> SAMPLE REVIEWS · ILLUSTRATIVE ONLY</p><h2>Guest <em>reviews.</em></h2></div><p class="review-score"><i class="fa-solid fa-star" aria-hidden="true"></i> ${property.averageRating || "5.0"} <span>· ${property.reviewCount || property.reviews.length} reviews</span></p></div><div class="reviews-grid">${property.reviews.map((review) => `<article class="review-card"><div class="review-stars" aria-label="${review.rating} out of 5 stars">${Array.from({ length: 5 }, (_, index) => `<i class="fa-solid fa-star${index < review.rating ? "" : " star-muted"}" aria-hidden="true"></i>`).join("")}</div><p>“${review.text}”</p><div class="review-author"><strong>${review.name}</strong><span>${review.date}</span></div></article>`).join("")}</div></section>` : ""}`;

      const bookingForm = document.querySelector("#property-booking-form");
      const checkIn = document.querySelector("#detail-check-in");
      const checkOut = document.querySelector("#detail-check-out");
      const guestSelect = document.querySelector("#detail-guests");
      checkIn.min = todayString;
      checkOut.min = todayString;
      guestSelect.innerHTML = Array.from(
        { length: property.guests },
        (_, index) => {
          const guests = index + 1;
          return `<option value="${guests}"${guests === 2 || (guests === 1 && property.guests === 1) ? " selected" : ""}>${guests} ${guests === 1 ? "guest" : "guests"}</option>`;
        },
      ).join("");
      const requestedCheckIn = params.get("checkIn") || "";
      const requestedCheckOut = params.get("checkOut") || "";
      if (
        requestedCheckIn >= todayString &&
        requestedCheckOut > requestedCheckIn
      ) {
        checkIn.value = requestedCheckIn;
        checkOut.value = requestedCheckOut;
        checkOut.min = requestedCheckIn;
      }

      const requestedGuests = Number(params.get("guests"));
      if (
        Number.isInteger(requestedGuests) &&
        requestedGuests >= 1 &&
        requestedGuests <= property.guests
      ) {
        guestSelect.value = String(requestedGuests);
      }

      const priceSummary = document.querySelector("#detail-price-summary span");
      function updateStayPrice() {
        const start = new Date(`${checkIn.value}T00:00:00`);
        const end = new Date(`${checkOut.value}T00:00:00`);
        const nights = Math.round((end - start) / 86400000);
        priceSummary.textContent =
          nights > 0
            ? `${nights} ${nights === 1 ? "night" : "nights"} × ${formatPrice(property.price)} = ${formatPrice(nights * property.price)}`
            : "Select your dates to see your stay total.";
      }

      function syncSelectedDates() {
        if (checkIn.value) {
          checkOut.min = checkIn.value;
        } else {
          checkOut.min = todayString;
        }
        if (checkOut.value && checkOut.value <= checkIn.value) {
          checkOut.value = "";
        }
        updateStayPrice();
      }

      syncSelectedDates();
      checkIn.addEventListener("change", syncSelectedDates);
      checkOut.addEventListener("change", syncSelectedDates);
      checkOut.addEventListener("input", () => {
        checkOut.setCustomValidity("");
        syncSelectedDates();
      });
      bookingForm.addEventListener("submit", (event) => {
        if (!checkIn.value || !checkOut.value || checkOut.value <= checkIn.value) {
          event.preventDefault();
          checkOut.setCustomValidity("Check-out must be after check-in.");
          checkOut.reportValidity();
          return;
        }
        checkOut.setCustomValidity("");
      });

      const lightbox = document.querySelector("#photo-lightbox");
      const lightboxImage = document.querySelector("#lightbox-image");
      const lightboxCaption = document.querySelector("#lightbox-caption");
      let lightboxIndex = 0;
      function showLightboxImage(index) {
        lightboxIndex =
          (index + property.images.length) % property.images.length;
        lightboxImage.src = imageUrl(property.images[lightboxIndex]);
        lightboxImage.srcset = imageSrcset(property.images[lightboxIndex]);
        lightboxImage.sizes = "(max-width: 800px) 96vw, 84vw";
        lightboxImage.alt = listingPhotoAlt(
          property,
          property.images[lightboxIndex],
        );
        lightboxCaption.textContent = `${photoDescriptions[property.images[lightboxIndex]]} · Representative image, not ${property.name}. Photo ${lightboxIndex + 1} of ${property.images.length}.`;
      }
      root.addEventListener("click", (event) => {
        const zoomButton = event.target.closest("[data-lightbox-index]");
        if (!zoomButton) return;
        showLightboxImage(Number(zoomButton.dataset.lightboxIndex));
        lightbox.showModal();
      });
      lightbox
        .querySelector(".lightbox-close")
        .addEventListener("click", () => lightbox.close());
      lightbox
        .querySelector(".lightbox-previous")
        .addEventListener("click", () => showLightboxImage(lightboxIndex - 1));
      lightbox
        .querySelector(".lightbox-next")
        .addEventListener("click", () => showLightboxImage(lightboxIndex + 1));
      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) lightbox.close();
      });
      lightbox.addEventListener("cancel", () => lightbox.close());
      lightbox.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") showLightboxImage(lightboxIndex - 1);
        if (event.key === "ArrowRight") showLightboxImage(lightboxIndex + 1);
        if (event.key === "Escape") lightbox.close();
      });
    }
  }

  if (document.body.dataset.page === "booking") {
    const property = properties.find(
      (item) => item.id === params.get("property"),
    );
    const bookingForm = document.querySelector("#booking-form");
    const bookingContextError = document.querySelector(
      "#booking-context-error",
    );
    if (property) {
      document.querySelector("#booking-property").textContent =
        `${property.name} · ${property.location} · ${formatPrice(property.price)} per night`;
      const guestSelect = document.querySelector("#booking-guests");
      [...guestSelect.options].forEach((option) => {
        option.disabled = Number(option.value) > property.guests;
      });
      const requestedGuests = Number(params.get("guests"));
      guestSelect.value = String(
        Number.isInteger(requestedGuests) &&
          requestedGuests >= 1 &&
          requestedGuests <= property.guests
          ? requestedGuests
          : Math.min(2, property.guests),
      );
    } else {
      bookingForm.hidden = true;
      bookingContextError.hidden = false;
    }
    const checkIn = document.querySelector("#booking-check-in");
    const checkOut = document.querySelector("#booking-check-out");
    const priceSummary = document.querySelector("#booking-price-summary");
    checkIn.value = params.get("checkIn") || "";
    checkOut.value = params.get("checkOut") || "";
    checkIn.min = todayString;
    checkOut.min = checkIn.value || todayString;
    function updateBookingPrice() {
      if (!property || !checkIn.value || !checkOut.value) {
        priceSummary.hidden = true;
        return;
      }
      const nights = Math.round(
        (new Date(`${checkOut.value}T00:00:00`) -
          new Date(`${checkIn.value}T00:00:00`)) /
          86400000,
      );
      if (nights <= 0) {
        priceSummary.hidden = true;
        return;
      }
      priceSummary.hidden = false;
      priceSummary.querySelector("[data-night-count]").textContent =
        `${nights} ${nights === 1 ? "night" : "nights"}`;
      priceSummary.querySelector("[data-nightly-price]").textContent =
        formatPrice(property.price);
      priceSummary.querySelector("[data-total-price]").textContent =
        formatPrice(nights * property.price);
    }
    updateBookingPrice();
    checkIn.addEventListener("change", () => {
      checkOut.min = checkIn.value || todayString;
      if (checkOut.value && checkOut.value <= checkIn.value)
        checkOut.value = "";
      updateBookingPrice();
    });
    checkOut.addEventListener("change", updateBookingPrice);
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = new FormData(bookingForm);
      const error = document.querySelector("#form-error");
      const guestName = String(values.get("name") || "").trim();
      const email = String(values.get("email") || "").trim();
      const phone = String(values.get("phone") || "").trim();
      const checkIn = String(values.get("checkIn") || "");
      const checkOut = String(values.get("checkOut") || "");

      if (!guestName || guestName.length < 2) {
        error.textContent = "Please enter your full name before submitting.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.textContent = "Please provide a valid email address.";
        return;
      }
      if ((phone.replace(/\D/g, "") || "").length < 7) {
        error.textContent = "Please enter a valid phone number with at least 7 digits.";
        return;
      }
      if (!checkIn || !checkOut || checkOut <= checkIn) {
        error.textContent =
          "Please choose a check-out date after your check-in date.";
        return;
      }
      if (property && Number(values.get("guests")) > property.guests) {
        error.textContent = `This stay accommodates up to ${property.guests} guests.`;
        return;
      }
      error.textContent = "";
      bookingForm.hidden = true;
      const confirmation = document.querySelector("#confirmation");
      confirmation.hidden = false;
      confirmation.setAttribute(
        "aria-live",
        "polite",
      );
      confirmation.innerHTML = `
        <span class="confirmation-icon" aria-hidden="true"><i class="fa-solid fa-check"></i></span>
        <h2>Demo booking request received.</h2>
        <p>
          This is a prototype request only. No reservation has been confirmed,
          no payment has been taken, and no booking has been saved.
        </p>
        <a class="submit-button button-link" href="stays.html">Explore more stays</a>
      `;
    });
  }

  if (document.body.dataset.page === "contact") {
    const form = document.querySelector("#contact-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = new FormData(form);
      const name = String(values.get("name") || "").trim();
      const email = String(values.get("email") || "").trim();
      const message = String(values.get("message") || "").trim();
      const error = document.querySelector("#contact-error");

      if (!name || name.length < 2) {
        error.textContent = "Please enter your name before sending your note.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.textContent = "Please provide a valid email address.";
        return;
      }
      if (message.length < 10) {
        error.textContent = "Please include a few more details in your message.";
        return;
      }
      error.textContent = "";
      form.hidden = true;
      document.querySelector("#contact-confirmation").hidden = false;
    });
  }

  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.min = input.min || todayString;
  });
  document.querySelectorAll("form").forEach((form) => {
    const checkIn = form.querySelector('input[name="checkIn"]');
    const checkOut = form.querySelector('input[name="checkOut"]');
    if (!checkIn || !checkOut || form.id === "booking-form") return;
    checkIn.addEventListener("change", () => {
      checkOut.min = checkIn.value || todayString;
      if (checkOut.value && checkOut.value <= checkIn.value)
        checkOut.value = "";
    });
  });
})();
