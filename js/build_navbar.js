import navData from "./navigation_data.js";

function buildTemplate(isMobile) {
  isMobile = isMobile || false;
  const templateList = [];

  for (let index = 0; index < navData.length; index++) {
    if (isMobile) {
      templateList.push(
        `<a id="${navData[index].id}" class="nav-link" href="${navData[index].link}" lang-key="${navData[index].text}">${navData[index].arText || navData[index].text}</a>`
      );
    } else {
      templateList.push(
        `<li><a id="${navData[index].id}" class="nav-link" href="${navData[index].link}" lang-key="${navData[index].text}">${navData[index].arText || navData[index].text}</a></li>`
      );
    }
  }
  templateList.pop();
  const template = templateList.join(" ");
  return template;
}

function buildBottomTemplate() {
  const templateList = [];

  for (let index = 0; index < navData.length; index++) {
    templateList.push(
      `<li><a id="${navData[index].id}" class="nav-link" href="${navData[index].link}">${navData[index].icon}<span class="bottom-nav-label" lang-key="${navData[index].text}_short">${navData[index].shortArText || navData[index].text}</span></a></li>`
    );
  }
  templateList.pop();
  return templateList.join(" ");
}

document
  .querySelector("#overlay-content")
  .insertAdjacentHTML("beforeend", buildTemplate(true));
document
  .querySelector("#desktop-nav")
  .insertAdjacentHTML("beforeend", buildTemplate(false));
document
  .querySelector("#bottom-nav")
  ?.insertAdjacentHTML("beforeend", buildBottomTemplate());

const navLinks = document.querySelectorAll(".nav-link");
const body = document.getElementsByTagName("body");
const bodyId = body[0].id;

navLinks.forEach((item) => {
  if (item.id === bodyId) {
    item.classList.add("active-nav-link");
  }
});
