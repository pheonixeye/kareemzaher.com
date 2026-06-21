import { url } from "./js/urls.js";

// ─── Default locale ────────────────────────────────────────────────────────────
const storedLocale = window.localStorage.getItem("lang");
const defaultLocale = storedLocale ?? "ar";

// Flip the button label to show the *other* available language
const langSwitcher = document.querySelector("#lang-btn");
langSwitcher.innerText = defaultLocale === "ar" ? "en" : "ar";

// ─── State ─────────────────────────────────────────────────────────────────────
let locale;
let translations = {};

// Cache of original Arabic text keyed by lang-key.
// Populated once from the pre-authored DOM so we can restore Arabic
// without a network request when the user switches back.
const arCache = {};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function dir(loc) {
  return loc === "ar" ? "rtl" : "ltr";
}

function applyLocaleMetadata(loc) {
  document.documentElement.dir = dir(loc);
  document.documentElement.lang = loc;
  window.localStorage.setItem("lang", loc);
}

async function fetchTranslationsFor(loc) {
  const response = await fetch(`${url}/lang/${loc}.json`);
  return response.json();
}

// ─── Cache the Arabic DOM text on first paint ──────────────────────────────────
function buildArCache() {
  document.querySelectorAll("[lang-key]").forEach((el) => {
    const key = el.getAttribute("lang-key");
    if (key && !arCache[key]) {
      arCache[key] = el.innerText;
    }
  });
}

// ─── Translation ───────────────────────────────────────────────────────────────
function translateElement(element) {
  const key = element.getAttribute("lang-key");
  const translation = translations[key];
  if (translation !== undefined) {
    element.innerText = translation;
  }
}

function translatePage() {
  document.querySelectorAll("[lang-key]").forEach(translateElement);
}

// Restore Arabic text from the in-memory cache (no network call needed)
function restoreArabic() {
  document.querySelectorAll("[lang-key]").forEach((el) => {
    const key = el.getAttribute("lang-key");
    if (arCache[key] !== undefined) {
      el.innerText = arCache[key];
    }
  });
}

// ─── Core setLocale ────────────────────────────────────────────────────────────
async function setLocale(newLocale) {
  if (newLocale === locale) return;

  applyLocaleMetadata(newLocale);

  if (newLocale === "ar") {
    // Arabic is baked into the DOM — just restore from cache, no fetch needed
    locale = newLocale;
    translations = {};
    restoreArabic();
    return;
  }

  // For any other locale, fetch and apply translations
  translations = await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translatePage();
}

// ─── Language switcher binding ──────────────────────────────────────────────────
function bindLocaleSwitcher() {
  langSwitcher.onclick = () => {
    const newLocale = langSwitcher.innerText; // shows the locale we're switching TO
    setLocale(newLocale);
    langSwitcher.innerText = newLocale === "ar" ? "en" : "ar";
  };
}

// ─── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Snapshot the Arabic text before any translation runs
  buildArCache();

  if (defaultLocale === "ar") {
    // DOM is already in Arabic — just set metadata, no DOM changes
    locale = "ar";
    applyLocaleMetadata("ar");
  } else {
    // User previously switched to English; honour that preference
    setLocale(defaultLocale);
  }

  bindLocaleSwitcher();
});
