// import { fetchStoredLocale, modLocaleInJson } from "./index.js";

// let langObject = {
//   lang: "ar",
// };

// fetchStoredLocale();

// async function modLocaleInJson(stringLocale) {}
// const storedLocale = window.localStorage.getItem("lang");
// fetchStoredLocale().then((value) => {
//   storedLocale = value;
// });
let storedLocale;

let myCookies = document.cookie;
myCookies = myCookies.split(";");
let cookies = new Map();

// Loop through the myCookies array
for (let cookie of myCookies) {
  // Split the elements at "="
  cookie = cookie.split("=");

  // Set the first element as key and second element as value
  cookies.set(cookie[0], cookie[1]);
}

// console.log(cookies);
storedLocale = cookies.get(" lang");
// console.log(storedLocale);

const langSwitcher = document.querySelector("#lang-btn");

// console.log(storedLocale);

const defaultLocale = storedLocale ?? "ar";

langSwitcher.innerText = defaultLocale == "ar" ? "en" : "ar";

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
  // window.localStorage.setItem("lang", newLocale);
  //todo: modify cookie (lang=newLocale)
  document.cookie = `lang=${newLocale}`;
  // langObject.lang = newLocale;
  // console.log(langObject);
  await fetch(`/${newLocale}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
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

// export { defaultLocale };
