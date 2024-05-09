import { url } from "./js/urls.js";
// console.log("localization file connected");

// let jsonLocale;

// async function fetchStoredLocale() {
//   const request = await fetch("/json/lang.json");
//   jsonLocale = await request.json();
//   console.log(jsonLocale["lang"]);
// }

// fetchStoredLocale();

// async function modLocaleInJson(stringLocale) {}
const storedLocale = window.localStorage.getItem("lang");

const langSwitcher = document.querySelector("#lang-btn");

// console.log(storedLocale);

const defaultLocale = storedLocale ?? "ar";

langSwitcher.innerText = defaultLocale === "ar" ? "en" : "ar";

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
  window.localStorage.setItem("lang", newLocale);
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
  const response = await fetch(`${url}/lang/${newLocale}.json`);
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
    switcher.innerText = newlocale === "ar" ? "en" : "ar";
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const initialLocale = defaultLocale;
  setLocale(initialLocale);
  bindLocaleSwitcher();
});

//TODO: get rid of starting in english then switching to arabic in each navigation
