const overlayNav = document.querySelector(".overlay-nav");

function openNav() {
  overlayNav.style.width = "50%";
}

function closeNav() {
  overlayNav.style.width = "0%";
}

//TODO: add event listener to close overlay if user taps anywhere on the screen

const mobileTemplate = `
<a href="./">Home</a>
<a href="appointments.html">Appointments</a>
<a href="services.html">Services</a>
<a href="articles.html">Articles</a>
<a href="reviews.html">Reviews</a>
<a href="erection_test.html">Erection-Test</a>
`;

const desktopTemplate = `
<li><a href="./">Home</a></li>
<li><a href="appointments.html">Appointments</a></li>
<li><a href="services.html">Services</a></li>
<li><a href="articles.html">Articles</a></li>
<li><a href="reviews.html">Reviews</a></li>
<li><a href="erection_test.html">Erection-Test</a></li>
`;

document
  .querySelector("#overlay-content")
  .insertAdjacentHTML("beforeend", mobileTemplate);
document
  .querySelector("#desktop-nav")
  .insertAdjacentHTML("beforeend", desktopTemplate);
