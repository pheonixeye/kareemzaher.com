const overlayNav = document.querySelector(".overlay-nav");

function openNav() {
  overlayNav.style.width = "50%";
}

function closeNav() {
  overlayNav.style.width = "0%";
}

//TODO: add event listener to close overlay if user taps anywhere on the screen

const mobileTemplate = `
<a href="../index.html">Home</a>
<a href="pages/appointments.html">Appointments</a>
<a href="#">Services</a>
<a href="#">Articles</a>
<a href="#">Reviews</a>
<a href="#">Erection-Test</a>
`;

const desktopTemplate = `
<li><a href="../index.html">Home</a></li>
<li><a href="pages/appointments.html">Appointments</a></li>
<li><a href="#">Services</a></li>
<li><a href="#">Articles</a></li>
<li><a href="#">Reviews</a></li>
<li><a href="#">Erection-Test</a></li>
`;

document
  .querySelector("#overlay-content")
  .insertAdjacentHTML("beforeend", mobileTemplate);
document
  .querySelector("#desktop-nav")
  .insertAdjacentHTML("beforeend", desktopTemplate);
