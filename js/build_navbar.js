import navData from "./navigation_data.js";

//TODO: add event listener to close overlay if user taps anywhere on the screen

function buildTemplate(isMobile) {
  isMobile = isMobile || false;
  let templateList = [];
  for (let index = 0; index < navData.length; index++) {
    if (isMobile) {
      templateList.push(
        `<a href="${navData[index].link}">${navData[index].text}</a>`
      );
    } else {
      templateList.push(
        `<li><a href="${navData[index].link}">${navData[index].text}</a></li>`
      );
    }
  }
  const template = templateList.join(" ");
  return template;
}

// const mobileTemplate = `
// <a href="./">Home</a>
// <a href="appointments.html">Appointments</a>
// <a href="services.html">Services</a>
// <a href="articles.html">Articles</a>
// <a href="reviews.html">Reviews</a>
// <a href="erection_test.html">Erection-Test</a>
// `;

// const desktopTemplate = `
// <li><a href="./">Home</a></li>
// <li><a href="appointments.html">Appointments</a></li>
// <li><a href="services.html">Services</a></li>
// <li><a href="articles.html">Articles</a></li>
// <li><a href="reviews.html">Reviews</a></li>
// <li><a href="erection_test.html">Erection-Test</a></li>
// `;

document
  .querySelector("#overlay-content")
  .insertAdjacentHTML("beforeend", buildTemplate(true));
document
  .querySelector("#desktop-nav")
  .insertAdjacentHTML("beforeend", buildTemplate(false));
