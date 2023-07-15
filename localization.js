console.log("localization file connected");

const defaultLocale = "en";
// The active locale
let locale;
// Gets filled with active locale translations
let translations = {};

async function setLocale(newLocale) {
  if (newLocale === locale) return;
  const newTranslations = await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translations = newTranslations;
  // Set <html dir> attribute
  document.documentElement.dir = dir(newLocale);
  // Not necessary for direction flow, but for good measure...
  document.documentElement.lang = newLocale;
  translatePage();
}
// ...
function dir(locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

function translateElement(element) {
  const key = element.getAttribute("lang-key");
  const translation = translations[key];
  element.innerText = translation;
}

async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`lang/${newLocale}.json`);
  return await response.json();
}

function translatePage() {
  document.querySelectorAll("[lang-key]").forEach(translateElement);
}

function bindLocaleSwitcher() {
  const switcher = document.querySelector("#lang-btn");
  //   switcher.innerText = initialValue;
  switcher.onclick = (e) => {
    const newlocale = switcher.innerText;
    // Set the locale to the selected option[value]
    setLocale(newlocale);
    switcher.innerText = newlocale == "ar" ? "en" : "ar";
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const initialLocale = defaultLocale;
  setLocale(initialLocale);
  bindLocaleSwitcher();
});
