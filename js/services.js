/* eslint-disable no-unused-expressions */
import { services } from "./services_data.js";
import { url } from "./urls.js";

const html = document.documentElement;
const servicesGrid = document.querySelector("#services-id #services-grid");
const filterBar = document.querySelector("#services-id #service-filters");

// Category used by the filter chips on the services page.
const categoryById = {
  0: "andrology",
  1: "stones",
  2: "prostate",
  3: "andrology",
  4: "kidney",
  5: "bladder",
};

// Per-service presentation extras that are not part of the shared data file.
const cardMetaById = {
  0: {
    icon: "smb_share",
    category: { ar: "الذكورة والإنجاب", en: "Andrology & Fertility" },
    badge: { ar: "جراحة ميكروسكوبية دقيقة", en: "Precise Microscopic Surgery" },
  },
  1: {
    icon: "flash_on",
    category: { ar: "حصوات المسالك", en: "Urinary Stones" },
    badge: { ar: "ليزر هولميوم فائق الدقة", en: "Ultra-precise Holmium Laser" },
  },
  2: {
    icon: "water_drop",
    category: { ar: "تضخم البروستاتا", en: "Enlarged Prostate" },
    badge: {
      ar: "مناظير البلازما ثنائية القطب",
      en: "Bipolar Plasma Endoscopy",
    },
  },
  3: {
    icon: "lock",
    category: { ar: "جراحة الذكورة", en: "Andrology Surgery" },
    badge: {
      ar: "سرية تامة وأعلى درجات التعقيم",
      en: "Full Discretion & Sterility",
    },
  },
  4: {
    icon: "radio_button_checked",
    category: { ar: "مناظير الكلى", en: "Kidney Endoscopy" },
    badge: { ar: "ثقب ميكروسكوبي 5 ملم", en: "5 mm Micro Puncture" },
  },
  5: {
    icon: "health_and_safety",
    category: { ar: "أورام المثانة", en: "Bladder Tumors" },
    badge: {
      ar: "استئصال بالمنظار بدون شق",
      en: "Incision-free Endoscopic Resection",
    },
  },
};

function buildServiceCard(service, isEnglish) {
  const meta = cardMetaById[service.id];
  const short = isEnglish ? "en" : "ar";
  const title = isEnglish ? service.entitle : service.artitle;
  const description = isEnglish ? service.enparagraph : service.arparagraph;

  const tags = service.info
    .slice(0, 3)
    .map((info) => (isEnglish ? info.entitle : info.artitle));
  const details = service.info.map((info) =>
    isEnglish ? info.entext : info.artext,
  );

  const cta = isEnglish ? "Details & Booking" : "تفاصيل وحجز استشارة";
  const detailsTitle = isEnglish
    ? "Clinical highlights:"
    : "أبرز ما يميز هذه الخدمة:";
  const toggleLabel = isEnglish
    ? "Show more information"
    : "عرض معلومات إضافية";
  const videoLabel = isEnglish ? "Watch the video" : "شاهد الفيديو";

  return /*html*/ `
  <article class="service-card" id="service-item-no-${service.id}" data-category="${categoryById[service.id]}">
    <div class="service-media">
      <img src="${url}/${service.img}" alt="${title}" loading="lazy" />
      <span class="service-media-badge">
        <span class="material-symbols-outlined">${meta.icon}</span>
        <span>${meta.badge[short]}</span>
      </span>
    </div>
    <div class="service-body">
      <div class="service-head">
        <div class="service-head-main">
          <img class="service-icon" src="${url}/${service.svg}" alt="" aria-hidden="true" />
          <h2 class="service-card-title">${title}</h2>
        </div>
        <span class="service-tag">${meta.category[short]}</span>
      </div>
      <p class="service-card-desc">${description}</p>
      <div class="service-features">
        ${tags
          .map(
            (tag) => /*html*/ `
          <span class="service-feature">
            <span class="material-symbols-outlined">check_circle</span>
            ${tag}
          </span>`,
          )
          .join("")}
      </div>
      <div class="service-actions">
        <a class="service-cta" href="${service.page || "appointments.html"}">
          <span class="material-symbols-outlined">calendar_today</span>
          <span>${cta}</span>
        </a>
        <button class="service-toggle" type="button" aria-label="${toggleLabel}" aria-expanded="false">
          <span class="material-symbols-outlined">expand_more</span>
        </button>
      </div>
      <div class="service-extra" hidden>
        <p class="service-extra-title">${detailsTitle}</p>
        <ul>
          ${details.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        ${
          service.ytlink
            ? /*html*/ `
        <a class="service-video" href="${service.ytlink}" target="_blank" rel="noopener">
          <span class="material-symbols-outlined">smart_display</span>
          ${videoLabel}
        </a>`
            : ""
        }
      </div>
    </div>
  </article>`;
}

function bindDetailsToggles() {
  servicesGrid.querySelectorAll(".service-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const extra = button
        .closest(".service-card")
        .querySelector(".service-extra");
      const isOpening = extra.hasAttribute("hidden");

      if (isOpening) {
        extra.removeAttribute("hidden");
      } else {
        extra.setAttribute("hidden", "");
      }

      button.setAttribute("aria-expanded", String(isOpening));
      button.classList.toggle("is-open", isOpening);
    });
  });
}

function rebuildServices() {
  if (!servicesGrid) return;

  const isEnglish = html.getAttribute("lang") === "en";
  servicesGrid.innerHTML = services
    .map((service) => buildServiceCard(service, isEnglish))
    .join("");

  bindDetailsToggles();
}

function applyFilter(filterValue) {
  const cards = servicesGrid.querySelectorAll(".service-card");
  cards.forEach((card) => {
    const matches =
      filterValue === "all" || card.dataset.category === filterValue;
    card.hidden = !matches;
  });
}

function bindFilters() {
  if (!filterBar) return;

  const chips = filterBar.querySelectorAll(".filter-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((item) => item.classList.remove("active-filter"));
      chip.classList.add("active-filter");
      applyFilter(chip.dataset.filter);
    });
  });
}

function scrollToHash() {
  if (!window.location.hash) return;

  const target = document.getElementById(window.location.hash.slice(1));
  if (!target) return;

  setTimeout(() => {
    const headerOffset = 90;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, 400);
}

// Initial build
rebuildServices();
bindFilters();
scrollToHash();

// Rebuild when the language toggles (localization.js flips <html lang>)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "lang") {
      rebuildServices();
    }
  });
});
observer.observe(html, {
  attributes: true,
  attributeFilter: ["lang"],
});
